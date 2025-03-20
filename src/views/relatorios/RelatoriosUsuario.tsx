import React from "react"
import { IChamado } from "@/src/interfaces/IChamado"
import { auth, db } from "@/src/db/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Grid2 } from "@mui/material"

interface RespostaChamado {
    id: string
    chamadoId: string
    resposta: string
    preco: string
    dataResposta: string
    userId: string
}

export default function RelatoriosUsuario() {
    const [respostas, setRespostas] = React.useState<RespostaChamado[]>([])
    const [chamados, setChamados] = React.useState<{ [key: string]: IChamado }>({})
    const [chamadoIds, setChamadoIds] = React.useState<string[]>([])

    React.useEffect(() => {
        const fetchChamados = async () => {
            const user = auth.currentUser
            if (!user) {
                return
            }

            const chamadosRef = collection(db, "chamados")
            const q = query(chamadosRef, where("userId", "==", user.uid))
            const querySnapshot = await getDocs(q)

            const chamadosTemp: { [key: string]: IChamado } = {}
            const ids: string[] = []

            querySnapshot.forEach((doc) => {
                const chamado = { userId: doc.id, ...doc.data() } as IChamado
                chamadosTemp[doc.id] = chamado
                ids.push(doc.id)
            })

            setChamados(chamadosTemp)
            setChamadoIds(ids)
        }

        fetchChamados()
    }, [])

    React.useEffect(() => {
        const fetchRespostas = async () => {
            if (chamadoIds.length > 0) {
                const respostasRef = collection(db, "respostas_chamados")

                const q = query(respostasRef, where("chamadoId", "in", chamadoIds))
                const querySnapshot = await getDocs(q)

                const respostasData: RespostaChamado[] = []
                querySnapshot.forEach((doc) => {
                    const resposta = { chamadoId: doc.id, ...doc.data() } as RespostaChamado
                    respostasData.push(resposta)
                })

                setRespostas(respostasData)
            } else {
                // console.log("Nenhum chamado ID para buscar respostas.")
                setRespostas([])
            }
        }

        fetchRespostas()
    }, [chamadoIds])

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
                        {respostas.map((resposta, index) => {
                            const chamado = chamados[resposta.chamadoId]
                            return (
                                <TableRow key={index}>
                                    <TableCell>{chamado?.data}</TableCell>
                                    <TableCell>{chamado ? chamado.titulo : "Carregando..."}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={chamado?.status}
                                            color={chamado?.status === "Em andamento" ? "info" : chamado?.status === "Pendente" ? "warning" : "success"}
                                        />
                                    </TableCell>
                                    <TableCell>{resposta.resposta}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={resposta.preco}
                                            color="success"
                                            variant="outlined"
                                        />
                                    </TableCell>
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