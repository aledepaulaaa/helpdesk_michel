import { IUser } from "./authcontext/IUser"

export interface ICargoDialogProps {
    usuario: IUser | null
    isOpen: boolean
    onClose: () => void
}