import StatusELoading from "@/src/components/statusloading/StatusELoading"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { useLojaContext } from "@/src/context/LojasContext"
import CamposAdicionarLoja from "./CamposAdicionarLoja"
import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material"

export default function AdicionarLojasDialog() {
    const { loading } = useLoadingAndStatusContext()
    const { isDialogOpen, handleCancelar, handleOpenDialog, handleSalvarLoja } = useLojaContext()

    return (
        <Grid2 container spacing={2}>
            <IconButton onClick={handleOpenDialog}>
                <AddBusinessIcon
                    color="primary"
                    fontSize="large"
                />
            </IconButton>
            <Dialog open={isDialogOpen} onClose={handleCancelar} fullWidth>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <DialogTitle>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            Cadastrar Loja
                        </Typography>
                    </DialogTitle>
                    <AddBusinessIcon fontSize="large" />
                </Grid2>
                <DialogContent>
                    <CamposAdicionarLoja />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancelar}>Fechar</Button>
                    <Button variant="contained" onClick={handleSalvarLoja}>
                        {loading ? <CircularProgress  /> : "Cadastrar Loja"}
                    </Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}