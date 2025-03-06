import { useAuthContext } from "@/src/context/AuthContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import useRememberAndForgotPass from "@/src/hooks/forgotpassword/useRememberAndForgotPass"
import { FormControl, Grid2, TextField, Button, CircularProgress, Alert, Typography } from "@mui/material"

export default function ForgotInputEmailForm() {
    const { handleResetPassword } = useRememberAndForgotPass()
    const { loading, error, success } = useLoadingAndStatusContext()
    const { user, setUser } = useAuthContext()

    return (
        <FormControl fullWidth sx={{ gap: 4, alignItems: "center" }}>
            <Grid2
                size={{ xs: 12 }}
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <TextField
                    fullWidth
                    sx={{ mt: 4, mb: 4 }}
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={user.email || ""}
                    onChange={(event) => setUser({ ...user, email: event.target.value })}
                    variant="outlined"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={handleResetPassword}
                    sx={{ textTransform: "none", fontWeight: 700, p: 2 }}>
                    {loading ? <CircularProgress /> : "Enviar"}
                </Button>
            </Grid2>
            {error && (
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Alert sx={{ mt: 4 }} severity="error">
                        <Typography variant="body1">{error}</Typography>
                    </Alert>
                </Grid2>
            )}
            {success && (
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Alert sx={{ mt: 4 }} severity="success">
                        <Typography variant="body1">{success}</Typography>
                    </Alert>
                </Grid2>
            )}
        </FormControl>
    )
}