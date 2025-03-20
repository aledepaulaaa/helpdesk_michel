import React from "react"
import { auth, db } from "../db/firebase"
import { useTableContext } from "./TableContext"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { chamadocompletoInicial, detalhechamadoInicial, IAcoesChamadoContextProps, IChamadoCompleto, IDetalhesChamado } from "../interfaces/IAcoesChamadoContextProps"

export const AcoesChamadoContext = React.createContext<IAcoesChamadoContextProps>({
    chamados: chamadocompletoInicial,
    addChamados: detalhechamadoInicial,
    chamadosPaginados: [],
    setChamados: () => { },
    setAddChamados: () => { },
    handleCancelar: () => { },
    handleSalvarChamado: () => { },
    handleObterChamados: () => { },
})

export const useAcoesChamacoContext = () => React.useContext(AcoesChamadoContext)

export const AcoesChamadoProvider = ({ children }: { children: React.ReactNode }) => {
    const [chamados, setChamados] = React.useState<IChamadoCompleto>(chamadocompletoInicial)
    const [addChamados, setAddChamados] = React.useState<IDetalhesChamado>(detalhechamadoInicial)

    const { page, rowsPerPage } = useTableContext()
    const { setSuccess, setError, setLoading, handleCloseDialog } = useLoadingAndStatusContext()

    const handleObterChamados = async () => {
        setLoading(true)
        try {
            const user = auth.currentUser
            if (!user) {
                setChamados(chamadocompletoInicial)
                return
            }

            // simplificar a busca do chamado pelo ID do usuário logado
            const chamadosRef = collection(db, "chamados")
            const q = query(chamadosRef, where("userId", "==", user.uid))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                setChamados(chamadocompletoInicial)
                return
            }
            const chamadosData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setChamados(chamadosData as any) 
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

            // Buscar na collection de lojas o ID da loja do respectivo usuário
            const lojasRef = collection(db, "lojas")
            // Busca lojas onde o campo 'userId' é igual ao user.uid
            const q = query(lojasRef, where("userId", "==", user.uid)) // <-- CAMPO CORRETO
            const querySnapshot = await getDocs(q)

            // *** TRATAMENTO DE ERRO CORRETO ***
            if (querySnapshot.empty) {
                setError("Usuário não associado a nenhuma loja.")
                setLoading(false)
                return // Sai da função se não encontrar loja
            }

            // Obtém o ID da loja.  Assumindo que cada usuário tem apenas *uma* loja.
            const lojaId = querySnapshot.docs[0].id  // Obtém o *ID do documento* da loja
            // const lojaData = querySnapshot.docs[0].data() // Se você precisar de outros dados da loja
            console.log("Loja ID:", lojaId)

            const novoChamado = {
                data: new Date().toLocaleString(),
                lojaId: lojaId,
                userId: user.uid,
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
                chamadosPaginados,
                handleSalvarChamado,
                handleCancelar,
                handleObterChamados,
            }}
        >
            {children}
        </AcoesChamadoContext.Provider>
    )
}