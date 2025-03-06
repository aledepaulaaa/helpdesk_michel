import React from "react"
import { ILoadingAndStatusProps } from "../interfaces/ILoadingAndStatusProps"

export const LoadingAndStatusContext = React.createContext<ILoadingAndStatusProps>({
    loading: false,
    error: "",
    success: "",
    setError: () => { },
    setSuccess: () => { },
    setLoading: () => { },
})

export const useLoadingAndStatusContext = () => React.useContext(LoadingAndStatusContext)

export const LoadingAndStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<string | null>(null)

    // Adicionar um setTimeout para ocultar mensagens de erro ou sucesso
    React.useEffect(() => {
        if (error || success) {
            setTimeout(() => {
                setError(null)
                setSuccess(null)
            }, 3000)
        }
    }, [error, success])

    return (
        <LoadingAndStatusContext.Provider
            value={{
                error,
                success,
                loading,
                setError,
                setSuccess,
                setLoading,
            }}
        >
            {children}
        </LoadingAndStatusContext.Provider>
    )
}