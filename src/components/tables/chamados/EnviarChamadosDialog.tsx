import MapsUgcIcon from "@mui/icons-material/MapsUgc"
import AddIcCallIcon from "@mui/icons-material/AddIcCall"
import StatusELoading from "../../statusloading/StatusELoading"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, TextField, Typography } from "@mui/material"
import { useAcoesChamacoContext } from "@/src/context/AcoesChamadoContext"

const dialogName = "EnviarChamadosDialog"

export default function EnviarChamadosDialog() {
    const { loading, dialogOpen, handleCancelar, handleOpenDialog } = useLoadingAndStatusContext()
    const { addChamados, setAddChamados, handleSalvarChamado } = useAcoesChamacoContext()

    const handleOpenEnviarChamadosDialog = () => {
        handleOpenDialog(dialogName)
    }

    return (
        <Grid2 size={{ xs: 12 }}>
            <Button
                variant="contained"
                color="info"
                startIcon={<AddIcCallIcon />}
                onClick={handleOpenEnviarChamadosDialog}
                sx={{ mb: 2 }}
            >
                abrir chamado
            </Button>
            <Dialog open={dialogOpen === dialogName} onClose={handleCancelar} fullWidth>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <DialogTitle>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            Novo Chamado
                        </Typography>
                    </DialogTitle>
                    <MapsUgcIcon fontSize="large" />
                </Grid2>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título do Chamado"
                        fullWidth
                        variant="outlined"
                        type="text"
                        value={addChamados.titulo || ""}
                        onChange={(e) => setAddChamados({ ...addChamados, titulo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Descrição da Solicitação"
                        fullWidth
                        multiline
                        variant="outlined"
                        rows={4}
                        value={addChamados.solicitacao || ""}
                        onChange={(e) => setAddChamados({ ...addChamados, solicitacao: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancelar}>Fechar</Button>
                    <Button variant="contained" onClick={handleSalvarChamado}>
                        {loading ? <CircularProgress size={20} /> : "Enviar Chamado"}
                    </Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}