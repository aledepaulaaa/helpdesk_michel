import React from "react"
import { initialUser, IUser } from "./IUser"

export interface IAuthContextProps {
    handleCreateUser: () => void
    handleEnterCreateAccount: (event: React.KeyboardEvent<HTMLDivElement>) => void
    handleLogout: () => void
    user: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}

export const initialAuthContextProps: IAuthContextProps = {
    handleCreateUser: () => {},
    handleEnterCreateAccount: () => {},
    handleLogout: () => {},
    user: initialUser,
    setUser: () => {}
}