import React from "react"
import { useLoadingAndStatusContext } from "./LoadingAndStatus"
import { useAdminContext } from "./AdminContext"
import { db } from "../db/firebase"
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"

export interface IResponderChamado {
    resposta: string
    status: string
    preco: string
    data: string
    chamadoId?: string
}

export const respostaInicial: IResponderChamado = {
    resposta: "",
    status: "",
    preco: "",
    data: "",
    chamadoId: ""
}

export interface IChamadosContextProps {
    responderChamado: IResponderChamado,
    setResponderChamado: React.Dispatch<React.SetStateAction<IResponderChamado>>
    handleResponderChamado: (chamadoId: string) => void
}

export const ChamadosContext = React.createContext<IChamadosContextProps>({
    responderChamado: respostaInicial,
    setResponderChamado: () => { },
    handleResponderChamado: () => { }
})

export const useChamadosContext = () => React.useContext(ChamadosContext)

export const ChamadosProvider = ({ children }: { children: React.ReactNode }) => {
    const [responderChamado, setResponderChamado] = React.useState<IResponderChamado>(respostaInicial)
    const { setLoading, setSuccess, setError } = useLoadingAndStatusContext()
    const { handleCarregarChamados } = useAdminContext()

    const handleResponderChamado = async (chamadoId: string) => {
        setLoading(true)
        try {
            // 1. VALIDAÇÃO (Importante!)
            if (!chamadoId) {
                setError("ID do chamado inválido.")
                setLoading(false)
                return
            }

            if (!responderChamado.resposta || !responderChamado.preco) {
                setError("Preencha todos os campos da resposta.")
                setLoading(false)
                return
            }


            // 2. DADOS DA RESPOSTA
            const resposta = responderChamado.resposta
            const preco = responderChamado.preco
            const dataResposta = new Date().toLocaleString() // Data e hora atuais

            // 3. CRIAR DOCUMENTO EM respostas_chamados
            const respostasRef = collection(db, "respostas_chamados")
            await addDoc(respostasRef, {
                chamadoId,  // Usa o chamadoId recebido
                resposta,
                preco,
                dataResposta,
                status: "Em andamento"
            })

            // 4. ATUALIZAR STATUS DO CHAMADO ORIGINAL
            const chamadoRef = doc(db, "chamados", chamadoId)
            await updateDoc(chamadoRef, {
                status: "Em andamento" // Atualiza o status
            })

            // 5. FEEDBACK E LIMPEZA
            setSuccess("Chamado respondido com sucesso!")
            setResponderChamado(respostaInicial) // Limpa os campos
            await handleCarregarChamados() // Recarrega a lista de chamados do ADMIN.
        } catch (error) {
            console.error("Erro ao responder chamado:", error)
            setError("Erro ao responder chamado")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ChamadosContext.Provider
            value={{
                responderChamado,
                setResponderChamado,
                handleResponderChamado
            }}
        >
            {children}
        </ChamadosContext.Provider>
    )
}