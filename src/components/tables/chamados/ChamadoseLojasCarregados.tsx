import StoreIcon from "@mui/icons-material/Store"
import MapsUgcIcon from "@mui/icons-material/MapsUgc"
import { useAdminContext } from "@/src/context/AdminContext"
import { Box, Chip, CircularProgress, Divider, Grid2, Paper, Typography } from "@mui/material"

export default function ChamadoseLojasCarregados() {
    const { chamadoSelecionado, lojaSelecionada } = useAdminContext()

    return (
        <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            {chamadoSelecionado && lojaSelecionada ? (
                <Paper elevation={3} sx={{ p: 2, mb: 2, width: "100%" }}>
                    <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                        <Typography variant="h5" fontWeight="bold" component="div">
                            Detalhes do Chamado
                        </Typography>
                        <MapsUgcIcon fontSize="large" />
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Chamado: <Chip color="success" label={chamadoSelecionado.titulo} />
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Solicitação:
                        <Paper sx={{ p: 2 }}>
                            {chamadoSelecionado.solicitacao}
                        </Paper>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid2 display="flex" justifyContent="center" alignItems="center" gap={2}>
                        <Typography variant="h5" textAlign="center" fontWeight="bold" component="div">Dados da Loja</Typography>
                        <StoreIcon fontSize="large" />
                    </Grid2>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Loja: {lojaSelecionada.loja?.sigla}
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Email: {lojaSelecionada.loja?.email}
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Responsável: {lojaSelecionada.loja?.responsavel}
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        CNPJ: {lojaSelecionada.loja?.cnpj}
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Localização: {lojaSelecionada.loja?.localizacao}
                    </Typography>
                </Paper>
            ) : (
                <CircularProgress />
            )}
        </Box>
    )

}