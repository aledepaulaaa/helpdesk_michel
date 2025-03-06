import React from "react"
import { db, auth } from "../db/firebase"
import { ILojasContextProps, ILojaSelecionada } from "../interfaces/ILojasContextProps"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { chamadoAdminInicial, IAdminContextProps, IGerenciarChamadosAdminProps, ILerChamadosAdminProps } from "../interfaces/IAdminContextProps"

export const AdminContext = React.createContext<IAdminContextProps>({
    isAdmin: false,
    isDialogOpen: false,
    lerLojasAdmin: [],
    lerChamadosAdmin: [],
    addChamadosAdmin: chamadoAdminInicial,
    chamadoSelecionado: null,
    lojaSelecionada: null,
    setIsAdmin: () => { },
    setIsDialogOpen: () => { },
    setLerLojasAdmin: () => { },
    setLojaSelecionada: () => { },
    setaddChamadosAdmin: () => { },
    setLerChamadosAdmin: () => { },
    setChamadoSelecionado: () => { },
    handleCancelar: () => { },
    handleOpenDialog: () => { },
    handleCloseDialog: () => { },
    handleVerificarCargo: () => { },
    handleResponderChamado: () => { },
    handleCarregarChamados: () => { },
    handleCarregarLojasAdmin: () => { },
    handleCarregarChamadoLojaDialog: () => { },
})

export const useAdminContext = () => React.useContext(AdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [lerChamadosAdmin, setLerChamadosAdmin] = React.useState<ILerChamadosAdminProps[]>([])
    const [addChamadosAdmin, setaddChamadosAdmin] = React.useState<IGerenciarChamadosAdminProps>(chamadoAdminInicial)
    const [lerLojasAdmin, setLerLojasAdmin] = React.useState<ILojasContextProps[]>([])
    const [lojaSelecionada, setLojaSelecionada] = React.useState<ILojaSelecionada | null>(null)
    const [chamadoSelecionado, setChamadoSelecionado] = React.useState<ILerChamadosAdminProps | null>(null)
    const { setLoading } = useLoadingAndStatusContext()

    const handleOpenDialog = () => setIsDialogOpen(true)
    const handleCloseDialog = () => setIsDialogOpen(false)

    const handleCancelar = () => {
        setaddChamadosAdmin(chamadoAdminInicial)
        setIsDialogOpen(false)
        setChamadoSelecionado(null)
        setLojaSelecionada(null)
    }

    const handleVerificarCargo = async () => {
        setLoading(true)
        try {
            const user = auth.currentUser
            if (!user) {
                setIsAdmin(false)
                return
            }

            // Consulta para buscar o usuário com base no seu UID
            const usuariosRef = collection(db, "usuarios")
            const q = query(usuariosRef, where("id", "==", user.uid))
            const querySnapshot = await getDocs(q)

            let cargo = ""
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                cargo = data.cargo
            })

            // Define o isAdmin conforme o valor do campo "cargo"
            setIsAdmin(cargo === "Admin")
        } catch (error) {
            console.error("Erro ao verificar cargo:", error)
            setIsAdmin(false)
        } finally {
            setLoading(false)
        }
    }
    const handleResponderChamado = async () => {
        console.log("Responder Chamado function called")
    }

    const handleCarregarLojasAdmin = async () => {
        setLoading(true)
        try {
            const lojasRef = collection(db, "lojas")
            const querySnapshot = await getDocs(lojasRef)
            const lojasData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setLerLojasAdmin(lojasData as any)
            localStorage.setItem("lojasAdmin", JSON.stringify(lojasData))
        } catch (error) {
            console.error("Erro ao carregar lojas:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCarregarChamados = async () => {
        setLoading(true)
        try {
            const chamadosRef = collection(db, "chamados")
            const querySnapshot = await getDocs(chamadosRef)
            const chamadosData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setLerChamadosAdmin(chamadosData as ILerChamadosAdminProps[])
            localStorage.setItem("chamadosAdmin", JSON.stringify(chamadosData))
        } catch (error) {
            console.error("Erro ao carregar chamados:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCarregarChamadoLojaDialog = async (chamadoId: string) => {
        setLoading(true)
        try {
            const chamadosStorage = localStorage.getItem("chamadosAdmin")
            const lojasStorage = localStorage.getItem("lojasAdmin")

            if (chamadosStorage && lojasStorage) {
                const chamadosData = JSON.parse(chamadosStorage) as ILerChamadosAdminProps[]
                const lojasData = JSON.parse(lojasStorage) as ILojaSelecionada[]

                const chamado = chamadosData.find(c => c.id === chamadoId)
                const lojaIdDoChamado = chamado?.id
                const loja = lojasData.find(buscaLoja => buscaLoja.id === lojaIdDoChamado)

                if (chamado) {
                    setChamadoSelecionado(chamado)
                } else {
                    console.error("Chamado não encontrado")
                    setChamadoSelecionado(null)
                }

                if (loja) {
                    setLojaSelecionada(loja)
                } else {
                    console.error("Loja não encontrada")
                    setLojaSelecionada(null)
                }
            } else {
                setChamadoSelecionado(null)
                setLojaSelecionada(null)
            }

            handleOpenDialog()
        } catch (error) {
            console.error("Erro ao carregar detalhes do chamado e loja do localStorage:", error)
            setChamadoSelecionado(null)
            setLojaSelecionada(null)
        } finally {
            setLoading(false)
        }
    }


    React.useEffect(() => {
        handleCarregarChamados()
        handleCarregarLojasAdmin()
    }, [])

    const adminContextValue = React.useMemo(() => ({
        isAdmin,
        isDialogOpen,
        lerLojasAdmin,
        lojaSelecionada,
        addChamadosAdmin,
        lerChamadosAdmin,
        chamadoSelecionado,
        setIsAdmin,
        setIsDialogOpen,
        setLerLojasAdmin,
        setLojaSelecionada,
        setLerChamadosAdmin,
        setaddChamadosAdmin,
        setChamadoSelecionado,
        handleCancelar,
        handleOpenDialog,
        handleCloseDialog,
        handleVerificarCargo,
        handleCarregarChamados,
        handleResponderChamado,
        handleCarregarLojasAdmin,
        handleCarregarChamadoLojaDialog,
    }), [
        isAdmin,
        setIsAdmin,
        isDialogOpen,
        lerLojasAdmin,
        lojaSelecionada,
        addChamadosAdmin,
        lerChamadosAdmin,
        chamadoSelecionado,
        setIsDialogOpen,
        setLerLojasAdmin,
        setLojaSelecionada,
        setaddChamadosAdmin,
        setLerChamadosAdmin,
        setChamadoSelecionado,
        handleCancelar,
        handleOpenDialog,
        handleCloseDialog,
        handleVerificarCargo,
        handleResponderChamado,
        handleCarregarChamados,
        handleCarregarLojasAdmin,
        handleCarregarChamadoLojaDialog,
    ])

    return (
        <AdminContext.Provider value={adminContextValue}>
            {children}
        </AdminContext.Provider>
    )
}