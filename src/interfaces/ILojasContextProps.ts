import { IUser } from "./authcontext/IUser"
import { ILoja } from "./ILoja"

export interface ILojasContextProps {
    lojas: ILoja
    carregarLojas: ILoja
    usuarioSelecionado: IUser
    setLojas: React.Dispatch<React.SetStateAction<ILoja>>
    setCarregarLojas: React.Dispatch<React.SetStateAction<ILoja>>
    setUsuarioSelecionado: React.Dispatch<React.SetStateAction<IUser>>
    handleSalvarLoja: (userId: string) => void
    handleBuscarLojas: () => void
    handleExcluirLoja: (userId: string) => void
}
