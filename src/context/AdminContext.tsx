import React from "react"
import { IUser } from "../interfaces/authcontext/IUser"
import { db, auth } from "../db/firebase"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { ILojasContextProps } from "../interfaces/ILojasContextProps"
import { collection, getDocs, query, where } from "firebase/firestore"
import { chamadoAdminInicial, IAdminContextProps, IGerenciarChamadosAdminProps, ILerChamadosAdminProps } from "../interfaces/IAdminContextProps"

export const AdminContext = React.createContext<IAdminContextProps>({
    isAdmin: false,
    usuarios: [],
    lerLojasAdmin: [],
    lerChamadosAdmin: [],
    addChamadosAdmin: chamadoAdminInicial,
    chamadoSelecionado: null,
    lojaSelecionada: null,
    setIsAdmin: () => { },
    setUsuarios: () => { },
    setLerLojasAdmin: () => { },
    setLojaSelecionada: () => { },
    setaddChamadosAdmin: () => { },
    setLerChamadosAdmin: () => { },
    setChamadoSelecionado: () => { },
    handleObterUsuarios: () => { },
    handleVerificarCargo: () => { },
    handleResponderChamado: () => { },
    handleCarregarChamados: () => { },
    handleCarregarLojasAdmin: () => { },
    handleCarregarChamadoLojaDialog: () => { },
})

export const useAdminContext = () => React.useContext(AdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
    const [usuarios, setUsuarios] = React.useState<IUser[]>([])
    const [lerChamadosAdmin, setLerChamadosAdmin] = React.useState<ILerChamadosAdminProps[]>([])
    const [addChamadosAdmin, setaddChamadosAdmin] = React.useState<IGerenciarChamadosAdminProps>(chamadoAdminInicial)
    const [lerLojasAdmin, setLerLojasAdmin] = React.useState<ILojasContextProps[]>([])
    const [lojaSelecionada, setLojaSelecionada] = React.useState<IUser | null>(null)
    const [chamadoSelecionado, setChamadoSelecionado] = React.useState<ILerChamadosAdminProps | null>(null)
    const [usuarioSelecionado, setUsuarioSelecionado] = React.useState<IUser>()
    const { setLoading } = useLoadingAndStatusContext()

    const handleObterUsuarios = async () => {
        try {
            const userDocRef = collection(db, "usuarios")
            const querySnapshot = await getDocs(userDocRef)

            if (querySnapshot.empty) {
                console.log("Nenhum usuário encontrado")
                return
            }

            const usuarios = querySnapshot.docs.map((doc) => doc.data())
            setUsuarios(usuarios as IUser[])
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        } catch (error) {
            console.log("Erro ao obter usuários: ", error)
        }
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
                const lojasData = JSON.parse(lojasStorage) as IUser[]

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

        } catch (error) {
            console.error("Erro ao carregar detalhes do chamado e loja do localStorage:", error)
            setChamadoSelecionado(null)
            setLojaSelecionada(null)
        } finally {
            setLoading(false)
        }
    }

    const handleAlterarCargoUsuario = async () => {
        setLoading(true)
        try {


        } catch (error) {
            console.error("Erro ao alterar cargo do usuário: ", error)
        }
    }

    React.useEffect(() => {
        handleCarregarChamados()
        handleCarregarLojasAdmin()
    }, [])

    return (
        <AdminContext.Provider
            value={{
                isAdmin,
                usuarios,
                lerLojasAdmin,
                lojaSelecionada,
                lerChamadosAdmin,
                addChamadosAdmin,
                chamadoSelecionado,
                setIsAdmin,
                setUsuarios,
                setLerLojasAdmin,
                setLojaSelecionada,
                setaddChamadosAdmin,
                setLerChamadosAdmin,
                setChamadoSelecionado,
                handleObterUsuarios,
                handleVerificarCargo,
                handleResponderChamado,
                handleCarregarChamados,
                handleCarregarLojasAdmin,
                handleCarregarChamadoLojaDialog,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}