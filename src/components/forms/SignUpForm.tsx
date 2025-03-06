import FormPassword from "./FormPassword"
import router from "next/router"
import { useAuthContext } from "@/src/context/AuthContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Alert, Button, FormControl, Grid2, TextField, Typography } from "@mui/material"

export default function SignUpForm() {
    const { user, setUser, handleCreateUser, handleEnterCreateAccount } = useAuthContext()
    const { loading, error, success } = useLoadingAndStatusContext()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        handleEnterCreateAccount(event)
    }

    return (
        <Grid2 container>
            <FormControl fullWidth sx={{ gap: 4, alignItems: "center" }} onKeyDown={handleKeyDown}>
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
                        label="Nome"
                        placeholder="Nome"
                        type="name"
                        value={user.name || ""}
                        onChange={(event) => setUser({ ...user, name: event.target.value })}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        sx={{ mb: 4 }}
                        label="Email"
                        placeholder="Email"
                        type="email"
                        value={user.email || ""}
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                        variant="outlined"
                    />
                    <FormPassword />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={handleCreateUser}
                        sx={{ textTransform: "none", fontWeight: 700, p: 2 }}>
                        {loading ? "Criando conta..." : "Criar conta"}
                    </Button>
                    <Typography variant="body2" mt={2}>
                        Já possui conta?
                        <a
                            style={{ color: "#00BBFF", cursor: "pointer", marginLeft: 5 }}
                            onClick={() => router.push("/login")}
                        >
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