import { IUser } from "./authcontext/IUser"

export interface IDetalhesChamado {
    solicitacao: string
    status: string
    titulo: string
}

export interface IChamadoCompleto {
    id: string
    data: string
    titulo: string
    solicitacao: string
    status: string
    loja: IUser
}

export const chamadocompletoInicial: IChamadoCompleto = {
    id: "",
    data: "",
    titulo: "",
    solicitacao: "",
    status: "",
    loja:{
        id: "",
        cargo: "",
        loja:{
            id: "",
            sigla: "",
            cnpj: "",
            responsavel: "",
        },
        email: "",
        name: "",
        password: "",
    }
}

export const detalhechamadoInicial: IDetalhesChamado = {
    solicitacao: "",
    status: "Pendente",
    titulo: "",
}

export interface IAcoesChamadoContextProps {
    addChamados: IDetalhesChamado
    setAddChamados: React.Dispatch<React.SetStateAction<IDetalhesChamado>>
    chamados: IChamadoCompleto
    setChamados: React.Dispatch<React.SetStateAction<IChamadoCompleto>>
    handleSalvarChamado: () => void
    handleObterChamados: () => void
    handleCancelar: () => void
    chamadosPaginados: IChamadoCompleto[]
}

