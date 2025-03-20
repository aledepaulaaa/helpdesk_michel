import React from "react"
import { db } from "@/src/db/firebase"
import { doc, getDoc } from "firebase/firestore" // Importa só o necessário
import { Chip, Divider, Grid2, Paper, Stack, Typography } from "@mui/material"
import { ILoja } from "@/src/interfaces/ILoja" // Importa ILoja
import { IChamado } from "@/src/interfaces/IChamado" // Importa IChamado

export default function ChamadoseLojasCarregadas({ chamadoId }: { chamadoId: string }) {
    const [lojaSelecionada, setLojaSelecionada] = React.useState<ILoja | null>(null)
    const [chamado, setChamado] = React.useState<IChamado | null>(null)

    const carregarChamadoELoja = async () => {
        try {
            // 1. Buscar o CHAMADO pelo seu ID único
            const chamadoRef = doc(db, "chamados", chamadoId)
            const chamadoSnap = await getDoc(chamadoRef)

            if (chamadoSnap.exists()) {
                // O chamado existe!  Faz o cast para IChamado *aqui*.
                const chamadoData = { lojaId: chamadoSnap.id, ...chamadoSnap.data() } as IChamado
                setChamado(chamadoData)

                // 2. Buscar a LOJA usando o lojaId do chamado
                const lojaRef = doc(db, "lojas", chamadoData.lojaId)
                const lojaSnap = await getDoc(lojaRef)

                if (lojaSnap.exists()) {
                    //Validar se os dados existem dentro do documento
                    const lojaData = lojaSnap.data()?.loja
                        ? { userId: lojaSnap.id, ...lojaSnap.data() } as ILoja
                        : null
                    setLojaSelecionada(lojaData)

                } else {
                    console.log("Loja não encontrada para o ID:", chamadoData.lojaId)
                    setLojaSelecionada(null)
                }
            } else {
                console.log("Chamado não encontrado com ID:", chamadoId)
                setChamado(null)
            }
        } catch (error) {
            console.error("Erro ao buscar chamado/loja:", error)
        }
    }

    React.useEffect(() => {
        if (chamadoId) {
            carregarChamadoELoja()
        }
    }, [chamadoId])

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography textAlign="center" variant="h6" fontWeight="bold">Loja</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="start">
                {lojaSelecionada && lojaSelecionada.loja && (
                    <Grid2 size={{ xs: 12 }}>
                        <Typography variant="body1">Sigla: {lojaSelecionada.loja.sigla}</Typography>
                        <Typography variant="body1">Cnpj: {lojaSelecionada.loja.cnpj}</Typography>
                        <Typography variant="body1">Responsável: {lojaSelecionada.loja.responsavel}</Typography>
                    </Grid2>
                )}
            </Grid2>

            <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography textAlign="center" variant="h6" fontWeight="bold">Chamado</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="start">
                {chamado && (
                    <Grid2 size={{ xs: 12 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body1">Status: </Typography>
                            <Chip label={chamado.status} color={chamado.status === "Pendente" ? "warning" : "success"} />
                        </Stack>
                        <Typography variant="body1">Título: {chamado.titulo}</Typography>
                        <Typography variant="body1">Data/Hora: {chamado.data}</Typography>
                        <Divider sx={{ height: "1px", width: "100%", my: 2 }} />
                        <Paper sx={{ p: 1, backgroundColor: "Background" }}>
                            <Typography variant="body1" textAlign="center">{chamado.solicitacao}</Typography>
                        </Paper>
                    </Grid2>
                )}
            </Grid2>
        </Grid2>
    )
}