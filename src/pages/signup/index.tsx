import SignUpForm from "@/src/components/forms/SignUpForm"
import ImageGrid from "@/src/components/login/ImageGrid"
import { Card, Grid2, Box } from "@mui/material"

export default function SignUp() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                elevation={4}
                variant="elevation"
                sx={{
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 900,
                    mx: 3,
                }}
            >
                <Grid2 container spacing={2}>
                    <Grid2
                        size={{ xs: 12, md: 6 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ImageGrid />
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 6 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box p={2} width="100%">
                            <SignUpForm />
                        </Box>
                    </Grid2>
                </Grid2>
            </Card>
        </Box>
    )
}