import React from "react"
import { db, auth } from "@/src/db/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { dadosIniciais, IDadosUsuario } from "@/src/interfaces/IDadosUsuario"

export default function usePerfil() {
    const [dadosUsuario, setDadosUsuario] = React.useState<IDadosUsuario>(dadosIniciais)
    const { setError, setLoading } = useLoadingAndStatusContext()

    const fetchPerfil = async () => {
        setLoading(true)
        setError(null)

        try {
            const user = auth.currentUser
            if (!user?.uid) {
                throw new Error("Usuário não autenticado")
            }

            const lojasRef = collection(db, "usuarios")
            const q = query(lojasRef, where("id", "==", user.uid))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                throw new Error("Usuário não encontrado")
            }

            const userData = querySnapshot.docs[0].data() as IDadosUsuario
            setDadosUsuario(userData)

        } catch (error) {
            setError(error instanceof Error ? error.message : "Erro ao carregar dados do usuário")
            setDadosUsuario(dadosIniciais)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPerfil()

        // Set up auth state listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchPerfil()
            } else {
                setDadosUsuario(dadosIniciais)
            }
        })

        return () => unsubscribe()
    }, [])

    return {
        dadosUsuario,
    }
}
