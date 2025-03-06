import { Grid2, Typography } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"

export default function Dashboard() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" component="h1" textAlign="center">
                    Componentes iniciais em construção
                </Typography>
                <SettingsIcon
                    sx={{
                        fontSize: 100,
                        animation: "spin 2s linear infinite",
                        "@keyframes spin": {
                            "0%": {
                                transform: "rotate(0deg)",
                            },
                            "100%": {
                                transform: "rotate(360deg)",
                            },
                        },
                    }}
                />
            </Grid2>
        </Grid2>
    )
}
