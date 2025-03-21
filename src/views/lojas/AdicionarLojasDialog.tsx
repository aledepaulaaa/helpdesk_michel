import React from "react"
import StatusELoading from "@/src/components/statusloading/StatusELoading"
import CamposAdicionarLoja from "./CamposAdicionarLoja"
import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import { lojaInicial } from "@/src/interfaces/ILoja"
import { useLojaContext } from "@/src/context/LojasContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography } from "@mui/material"

const dialogName = "AdicionarLojasDialog"

export default function AdicionarLojasDialog() {
    const { setLojas, handleSalvarLoja, lojas, usuarioSelecionado } = useLojaContext()
    const { loading, dialogOpen, handleCancelar } = useLoadingAndStatusContext()

    React.useEffect(() => {
        if (usuarioSelecionado) {
            setLojas(lojas)
        } else {
            setLojas({ ...lojaInicial})
        }
    }, [usuarioSelecionado, setLojas])

    const handleSave = async () => {
        if (usuarioSelecionado) {
            await handleSalvarLoja(usuarioSelecionado.id as string)
            handleCancelar()
        } else {
            console.log("ID do usuário não encontrado.")
        }
    }

    return (
        <Grid2 container spacing={2}>
            <Dialog open={dialogOpen === dialogName} aria-hidden={false} onClose={handleCancelar} fullWidth>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <DialogTitle>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            {usuarioSelecionado?.id ? "Editar Loja do Usuário" : "Cadastrar Loja"}
                        </Typography>
                    </DialogTitle>
                    <AddBusinessIcon fontSize="large" />
                </Grid2>
                <DialogContent>
                    <CamposAdicionarLoja />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancelar}>Fechar</Button>
                    <Button variant="contained" onClick={handleSave} disabled={!usuarioSelecionado?.id}>
                        {loading ? <CircularProgress /> : "Cadastrar Loja"}
                    </Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}