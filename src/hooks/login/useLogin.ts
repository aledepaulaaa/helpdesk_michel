import { auth } from "@/src/db/firebase"
import { useRouter } from "next/router"
import { useAuthContext } from "@/src/context/AuthContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function useLogin() {
    const { user } = useAuthContext()
    const { setLoading, setError, setSuccess } = useLoadingAndStatusContext()
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        try {
            if (!user.email || !user.password) {
                setError("Preencha todos os campos")
                return
            }

            await signInWithEmailAndPassword(auth, user.email, user.password)
                .then(() => {
                    // Define um novo token de expiração ao fazer login
                    const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toUTCString()
                    document.cookie = `token_exp=${expirationTime}; path=/;`

                    setSuccess("Login realizado com sucesso!")
                    router.push("/")
                })
                .catch((error) => {
                    setError(
                        error.message === "Firebase: Error (auth/invalid-credential)"
                            ? "Email ou senha incorretos"
                            : "Credenciais inválidas"
                    )
                })
        } catch (error: any) {
            setError("Ocorreu um erro ao realizar login. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }
    }

    const handleEnterLogin = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleLogin()
        }
    }

    return {
        handleLogin,
        handleEnterLogin
    }
}