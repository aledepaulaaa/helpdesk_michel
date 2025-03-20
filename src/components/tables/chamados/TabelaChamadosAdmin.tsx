import React from "react"
import ChamadosVazios from "@/src/views/chamados/ChamadosVazios"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import GerenciarChamadosDialog from "./GerenciarChamadosDialog"
import { useTableContext } from "@/src/context/TableContext"
import { useAdminContext } from "@/src/context/AdminContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Chip, Grid2, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export default function TabelaChamadosAdmin() {
    const { lerChamadosAdmin } = useAdminContext()
    const { mdSize, handleStatusColor } = useTableContext()
    const { handleOpenDialog } = useLoadingAndStatusContext()
    const [selectedChamadoId, setSelectedChamadoId] = React.useState<string>("")

    const handleAbrirDialog = (chamadoId: string) => {
        setSelectedChamadoId(chamadoId)
        handleOpenDialog("GerenciarChamadosDialog") // Certifique-se de passar o nome correto do diálogo
    }


    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                {lerChamadosAdmin.length > 0 ? (
                    <TableContainer sx={{ overflowX: "auto" }}>
                        <Table border={1} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: mdSize ? 150 : 100 }}>Tipo</TableCell>
                                    <TableCell sx={{ minWidth: mdSize ? 150 : 100 }}>Data</TableCell>
                                    <TableCell sx={{ minWidth: mdSize ? 150 : 100 }}>Status</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lerChamadosAdmin.map((chamado, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{chamado.titulo}</TableCell>
                                        <TableCell>{chamado.data}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={chamado.status}
                                                color={handleStatusColor(chamado.status)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleAbrirDialog(chamado.id)}>
                                                <KeyboardReturnIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <ChamadosVazios />
                )}
            </Grid2>
            <GerenciarChamadosDialog
                isOpen={true}
                onClose={() => setSelectedChamadoId("")}
                chamadoId={selectedChamadoId}
            />
        </Grid2>
    )
}