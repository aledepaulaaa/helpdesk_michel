export interface IUser {
    id?: string
    name?: string
    email: string
    password: string
    cargo?: string
}

export const initialUser: IUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    cargo: "Usuário"
}