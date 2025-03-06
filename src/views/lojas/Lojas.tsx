import React from "react"
import StoreIcon from "@mui/icons-material/Store"
import { useLojaContext } from "@/src/context/LojasContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, List, ListItem, ListItemText, Typography } from "@mui/material"

export default function Lojas() {
    const { loading } = useLoadingAndStatusContext()
    const {
        carregarLojas,
        isDialogOpen,
        handleExcluirLoja,
        handleOpenDialog,
        handleCloseDialog
    } = useLojaContext()

    return (
        <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 350,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start"
                }}
            >
                <CardHeader
                    title={
                        <Grid2
                            size={{ xs: 12 }}
                            flexDirection="row"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                        >
                            <Typography
                                textAlign="center"
                                textTransform="uppercase"
                                sx={{ fontSize: { xs: 16, md: 22 } }}
                                fontWeight="bold" component="div"
                            >
                                {carregarLojas.sigla || ""}
                            </Typography>
                            <StoreIcon fontSize="large" />
                        </Grid2>
                    }
                />
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="E-mail:" secondary={carregarLojas.email || ""} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Telefone:" secondary={carregarLojas.telefone} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="CNPJ:" secondary={carregarLojas.cnpj} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Localização:" secondary={carregarLojas.localizacao} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Responsável:" secondary={carregarLojas.responsavel} />
                        </ListItem>
                    </List>
                    <Button onClick={handleOpenDialog} variant="contained">
                        {loading ? <CircularProgress /> : "Remover"}
                    </Button>
                    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                        <DialogTitle>Remover Loja</DialogTitle>
                        <DialogContent>
                            <Typography>Tem certeza que deseja remover esta loja?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleCloseDialog}>Cancelar</Button>
                            <Button variant="outlined" onClick={handleExcluirLoja}>Remover</Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>
        </Grid2>
    )
}