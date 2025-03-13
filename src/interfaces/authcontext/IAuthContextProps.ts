import React from "react"
import { IUser } from "./IUser"

export interface IAuthContextProps {
    user: IUser
    cargo: string
    cargoSelecionado: string
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    setCargo: React.Dispatch<React.SetStateAction<string>>
    setCargoSelecionado: React.Dispatch<React.SetStateAction<string>>
    handleLogout: () => void
    handleCreateUser: () => void
    handleVerificarUsuario: () => void
    handleEnterCreateAccount: (event: React.KeyboardEvent<HTMLDivElement>) => void
}