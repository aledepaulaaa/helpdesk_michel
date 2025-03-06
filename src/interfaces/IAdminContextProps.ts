import { ILojasContextProps, ILojaSelecionada } from "./ILojasContextProps"

export interface IAdminContextProps {
    isAdmin: boolean
    isDialogOpen: boolean
    lerLojasAdmin: ILojasContextProps[]
    lerChamadosAdmin: ILerChamadosAdminProps[]
    addChamadosAdmin: IGerenciarChamadosAdminProps
    chamadoSelecionado: ILerChamadosAdminProps | null
    lojaSelecionada: ILojaSelecionada | null
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setLerLojasAdmin: React.Dispatch<React.SetStateAction<ILojasContextProps[]>>
    setaddChamadosAdmin: React.Dispatch<React.SetStateAction<IGerenciarChamadosAdminProps>>
    setLerChamadosAdmin: React.Dispatch<React.SetStateAction<ILerChamadosAdminProps[]>>
    setChamadoSelecionado: React.Dispatch<React.SetStateAction<ILerChamadosAdminProps | null>>
    setLojaSelecionada: React.Dispatch<React.SetStateAction<ILojaSelecionada | null>>
    handleCancelar: () => void
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    handleVerificarCargo: () => void
    handleCarregarChamados: () => void
    handleCarregarLojasAdmin: () => void
    handleResponderChamado: () => void
    handleCarregarChamadoLojaDialog: (value: string) => void
}

export interface ILerChamadosAdminProps {
    id: string
    data: string
    solicitacao: string
    status: string
    titulo: string
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
