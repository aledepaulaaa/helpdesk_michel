import React, { useMemo } from "react"
import { IUser } from "../interfaces/authcontext/IUser"
import { db, auth } from "../db/firebase"
import { ILoja, lojaInicial } from "../interfaces/ILoja"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore"
import { IAdminContextProps, IChamadoDetalhado, ILerChamadosAdminProps } from "../interfaces/IAdminContextProps"

export const AdminContext = React.createContext<IAdminContextProps>({
    isAdmin: false,
    usuarios: [],
    lerLojasAdmin: [],
    lerChamadosAdmin: [],
    chamadoSelecionado: null,
    lojaSelecionada: lojaInicial,
    setIsAdmin: () => { },
    setUsuarios: () => { },
    setLerLojasAdmin: () => { },
    setLojaSelecionada: () => { },
    setLerChamadosAdmin: () => { },
    setChamadoSelecionado: () => { },
    handleObterUsuarios: () => { },
    handleVerificarCargo: () => { },
    handleCarregarChamados: () => { },
    handleCarregarLojasAdmin: () => { },
    handleAlterarCargoUsuario: () => { },
})

export const useAdminContext = () => React.useContext(AdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
    const [usuarios, setUsuarios] = React.useState<IUser[]>([])
    const [lerChamadosAdmin, setLerChamadosAdmin] = React.useState<ILerChamadosAdminProps[]>([])
    const [lerLojasAdmin, setLerLojasAdmin] = React.useState<ILoja[]>([])
    const [lojaSelecionada, setLojaSelecionada] = React.useState<ILoja>(lojaInicial)
    const [chamadoSelecionado, setChamadoSelecionado] = React.useState<IChamadoDetalhado | null>(null)
    const memorizeLojasAdmin = useMemo(() => lerLojasAdmin, [lerLojasAdmin])
    const { setLoading, setSuccess, setError } = useLoadingAndStatusContext()

    const handleObterUsuarios = async () => {
        try {
            const userDocRef = collection(db, "usuarios")
            const querySnapshot = await getDocs(userDocRef)

            if (querySnapshot.empty) {
                console.log("Nenhum usuário encontrado")
                return
            }

            const usuarios = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
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
            // localStorage.setItem("chamadosAdmin", JSON.stringify(chamadosData))
        } catch (error) {
            console.error("Erro ao carregar chamados:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAlterarCargoUsuario = async (usuario: IUser, novoCargo: string) => {
        setLoading(true)
        try {
            // 1. Referência para a COLEÇÃO de usuários
            const usuariosRef = collection(db, "usuarios")

            // 2. Consulta para encontrar o usuário pelo campo 'id' (ou qualquer que seja o campo)
            if (!usuario.id) {
                setError("Usuário não encontrado")
                setLoading(false)
                return
            }
            const q = query(usuariosRef, where("id", "==", usuario.id))
            const querySnapshot = await getDocs(q)


            // 3. Verificar se encontrou o usuário
            if (querySnapshot.empty) {
                setError("Usuário não encontrado.")
                setLoading(false)
                return
            }

            // 4. Pegar a referência do documento (agora com o ID correto do Firestore)
            const userDocRef = querySnapshot.docs[0].ref

            // 5. Atualizar o documento
            await updateDoc(userDocRef, {
                cargo: novoCargo
            })

            // 6. Atualizar o estado local (agora a comparação funciona, pois u.id é o id do doc)
            setUsuarios(prevUsuarios =>
                prevUsuarios.map(u =>
                    u.id === usuario.id ? { ...u, cargo: novoCargo } : u
                )
            )
            setSuccess("Cargo alterado com sucesso!")


        } catch (error: any) {
            console.error("Erro ao alterar cargo do usuário: ", error)
            setError("Erro ao alterar cargo. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        handleCarregarLojasAdmin()
    }, [])

    return (
        <AdminContext.Provider
            value={{
                isAdmin,
                usuarios,
                lerLojasAdmin: memorizeLojasAdmin,
                lojaSelecionada,
                lerChamadosAdmin,
                chamadoSelecionado,
                setIsAdmin,
                setUsuarios,
                setLerLojasAdmin,
                setLojaSelecionada,
                setLerChamadosAdmin,
                setChamadoSelecionado,
                handleObterUsuarios,
                handleVerificarCargo,
                handleCarregarChamados,
                handleCarregarLojasAdmin,
                handleAlterarCargoUsuario,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}