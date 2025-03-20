import React from "react"
import { useLojaContext } from "./LojasContext"
import { ILoadingAndStatusProps } from "../interfaces/ILoadingAndStatusProps"

export const LoadingAndStatusContext = React.createContext<ILoadingAndStatusProps>({
    loading: false,
    error: "",
    success: "",
    dialogOpen: "",
    setError: () => { },
    setSuccess: () => { },
    setLoading: () => { },
    setDialogOpen: () => { },
    handleCancelar: () => { },
    handleOpenDialog: () => { },
    handleCloseDialog: () => { },
})

export const useLoadingAndStatusContext = () => React.useContext(LoadingAndStatusContext)

export const LoadingAndStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = React.useState<string | null>(null)
    const { usuarioSelecionado, setUsuarioSelecionado } = useLojaContext()

    const handleOpenDialog = (dialogName: string) => {
        setDialogOpen(dialogName)
        setUsuarioSelecionado(usuarioSelecionado)
    }

    const handleCloseDialog = () => {
        setDialogOpen(null)
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
                dialogOpen,
                setError,
                setSuccess,
                setLoading,
                setDialogOpen,
                handleCancelar,
                handleCloseDialog,
                handleOpenDialog,
            }}
        >
            {children}
        </LoadingAndStatusContext.Provider>
    )
}