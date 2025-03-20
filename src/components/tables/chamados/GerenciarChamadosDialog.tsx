import React from "react"
import StatusELoading from "../../statusloading/StatusELoading"
import ChamadoseLojasCarregadas from "./ChamadoseLojasCarregadas"
import { useChamadosContext } from "@/src/context/ChamadosContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid2, TextField } from "@mui/material"

const dialogName = "GerenciarChamadosDialog"

export interface IGerenciarChamadosDialogProps {
    isOpen: boolean
    onClose: () => void
    chamadoId: string
}

export default function GerenciarChamadosDialog({ isOpen, onClose, chamadoId }: IGerenciarChamadosDialogProps) {
    const { dialogOpen, loading, handleCancelar } = useLoadingAndStatusContext()
    const { responderChamado, setResponderChamado, handleResponderChamado } = useChamadosContext()

    const handleSubmit = () => {
        if (chamadoId) {
            handleResponderChamado(chamadoId)
        }
        onClose()
    }

    return (
        <Grid2 size={{ xs: 12 }}>
            <Dialog
                fullWidth
                open={dialogOpen === dialogName}
                onClose={handleCancelar}
            >
                <DialogContent>
                    <ChamadoseLojasCarregadas chamadoId={chamadoId} />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Preço do Serviço"
                        fullWidth
                        variant="outlined"
                        type="text"
                        placeholder="Valor: R$0,00"
                        value={responderChamado.preco || ""}
                        onChange={(e) => setResponderChamado({ ...responderChamado, preco: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Detalhes da resposta"
                        fullWidth
                        multiline
                        variant="outlined"
                        placeholder="Detalhes da resposta"
                        rows={4}
                        value={responderChamado.resposta || ""}
                        onChange={(e) => setResponderChamado({ ...responderChamado, resposta: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleCancelar}>Fechar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {loading ? <CircularProgress size={20} /> : "Responder Chamado"}
                    </Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}