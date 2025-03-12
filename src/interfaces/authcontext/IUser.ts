
export interface IUser {
    id?: string
    name?: string
    email?: string
    password?: string
    cargo?: string
    loja: {
        id: string
        sigla: string
        cnpj: string
        responsavel: string
    }
}

export const initialUser: IUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    cargo: "Inativo",
    loja: {
        id: "",
        sigla: "",
        cnpj: "",
        responsavel: "",
    }
}