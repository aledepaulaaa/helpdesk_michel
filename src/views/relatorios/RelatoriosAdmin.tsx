import React from "react"
import { db } from "@/src/db/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Grid2} from "@mui/material"

interface RespostaChamado {
    id: string
    chamadoId: string
    resposta: string
    preco: string
    dataResposta: string
    userId: string
    status: string
}

export default function RelatoriosAdmin(){
    const [respostas, setRespostas] = React.useState<RespostaChamado[]>([])

    const handleFetchRespostas = async () => {
        try {
            const respostasRef = collection(db, "respostas_chamados")
            const querySnapshot = await getDocs(respostasRef)
            const respostasData: RespostaChamado[] = []
            querySnapshot.forEach((doc) => {
                const resposta = { chamadoId: doc.id, ...doc.data() } as RespostaChamado
                respostasData.push(resposta)
            })

            setRespostas(respostasData)
        } catch (error){
            console.log("Erro ao buscar respostas:", error)
        }
    }

    React.useEffect(() => {
        handleFetchRespostas()
    }, [])

    return (
        <Grid2 sx={{ mt: 2 }} container spacing={2}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight="bold">Data</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">Título</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">Status</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">Resposta</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">Preço</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {respostas.map((resposta) => {
                            return (
                                <TableRow key={resposta.id}>
                                    <TableCell>{resposta?.dataResposta}</TableCell>
                                    <TableCell>{resposta.preco}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={resposta?.status}
                                            color={resposta?.status === "Em andamento" ? "info" : resposta?.status === "Pendente" ? "warning" : "success"}
                                        />
                                    </TableCell>
                                    <TableCell>{resposta.resposta}</TableCell>
                                    <TableCell>{resposta.preco}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!respostas.length && (
                <Typography variant="h6" textAlign="center" sx={{ mt: 2, color: "text.secondary" }}>
                    Nenhuma resposta encontrada.
                </Typography>
            )}
        </Grid2>
    )
}