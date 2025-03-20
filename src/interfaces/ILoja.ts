export interface ILoja {
    userId: string
    lojaId: string
    loja: {
        cnpj: string
        responsavel: string
        sigla: string
    }
}

export const lojaInicial: ILoja = {
    userId: "",
    lojaId: "",
    loja: {
        cnpj: "",
        responsavel: "",
        sigla: ""
    }
}