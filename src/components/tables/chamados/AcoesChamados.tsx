import { useChamadoContext } from "@/src/context/AcoesChamadoContext"
import AddTaskIcon from "@mui/icons-material/AddTask"
import CancelIcon from "@mui/icons-material/Cancel"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Dialog, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material"

export default function AcoesChamados() {
    const { isDialogOpen, handleCloseDialog, handleCancelar } = useChamadoContext()

    return (
        <Grid2>
            <IconButton onClick={handleCloseDialog}>
                <VisibilityIcon />
            </IconButton>
            <Dialog open={isDialogOpen} onClose={handleCancelar} fullWidth>
                <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <DialogTitle>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            Chamados Registrados
                        </Typography>
                    </DialogTitle>
                    <AddTaskIcon fontSize="large" />
                </Grid2>
                <IconButton onClick={handleCancelar}>
                    <CancelIcon />
                </IconButton>
                <DialogContent>
                    
                </DialogContent>
            </Dialog>
        </Grid2>
    )
}