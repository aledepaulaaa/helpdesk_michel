import React from "react"
import { IUser } from "../interfaces/authcontext/IUser"
import { useLojaContext } from "./LojasContext"
import { ILoadingAndStatusProps } from "../interfaces/ILoadingAndStatusProps"

export const LoadingAndStatusContext = React.createContext<ILoadingAndStatusProps>({
    loading: false,
    error: "",
    success: "",
    dialogOpenName: null,
    setError: () => { },
    setSuccess: () => { },
    setLoading: () => { },
    setDialogOpenName: () => { },
    handleCancelar: () => { },
    handleOpenDialog: () => { },
    handleCloseDialog: () => { },
})

export const useLoadingAndStatusContext = () => React.useContext(LoadingAndStatusContext)

export const LoadingAndStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<string | null>(null)
    const [dialogOpenName, setDialogOpenName] = React.useState<string | null>(null)
    const { usuarioSelecionado, setUsuarioSelecionado } = useLojaContext()

    const handleOpenDialog = (dialogName: string) => {
        setDialogOpenName(dialogName)
        setUsuarioSelecionado(usuarioSelecionado)
    }

    const handleCloseDialog = () => {
        setDialogOpenName(null)
    }

    const handleCancelar = () => {
        handleCloseDialog()
    }

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
                dialogOpenName,
                setError,
                setSuccess,
                setLoading,
                setDialogOpenName,
                handleCancelar,
                handleCloseDialog,
                handleOpenDialog,
            }}
        >
            {children}
        </LoadingAndStatusContext.Provider>
    )
}