import React from "react"
import StorefrontIcon from "@mui/icons-material/Storefront"
import StatusELoading from "@/src/components/statusloading/StatusELoading"
import { IUser } from "@/src/interfaces/authcontext/IUser"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material"

interface ILojasDialogProps {
    usuario: IUser
    dialogName: string
    lojaData: string
}

export default function LojasDialog({ usuario, dialogName, lojaData }: ILojasDialogProps) {
    const { dialogOpenName, handleCancelar, handleOpenDialog } = useLoadingAndStatusContext()

    const lojasAdminLocalStorage = localStorage.getItem("lojasAdmin")
    let lojaDoUsuario = null
    if (lojasAdminLocalStorage) {
        try {
            const lojasParseadas = JSON.parse(lojasAdminLocalStorage)
            lojaDoUsuario = lojasParseadas[usuario.id as string] || null
        } catch (error) {
            console.error("Erro ao parsear lojasAdmin do localStorage:", error)
        }
    }

    const temLoja = !!lojaDoUsuario

    const handleOpenLojaDialog = () => {
        handleOpenDialog(dialogName)
    }

    return (
        <Grid2 container spacing={2}>
            <IconButton onClick={handleOpenLojaDialog}>
                <StorefrontIcon
                    color={temLoja ? "success" : "disabled"}
                />
            </IconButton>
            <Dialog open={dialogOpenName === dialogName} aria-hidden="false" onClose={handleCancelar} fullWidth>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <DialogTitle>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            Loja de {usuario.name}
                        </Typography>
                    </DialogTitle>
                    <StorefrontIcon fontSize="large" />
                </Grid2>
                <DialogContent>
                    {temLoja ? (
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12 }}>
                                <Typography variant="body1">Sigla: {lojaDoUsuario?.loja?.sigla}</Typography> {/* ✅ Exibe dados de lojaDoUsuario */}
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Typography variant="body1">CNPJ: {lojaDoUsuario?.loja?.cnpj}</Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Typography variant="body1">Responsável: {lojaDoUsuario?.loja?.responsavel}</Typography>
                            </Grid2>
                        </Grid2>
                    ) : (
                        <Typography variant="body1" textAlign="center">
                            Este usuário ainda não possui uma loja cadastrada.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancelar}>Fechar</Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}