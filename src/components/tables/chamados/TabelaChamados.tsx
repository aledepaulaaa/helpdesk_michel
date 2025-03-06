import React from "react"
import EnviarChamadosDialog from "./EnviarChamadosDialog"
import PaginacaoTabelaChamados from "./PaginacaoTabelaChamados"
import Image from "next/image"
import { IChamadoCompleto } from "@/src/interfaces/IAcoesChamadoContextProps"
import { useTableContext } from "@/src/context/TableContext"
import { useChamadoContext } from "@/src/context/AcoesChamadoContext"
import { Chip, Grid2, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

export default function TabelaChamados() {
    const { mdSize, handleStatusColor } = useTableContext()
    const { chamados, handleObterChamados, chamadosPaginados } = useChamadoContext()

    React.useEffect(() => {
        handleObterChamados()
    }, [])

    return (
        <Grid2 container spacing={2}>
            <EnviarChamadosDialog />
            <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <TableContainer sx={{ overflowX: "auto" }}>
                    <Table border={1} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: mdSize ? 150 : 100 }}>Título</TableCell>
                                <TableCell sx={{ minWidth: mdSize ? 150 : 100 }}>Status</TableCell>
                                <TableCell sx={{ minWidth: mdSize ? 200 : 150 }}>Descrição</TableCell>
                                <TableCell sx={{ minWidth: mdSize ? 150 : 100 }}>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chamadosPaginados.length > 0 ? ( // Condição para verificar se há chamados
                                chamadosPaginados.map((item: IChamadoCompleto, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.titulo || ""}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={item?.status || ""}
                                                color={handleStatusColor(item?.status) as any}
                                                sx={{ color: "white" }}
                                            />
                                        </TableCell>
                                        <TableCell>{item?.solicitacao}</TableCell>
                                        <TableCell>{item?.data || ""}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography
                                            textAlign="center"
                                            textTransform="uppercase"
                                            fontWeight="bold"
                                            component="div"
                                            sx={{ fontSize: { xs: 16, md: 22 } }}
                                        >
                                            Ainda não existem chamados cadastrados
                                        </Typography>
                                        <Image
                                            src="/adicionar_loja.png"
                                            alt="adicionar loja"
                                            width={200}
                                            height={200}
                                            quality={100}
                                            style={{ height: "auto", width: 200 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {Object.keys(chamados).length > 0 && <PaginacaoTabelaChamados totalItems={Object.keys(chamados).length} />}
            </Grid2>
        </Grid2>
    )
}