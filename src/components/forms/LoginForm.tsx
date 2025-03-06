import useLogin from "@/src/hooks/login/useLogin"
import router from "next/router"
import FormPassword from "./FormPassword"
import { useAuthContext } from "@/src/context/AuthContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import useRememberAndForgotPass from "@/src/hooks/forgotpassword/useRememberAndForgotPass"
import { Alert, Box, Button, Checkbox, CircularProgress, FormControl, Grid2, TextField, Typography } from "@mui/material"
import { theme } from "@/src/theme/theme"

export default function LoginForm() {
    const { user, setUser } = useAuthContext()
    const { loading, error, success } = useLoadingAndStatusContext()
    const { handleEnterLogin, handleLogin } = useLogin()
    const { rememberMe, handleRemember, handleLoginClick } = useRememberAndForgotPass()

    return (
        <Grid2 container>
            <FormControl fullWidth sx={{ gap: 4, alignItems: "center" }} onKeyDown={(event) => handleEnterLogin(event)}>
                <Grid2
                    size={{ xs: 12 }}
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
                    <FormPassword />
                    <Grid2
                        mb={2}
                        size={{ xs: 12 }}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexDirection={{ xs: "column", md: "row" }}
                    >
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                size="small"
                                sx={{ width: 30 }}
                                checked={rememberMe}
                                onChange={(e) => handleRemember(e.target.checked)}
                            />
                            <Typography variant="body2">
                                Relembre-me
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            Esqueceu a senha?
                            <a
                                style={{ color: "#00BBFF", cursor: "pointer", marginLeft: 5 }}
                                onClick={() => router.push("/forgotpassword")}
                            >
                                Clique aqui
                            </a>
                        </Typography>
                    </Grid2>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={() => handleLoginClick({ handleLogin })}
                        sx={{ textTransform: "none", fontWeight: 700, p: 2 }}>
                        {loading ? <CircularProgress /> : "Entrar"}
                    </Button>
                    <Typography variant="body2" mt={2}>
                        Não possui conta?
                        <a
                            style={{ color: "#00BBFF", cursor: "pointer", marginLeft: 5 }}
                            onClick={() => router.push("/signup")}>
                            Clique aqui
                        </a>
                    </Typography>
                </Grid2>
                {error && (
                    <Grid2 size={{ xs: 12 }}>
                        <Alert sx={{ mt: 4 }} severity="error">
                            <Typography variant="body1">{error}</Typography>
                        </Alert>
                    </Grid2>
                )}
                {success && (
                    <Grid2 size={{ xs: 12 }}>
                        <Alert sx={{ mt: 4 }} severity="success">
                            <Typography variant="body1">{success}</Typography>
                        </Alert>
                    </Grid2>
                )}
            </FormControl>
        </Grid2>
    )
}
