export interface IDetalhesChamado {
    solicitacao: string
    status: string
    titulo: string
}

export interface IChamadoCompleto {
    data: string
    lojaId: string
    solicitacao: string
    status: string
    titulo: string
    userId: string
}

export const chamadocompletoInicial: IChamadoCompleto = {
    data: "",
    lojaId: "",
    solicitacao: "",
    status: "",
    titulo: "",
    userId: "",
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

