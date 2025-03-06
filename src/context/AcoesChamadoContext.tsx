import React from "react"
import { auth, db } from "../db/firebase"
import { useLojaContext } from "./LojasContext"
import { useTableContext } from "./TableContext"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { chamadocompletoInicial, detalhechamadoInicial, IAcoesChamadoContextProps, IChamadoCompleto, IDetalhesChamado } from "../interfaces/IAcoesChamadoContextProps"

export const AcoesChamadoContext = React.createContext<IAcoesChamadoContextProps>({
    addChamados: detalhechamadoInicial,
    chamados: chamadocompletoInicial,
    setAddChamados: () => { },
    setChamados: () => { },
    isDialogOpen: false,
    handleOpenDialog: () => { },
    handleCloseDialog: () => { },
    handleSalvarChamado: () => { },
    handleCancelar: () => { },
    handleObterChamados: () => { },
    chamadosPaginados: [],
})

export const useChamadoContext = () => React.useContext(AcoesChamadoContext)

export const AcoesChamadoProvider = ({ children }: { children: React.ReactNode }) => {
    const [chamados, setChamados] = React.useState<IChamadoCompleto>(chamadocompletoInicial)
    const [addChamados, setAddChamados] = React.useState<IDetalhesChamado>(detalhechamadoInicial)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    const { page, rowsPerPage } = useTableContext()
    const { setSuccess, setError, setLoading } = useLoadingAndStatusContext()

    const handleOpenDialog = () => setIsDialogOpen(true)
    const handleCloseDialog = () => setIsDialogOpen(false)

    const handleObterChamados = async () => {
        setLoading(true)
        try {
            const user = auth.currentUser
            if (!user) {
                setChamados(chamadocompletoInicial)
                return
            }

            const ultimaChamada = localStorage.getItem("ultimaChamada")
            const dataAtual = new Date().toISOString()

            // Se não houver dados ou os dados estiverem desatualizados (mais de 24h)
            if (!ultimaChamada || new Date(ultimaChamada).getTime() + 86400000 < new Date().getTime()) {
                const chamadosRef = collection(db, "chamados")
                const q = query(chamadosRef, where("id", "==", user.uid))
                const querySnapshot = await getDocs(q)

                // Converte os documentos retornados em um objeto com chave igual ao doc.id
                const chamadosData: { [key: string]: any } = {}
                querySnapshot.forEach((doc) => {
                    chamadosData[doc.id] = { id: doc.id, ...doc.data() }
                })

                console.log("Chamados do firebase:", chamadosData)

                // Atualiza o localStorage
                localStorage.setItem("chamados", JSON.stringify(chamadosData))
                localStorage.setItem("ultimaChamada", dataAtual)
                setChamados(chamadosData as IChamadoCompleto)
            } else {
                // Se os dados ainda forem recentes, utiliza os dados do localStorage
                const chamadosStorage = localStorage.getItem("chamados")
                if (chamadosStorage) {
                    setChamados(JSON.parse(chamadosStorage))
                }
            }
        } catch (error) {
            console.error("Erro ao obter chamados:", error)
            setError("Erro ao obter chamados")
        } finally {
            setLoading(false)
        }
    }

    const handleSalvarChamado = async () => {
        setLoading(true)
        try {
            const user = auth.currentUser
            if (!user) throw new Error("Usuário não autenticado")

            const novoChamado = {
                data: new Date().toLocaleString(),
                id: user.uid,
                titulo: addChamados.titulo,
                solicitacao: addChamados.solicitacao,
                status: "Pendente",
            }

            const chamadosRef = collection(db, "chamados")
            const docRef = await addDoc(chamadosRef, novoChamado)

            setChamados({
                ...chamados,
                [docRef.id]: novoChamado
            })

            localStorage.setItem("chamados", JSON.stringify({
                ...chamados,
                [docRef.id]: novoChamado
            }))

            setSuccess("Chamado enviado com sucesso, aguarde o retorno do suporte.")
            handleCloseDialog()
        } catch (error) {
            console.error("Erro ao salvar chamado:", error)
            setError("Não foi possível enviar seu chamado, tente novamente")
        } finally {
            setLoading(false)
        }
    }

    const handleCancelar = () => {
        setChamados(chamadocompletoInicial)
        handleCloseDialog()
    }

    const chamadosPaginados = Object.entries(chamados).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(([id, chamado]) => ({ id, ...chamado }))

    return (
        <AcoesChamadoContext.Provider
            value={{
                chamados,
                addChamados,
                setAddChamados,
                setChamados,
                isDialogOpen,
                chamadosPaginados,
                handleOpenDialog,
                handleCloseDialog,
                handleSalvarChamado,
                handleCancelar,
                handleObterChamados,
            }}
        >
            {children}
        </AcoesChamadoContext.Provider>
    )
}