import React from "react"
import usePerfil from "@/src/hooks/perfil/usePerfil"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Card, CardContent, CardHeader, Grid2, Stack, Typography, CircularProgress, Chip } from "@mui/material"

export default function User() {
    const { dadosUsuario } = usePerfil()
    const { loading, error } = useLoadingAndStatusContext()

    if (loading) {
        return (
            <Grid2 display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
            </Grid2>
        )
    }

    if (error) {
        return (
            <Grid2 display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography color="error">Erro ao carregar perfil: {error}</Typography>
            </Grid2>
        )
    }

    if (!dadosUsuario) {
        return (
            <Grid2 display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography>Carregando informações do perfil...</Typography>
            </Grid2>
        )
    }

    return (
        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Card sx={{ borderRadius: 4, p: 2, width: "100%", maxWidth: 650 }}>
                <CardHeader
                    title={
                        <Stack direction="column" spacing={2} alignItems="center">
                            <AccountCircleIcon sx={{ fontSize: 60 }} />
                            <Typography variant="h4" color="primary">
                                {dadosUsuario?.name}
                            </Typography>
                        </Stack>
                    }
                />
                <CardContent>
                    <Stack spacing={2} alignItems="center" justifyContent="start">
                        <Typography variant="h6">Email: {dadosUsuario?.email}</Typography>
                        <Typography variant="h6">Cargo:
                            <Chip
                                label={dadosUsuario?.cargo || "Não informado"}
                                color={dadosUsuario?.cargo === "Admin"  ? "success" : "info"}
                                variant="filled"
                                sx={{ ml: 1 }}
                            />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    )
}