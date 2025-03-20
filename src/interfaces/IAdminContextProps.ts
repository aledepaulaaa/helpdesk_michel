import { IUser } from "./authcontext/IUser"
import { ILoja } from "./ILoja"

export interface IAdminContextProps {
    isAdmin: boolean
    usuarios: IUser[]
    lerLojasAdmin: ILoja[]
    lerChamadosAdmin: ILerChamadosAdminProps[]
    chamadoSelecionado: IChamadoDetalhado | null
    lojaSelecionada: ILoja
    setUsuarios: React.Dispatch<React.SetStateAction<IUser[]>>
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
    setLerLojasAdmin: React.Dispatch<React.SetStateAction<ILoja[]>>
    setLerChamadosAdmin: React.Dispatch<React.SetStateAction<ILerChamadosAdminProps[]>>
    setChamadoSelecionado: React.Dispatch<React.SetStateAction<IChamadoDetalhado | null>>
    setLojaSelecionada: React.Dispatch<React.SetStateAction<ILoja>>
    handleObterUsuarios: () => void
    handleVerificarCargo: () => void
    handleCarregarChamados: () => void
    handleCarregarLojasAdmin: () => void
    handleAlterarCargoUsuario: (usuario: IUser, cargo: string) => void
}

export interface ILerChamadosAdminProps {
    id: string
    data: string
    titulo: string
    status: string
    solicitacao: string
    lojaId: string
}

export interface IGerenciarChamadosAdminProps {
    resposta: string
    status: string
    preco: string
}

export const chamadoAdminInicial: IGerenciarChamadosAdminProps = {
    resposta: "",
    status: "",
    preco: ""
}

export interface IChamadoDetalhado {
    chamado: ILerChamadosAdminProps
    loja: ILoja
}
