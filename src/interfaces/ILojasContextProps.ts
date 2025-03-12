import { IUser } from "./authcontext/IUser"

export interface ILojasContextProps {
    lojas: IUser
    carregarLojas: IUser[]
    usuarioSelecionado: IUser
    setLojas: React.Dispatch<React.SetStateAction<IUser>>
    setCarregarLojas: React.Dispatch<React.SetStateAction<IUser[]>>
    setUsuarioSelecionado: React.Dispatch<React.SetStateAction<IUser>>
    handleSalvarLoja: (userId: string) => void
    handleBuscarLojas: () => void
    handleExcluirLoja: (userId: string) => void
}
