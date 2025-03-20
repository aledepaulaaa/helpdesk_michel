import React from "react"
import { useRouter } from "next/router"
import { auth, db } from "../db/firebase"
import { initialUser, IUser } from "../interfaces/authcontext/IUser"
import { IAuthContextProps } from "../interfaces/authcontext/IAuthContextProps"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signOut } from "firebase/auth"

const AuthContext = React.createContext<IAuthContextProps>({
    user: initialUser,
    cargo: "",
    cargoSelecionado: "",
    setUser: () => { },
    setCargo: () => { },
    handleCreateUser: () => { },
    handleLogout: () => { },
    setCargoSelecionado: () => { },
    handleVerificarUsuario: () => { },
    handleEnterCreateAccount: () => { },
})

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<IUser>(initialUser)
    const [cargo, setCargo] = React.useState<string>("")
    const [cargoSelecionado, setCargoSelecionado] = React.useState(cargo)
    const { setError, setSuccess, setLoading } = useLoadingAndStatusContext()
    const router = useRouter()

    const handleCreateUser = async () => {
        setLoading(true)
        try {
            if (!user.name || !user.email || !user.password) {
                setError("Preencha todos os campos")
                return
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!emailRegex.test(user.email)) {
                setError("O email informado não é válido!")
                return
            }

            await createUserWithEmailAndPassword(auth, user.email, user.password).then(async () => {
                setUser({
                    id: auth.currentUser?.uid || "",
                    name: user.name,
                    email: user.email,
                    cargo: user.cargo,
                })

                await addDoc(collection(db, "usuarios"), {
                    email: user.email,
                    cargo: user.cargo,
                    name: user.name,
                    id: auth.currentUser?.uid,
                })

                // Define o token de expiração para 1 hora no futuro
                const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toUTCString()
                document.cookie = `token_exp=${expirationTime} path=/`

                setSuccess("Conta criada com sucesso")
                router.push("/")
            }).catch((error) => {
                setError(error.message)
            })

        } catch (error: any) {
            const errorMessage = error.code === "auth/email-already-in-use"
                ? "E-mail em uso. Crie uma conta para continuar."
                : "Ocorreu um erro inesperado. Tente novamente mais tarde."
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleEnterCreateAccount = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleCreateUser()
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth) // Aguarda o Firebase deslogar

            // Remove o token_exp definindo uma data de expiração no passado
            document.cookie = "token_exp= path=/ expires=Thu, 01 Jan 1970 00:00:00 UTC"

            setUser(initialUser) // Reseta o estado do usuário
            // eliminar chamados do localStorage
            localStorage.removeItem("chamados")
            localStorage.removeItem("ultimaChamada")
            localStorage.removeItem("lojas")
            localStorage.removeItem("usuarios")
            localStorage.removeItem("userIdChamados")
            localStorage.removeItem("chamadosAdmin")
            localStorage.removeItem("lojasAdmin")

            router.replace("/login") // Usa replace para evitar voltar para a página anterior no histórico
        } catch (error) {
            console.error("Erro ao deslogar:", error)
        }
    }

    const handleVerificarUsuario = async () => {
        setLoading(true)
        try {
            const userAuth = auth.currentUser?.uid
            if (!userAuth) {
                // console.log("Usuário não autenticado (handleVerificarUsuario)")
                return
            }
            const userRef = collection(db, "usuarios")
            const q = query(userRef, where("id", "==", userAuth))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                console.log("Usuário não encontrado (handleVerificarUsuario)")
                return
            }

            const userData = querySnapshot.docs[0].data()
            const userCargo = userData.cargo || ""

            if (userData.cargo === "Inativo") {
                setCargo("Inativo")
                localStorage.setItem("cargo", "Inativo")
            } else {
                setCargo(userData.cargo)
                localStorage.setItem("cargo", userCargo)
            }
        } catch (error) {
            console.log("Erro ao verificar usuário (handleVerificarUsuario): ", error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {

                        setUser({
                            id: user.uid,
                            name: user.displayName || "Sem Nome",
                            email: user.email || "",
                            password: "",
                            cargo: localStorage.getItem("cargo") || "",
                        })

                        const cargoLocal = localStorage.getItem("cargo") || ""
                        const cargoString = JSON.stringify(cargoLocal)

                        if (!cargoString) {
                            await handleVerificarUsuario()
                        } else {
                            const getCargoLocal = localStorage.getItem("cargo") || ""
                            setCargo(getCargoLocal) // Define o cargo do localStorage
                        }
                        router.push("/")
                    } else {
                        setUser(initialUser)
                        setCargo("")
                        localStorage.removeItem("cargo")
                    }
                })
            })
            .catch((error) => {
                console.error("Erro ao configurar persistência:", error)
            })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                cargo,
                setUser,
                setCargo,
                cargoSelecionado,
                setCargoSelecionado,
                handleLogout,
                handleCreateUser,
                handleVerificarUsuario,
                handleEnterCreateAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
