import React from "react"
import { db } from "../db/firebase"
import { initialUser, IUser } from "../interfaces/authcontext/IUser"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { ILojasContextProps } from "../interfaces/ILojasContextProps"
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { ILoja, lojaInicial } from "../interfaces/ILoja"

export const LojasContext = React.createContext<ILojasContextProps>({
    lojas: lojaInicial,
    usuarioSelecionado: initialUser,
    carregarLojas: lojaInicial,
    setLojas: () => { },
    setCarregarLojas: () => { },
    setUsuarioSelecionado: () => { },
    handleSalvarLoja: () => { },
    handleExcluirLoja: () => { },
    handleBuscarLojas: () => { },
})

export const useLojaContext = () => React.useContext(LojasContext)

export const LojasContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [lojas, setLojas] = React.useState<ILoja>(lojaInicial)
    const [carregarLojas, setCarregarLojas] = React.useState<ILoja>(lojaInicial)
    const [usuarioSelecionado, setUsuarioSelecionado] = React.useState<IUser>(initialUser)
    const { setSuccess, setError, setLoading, handleCloseDialog } = useLoadingAndStatusContext()

    const handleBuscarLojas = async () => {
        setLoading(true)
        try {
            const usuariosRef = collection(db, "lojas")
            const querySnapshot = await getDocs(usuariosRef)
            const lojasPorUsuario: { [userId: string]: any } = {}

            querySnapshot.docs.forEach((doc) => {
                lojasPorUsuario[doc.id] = doc.data()
            })

            localStorage.setItem("lojasAdmin", JSON.stringify(lojasPorUsuario))
            setCarregarLojas(lojasPorUsuario as any)
            setSuccess("Lojas carregadas com sucesso!")
        } catch (error) {
            console.error("Erro ao buscar lojas do Firestore: ", error)
            setError("Erro ao buscar dados das lojas.")
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleSalvarLoja = async (userId: string) => {
        setLoading(true)
        try {
            const lojaDocRef = doc(db, "lojas", userId)
            await setDoc(lojaDocRef, { userId: userId, loja: lojas.loja }, { merge: true })

            setSuccess("Loja cadastrada com sucesso!")
            await handleBuscarLojas()
            handleCloseDialog()
        } catch (error) {
            console.error("Erro ao registrar loja: ", error)
            setError("Não foi possível cadastrar sua loja, tente novamente")
        } finally {
            setLoading(false)
        }
    }

    const handleExcluirLoja = async (userId: string) => {
        setLoading(true)
        try {
            const userRef = doc(db, "lojas", userId)
            await deleteDoc(userRef)

            const lojasDoLocalStorage = localStorage.getItem("lojasAdmin")
            if (lojasDoLocalStorage) {
                try {
                    const lojasParseadas = JSON.parse(lojasDoLocalStorage)
                    delete lojasParseadas[userId]; // Remove a loja pelo userId
                    localStorage.setItem("lojasAdmin", JSON.stringify(lojasParseadas))
                } catch (error) {
                    console.error("Erro ao parsear e remover loja do localStorage:", error)
                }
            }

            setSuccess("Loja excluída com sucesso!")
            await handleBuscarLojas()
            handleCloseDialog()
        } catch (error) {
            console.error("Erro ao excluir loja: ", error)
            setError("Não foi possível excluir sua loja, tente novamente")
        } finally {
            setLoading(false)
        }
    }

    return (
        <LojasContext.Provider value={{
            lojas,
            carregarLojas,
            usuarioSelecionado,
            setLojas,
            setCarregarLojas,
            setUsuarioSelecionado,
            handleSalvarLoja,
            handleBuscarLojas,
            handleExcluirLoja,
        }}>
            {children}
        </LojasContext.Provider>
    )
}