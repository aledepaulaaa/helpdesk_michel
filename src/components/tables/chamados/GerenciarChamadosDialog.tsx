import StatusELoading from "../../statusloading/StatusELoading"
import ChamadoseLojasCarregados from "./ChamadoseLojasCarregados"
import { useAdminContext } from "@/src/context/AdminContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid2, TextField } from "@mui/material"

export default function GerenciarChamadosDialog() {
    const { loading } = useLoadingAndStatusContext()
    const { addChamadosAdmin, isDialogOpen, setaddChamadosAdmin, handleCancelar } = useAdminContext()

    return (
        <Grid2 size={{ xs: 12 }}>
            <Dialog open={isDialogOpen} onClose={handleCancelar} fullWidth>
                <DialogContent>
                    <ChamadoseLojasCarregados />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Preço do Serviço"
                        fullWidth
                        variant="outlined"
                        type="text"
                        placeholder="Valor: R$0,00"
                        value={addChamadosAdmin.preco || ""}
                        onChange={(e) => setaddChamadosAdmin({ ...addChamadosAdmin, preco: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Detalhes da resposta"
                        fullWidth
                        multiline
                        variant="outlined"
                        placeholder="Detalhes da resposta"
                        rows={4}
                        value={addChamadosAdmin.resposta || ""}
                        onChange={(e) => setaddChamadosAdmin({ ...addChamadosAdmin, resposta: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleCancelar}>Fechar</Button>
                    <Button variant="contained" color="primary" onClick={() => { }}>
                        {loading ? <CircularProgress size={20} /> : "Responder Chamado"}
                    </Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}