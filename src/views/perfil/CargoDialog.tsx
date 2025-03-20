import React from "react"
import StatusELoading from "@/src/components/statusloading/StatusELoading"
import { useAdminContext } from "@/src/context/AdminContext"
import { ICargoDialogProps } from "@/src/interfaces/ICargoDialogProps"
import { Button, Dialog, DialogActions, DialogContent, Grid2, Select, MenuItem, InputLabel, FormControl, Typography, SelectChangeEvent } from "@mui/material"

export default function CargoDialog({ isOpen, onClose, usuario }: ICargoDialogProps) {
    const { handleAlterarCargoUsuario } = useAdminContext()
    const [selectedCargo, setSelectedCargo] = React.useState<string>("Usuário")

    React.useEffect(() => {
        if (isOpen) {
            setSelectedCargo("Usuário")
        }
    }, [isOpen, usuario])

    const handleChangeCargo = (event: SelectChangeEvent<string>) => {
        setSelectedCargo(event.target.value)
    }

    const handleConfirmarAlteracao = async () => {
        if (usuario) {
            await handleAlterarCargoUsuario(usuario, selectedCargo)
            onClose()
        }
    }

    return (
        <Grid2 container spacing={2}>
            <Dialog
                fullWidth
                aria-hidden={false}
                open={isOpen}
                onClose={onClose}
            >
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        Alterar Cargo
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="cargo-select-label">Cargo</InputLabel>
                        <Select
                            labelId="cargo-select-label"
                            id="cargo-select"
                            value={selectedCargo}
                            label="Cargo"
                            onChange={handleChangeCargo}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Usuário">Usuário</MenuItem>
                            <MenuItem value="Inativo">Inativo</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" sx={{ color: "white" }} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" sx={{ color: "white" }} onClick={handleConfirmarAlteracao}>
                        Confirmar
                    </Button>
                </DialogActions>
                <StatusELoading />
            </Dialog>
        </Grid2>
    )
}