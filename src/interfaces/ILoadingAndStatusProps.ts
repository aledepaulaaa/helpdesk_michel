import React from "react"
import { IUser } from "./authcontext/IUser"

export interface ILoadingAndStatusProps {
    loading: boolean
    error: string | null
    success: string | null
    dialogOpenName: string | null
    setError: React.Dispatch<React.SetStateAction<string | null>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setSuccess: React.Dispatch<React.SetStateAction<string | null>>
    setDialogOpenName: React.Dispatch<React.SetStateAction<string | null>>
    handleCancelar: () => void
    handleOpenDialog: (dialogName: string) => void
    handleCloseDialog: () => void
}