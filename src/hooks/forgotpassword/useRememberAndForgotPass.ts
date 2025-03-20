import React from "react"
import { auth } from "@/src/db/firebase"
import { useAuthContext } from "@/src/context/AuthContext"
import { sendPasswordResetEmail } from "firebase/auth"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"

export default function useRememberAndForgotPass() {
    const { user } = useAuthContext()
    const { setLoading, setSuccess, setError } = useLoadingAndStatusContext()
    const [showPass, setShowPass] = React.useState(false)
    
    const handleResetPassword = async () => {
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, user?.email as string)
            setSuccess("Email enviado com sucesso!")
        } catch (error) {
            setError("Erro ao enviar email")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleClickShowPassword = () => setShowPass(!showPass)

    const handleLoginClick = async ({ handleLogin }: { handleLogin: () => void }) => {
        handleLogin()
    }

    return {
        showPass,
        setShowPass,
        handleLoginClick,
        handleResetPassword,
        handleClickShowPassword,
    }
}
