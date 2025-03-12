import Image from "next/image"
import { useAuthContext } from "../context/AuthContext"
import { Button, Grid2, Stack, Typography } from "@mui/material"

export default function AvisoSobreConta() {
    const { handleLogout } = useAuthContext()

    return (
        <Grid2>
            <Stack direction="column" p={2} alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                    Sua conta esta inativa, entre em contato o suporte para ativa-lá.
                </Typography>
                <Image
                    src="/adicionar_loja.png"
                    alt="adicionar loja"
                    width={200}
                    height={200}
                    quality={100}
                    style={{ height: "auto", width: 200, marginLeft: 80 }}
                />
                <Button sx={{ mt: 4 }} variant="contained" onClick={handleLogout}>
                    Sair
                </Button>
            </Stack>
        </Grid2>
    )
}