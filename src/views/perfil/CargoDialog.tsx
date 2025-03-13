import ModeIcon from "@mui/icons-material/Mode"
import StatusELoading from "@/src/components/statusloading/StatusELoading"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, Dialog, DialogActions, DialogContent, Grid2, IconButton } from "@mui/material"

const dialogName = "CargoDialog"

export default function CargoDialog({ dialogOpenName }: { dialogOpenName: string }) {
    const { handleCancelar, handleOpenDialog } = useLoadingAndStatusContext()

    const handleOpenLojaDialog = () => {
        handleOpenDialog(dialogName)
    }

    return (
        <Grid2 container spacing={2}>
            <IconButton onClick={handleOpenLojaDialog}>
                <ModeIcon
                    color="primary"
                />
            </IconButton>
            <Dialog open={dialogOpenName === dialogName} aria-hidden="false" onClose={handleCancelar} fullWidth>
                <DialogContent>
                    Alterar Cargo
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancelar}>Fechar</Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}