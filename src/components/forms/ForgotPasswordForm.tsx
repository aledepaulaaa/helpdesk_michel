import { useRouter } from "next/router"
import { ArrowBack } from "@mui/icons-material"
import ForgotInputEmailForm from "./ForgotInputEmailForm"
import { Alert, Grid2, IconButton, Typography } from "@mui/material"

export default function ForgotPasswordForm() {
    const router = useRouter()

    return (
        <Grid2 container>
            <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <IconButton onClick={() => router.push("/login")}>
                    <ArrowBack sx={{ fontSize: 30 }} />
                </IconButton>
                <Alert sx={{ mt: 4 }} severity="info">
                    <Typography textAlign="center" fontWeight="bold">
                        Será enviado um link para seu email confira sua caixa de entrada.
                    </Typography>
                </Alert>
            </Grid2>
            <ForgotInputEmailForm />
        </Grid2>
    )
}
