import React from "react"
import { auth, db } from "../db/firebase"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { ILojas, ILojasContextProps, lojasIniciais } from "../interfaces/ILojasContextProps"
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useRouter } from "next/router"

export const LojasContext = React.createContext<ILojasContextProps>({
    lojas: lojasIniciais,
    carregarLojas: lojasIniciais,
    setLojas: () => { },
    setCarregarLojas: () => { },
    isDialogOpen: false,
    handleOpenDialog: () => { },
    handleCloseDialog: () => { },
    handleSalvarLoja: () => { },
    handleCancelar: () => { },
    handleObterLocalizacao: () => { },
    handleExcluirLoja: () => { },
    handleBuscarLojas: () => { },
})

export const useLojaContext = () => React.useContext(LojasContext)

export const LojasContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [lojas, setLojas] = React.useState<ILojas>(lojasIniciais)
    const [carregarLojas, setCarregarLojas] = React.useState<ILojas>(lojasIniciais)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const { setSuccess, setError, setLoading } = useLoadingAndStatusContext()
    const router = useRouter()

    const handleOpenDialog = () => setIsDialogOpen(true)
    const handleCloseDialog = () => setIsDialogOpen(false)

    const handleCancelar = () => {
        setLojas(lojasIniciais)
        handleCloseDialog()
    }

    const handleBuscarLojas = async () => {
        setLoading(true)
        try {
            const user = auth.currentUser
            if (user) {
                const lojasRef = collection(db, "lojas")
                const q = query(lojasRef, where("id", "==", user.uid))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const lojaData = querySnapshot.docs[0].data()
                    setCarregarLojas(lojaData.loja as any)
                    localStorage.setItem("lojas", JSON.stringify(lojaData.loja))
                } else {
                    setCarregarLojas(lojasIniciais)
                }
            } else {
                setCarregarLojas(lojasIniciais)
            }
        } catch (error) {
            console.error("Erro ao buscar lojas do Firestore: ", error)
            setError("Erro ao buscar dados das lojas.")
        } finally {
            setLoading(false)
        }
    }

    const handleSalvarLoja = async () => {
        setLoading(true)
        try {
            const user = auth.currentUser
            if (user) {
                const userRef = doc(db, "lojas", user.uid)
                await setDoc(userRef, { loja: lojas, id: user.uid }, { merge: true })
            } else {
                setError("Não foi possível cadastrar sua loja, tente novamente")
            }

            localStorage.setItem("lojas", JSON.stringify(lojas))
            setSuccess("Loja cadastrada com sucesso!")
            setCarregarLojas(lojas)
            handleCloseDialog()
        } catch (error) {
            console.error("Erro ao registrar loja: ", error)
            setError("Não foi possível cadastrar sua loja, tente novamente")
        } finally {
            setLoading(false)
        }
    }

    const handleExcluirLoja = async () => {
        setLoading(true)
        try {

            const user = auth.currentUser
            if (user) {
                const userRef = doc(db, "lojas", user.uid)
                await deleteDoc(userRef)
                setSuccess("Loja excluída com sucesso!")
            } else {
                setError("Não foi possível excluir sua loja, documento não encontrado")
            }

            localStorage.removeItem("lojas")
            setCarregarLojas(lojasIniciais)
            setSuccess("Loja excluída com sucesso!")
            handleCloseDialog()
        } catch (error) {
            console.error("Erro ao excluir loja: ", error)
            setError("Não foi possível excluir sua loja, tente novamente")
        } finally {
            setLoading(false)
        }
    }

    const handleObterLocalizacao = async () => {
        try {
            setLoading(true)
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setLojas({ ...lojas, localizacao: `${latitude}, ${longitude}` })
                    },
                    (error) => {
                        console.error("Erro ao obter a localização: ", error)
                    }
                )
            } else {
                console.error("Geolocalização não suportada pelo navegador.")
            }
        } catch (error) {
            console.log("Problema ao obter localização: ", error)
        } finally {
            setLoading(false)
        }
    }

    const lojaContextValue = React.useMemo(() => ({
        lojas,
        isDialogOpen,
        carregarLojas,
        setLojas,
        setCarregarLojas,
        handleSalvarLoja,
        handleOpenDialog,
        handleCloseDialog,
        handleCancelar,
        handleObterLocalizacao,
        handleExcluirLoja,
        handleBuscarLojas,
    }), [ // Dependências do useMemo: inclua todos os valores que podem mudar e que estão no value
        lojas,
        isDialogOpen,
        carregarLojas,
        setLojas,
        setCarregarLojas,
        handleSalvarLoja,
        handleOpenDialog,
        handleCloseDialog,
        handleCancelar,
        handleObterLocalizacao,
        handleExcluirLoja,
        handleBuscarLojas,
    ])

    return (
        <LojasContext.Provider value={lojaContextValue}>
            {children}
        </LojasContext.Provider>
    )
}