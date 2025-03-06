export interface ILojasContextProps {
    isDialogOpen: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    handleCancelar: () => void
    handleSalvarLoja: () => void
    handleBuscarLojas: () => void
    handleObterLocalizacao: () => void
    handleExcluirLoja: () => void
    id?: string
    lojas: ILojas
    carregarLojas: ILojas
    setLojas: React.Dispatch<React.SetStateAction<ILojas>>
    setCarregarLojas: React.Dispatch<React.SetStateAction<ILojas>>
}

export interface ILojaSelecionada {
    id: string
    loja: {
        sigla: string
        localizacao: string
        telefone: string
        email: string
        cnpj: string
        responsavel: string
    }
}

export interface ILojas {
    id: string
    sigla: string
    localizacao: string
    telefone: string
    email: string
    cnpj: string
    responsavel: string
}

export const lojasIniciais: ILojas = {
    id: "",
    sigla: "",
    localizacao: "",
    telefone: "",
    email: "",
    cnpj: "",
    responsavel: "",
}