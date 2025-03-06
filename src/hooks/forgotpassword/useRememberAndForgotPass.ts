import React from "react"
import { IUser } from "@/src/interfaces/authcontext/IUser"
import { useAuthContext } from "@/src/context/AuthContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/src/db/firebase"

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY

export default function useRememberAndForgotPass() {
    const { user, setUser } = useAuthContext()
    const { setLoading, setSuccess, setError } = useLoadingAndStatusContext()
    const [showPass, setShowPass] = React.useState(false)
    const [rememberMe, setRememberMe] = React.useState(false)

    React.useEffect(() => {
        const encryptedPassword = localStorage.getItem("rememberedPassword")
        if (encryptedPassword) {
            decryptPassword(encryptedPassword).then((password) => {
                setUser({ ...user, password })
            })
        }
    }, [])

    const handleRemember = async (checked: boolean) => {
        setRememberMe(checked)
        if (checked) {
            const encryptedPassword = await encryptPassword(user.password)
            localStorage.setItem("rememberedPassword", encryptedPassword)
        } else {
            localStorage.removeItem("rememberedPassword")
        }
    }

    const encryptPassword = async (password: IUser['password']): Promise<IUser['password']> => {
        const enc = new TextEncoder()
        const encodedPassword = enc.encode(password)
        const key = await crypto.subtle.importKey(
            "raw",
            Buffer.from(SECRET_KEY as string, "base64"),
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        )
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            encodedPassword
        )
        return JSON.stringify({ iv: Array.from(iv), encrypted: Array.from(new Uint8Array(encrypted)) })
    }

    const decryptPassword = async (data: string): Promise<string> => {
        const { iv, encrypted } = JSON.parse(data)
        const key = await crypto.subtle.importKey(
            "raw",
            Buffer.from(SECRET_KEY as string, "base64"),
            { name: "AES-GCM, length: 256" },
            false,
            ["decrypt"]
        )
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: new Uint8Array(iv) },
            key,
            new Uint8Array(encrypted)
        )
        const dec = new TextDecoder()
        return dec.decode(decrypted)
    }

    const handleResetPassword = async () => {
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, user.email)
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
        if (rememberMe) {
            const encryptedPassword = await encryptPassword(user.password)
            localStorage.setItem('encryptedPassword', encryptedPassword)
        }
        handleLogin()
    }

    return {
        showPass,
        setShowPass,
        rememberMe,
        handleLoginClick,
        handleRemember,
        handleResetPassword,
        handleClickShowPassword,
    }
}
