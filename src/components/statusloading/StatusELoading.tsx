import { Alert, Grid2 } from "@mui/material"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"

export default function StatusELoading() {
    const { success, error } = useLoadingAndStatusContext()

    return (
        <Grid2 container spacing={2}>
            {success &&
                <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                        {success}
                    </Alert>
                </Grid2>
            }
            {error &&
                <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Alert>
                </Grid2>
            }
        </Grid2>
    )
}