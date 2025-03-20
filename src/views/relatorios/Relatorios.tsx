import RelatoriosAdmin from "./RelatoriosAdmin"
import RelatoriosUsuario from "./RelatoriosUsuario"
import { useAdminContext } from "@/src/context/AdminContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Card, CircularProgress, Grid2, Typography } from "@mui/material"

export default function Relatorios() {
    const { loading } = useLoadingAndStatusContext()
    const { isAdmin } = useAdminContext()

    if (loading) {
        return (
            <Card sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 4,
                justifyContent: "center",
                flexDirection: "column"
            }}
            >
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Verificando permissões...</Typography>
            </Card>
        )
    }

    return (
        <Grid2 size={{ xs: 12 }}>
            <Card sx={{ borderRadius: 4, p: 2 }}>
                {isAdmin ? (
                    <RelatoriosAdmin />
                ) : (
                    <RelatoriosUsuario />
                )}
            </Card>
        </Grid2>
    )
}