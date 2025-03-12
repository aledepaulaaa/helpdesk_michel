import Image from "next/image"
import { Card, CardContent, CardHeader, Grid2, Typography } from "@mui/material"

export default function ChamadosVazios() {
    return (
        <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Card
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 650,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CardHeader
                    title={
                        <Grid2
                            size={{ xs: 12 }}
                            flexDirection="row"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                        >
                            <Typography textAlign="center" textTransform="uppercase" sx={{ fontSize: { xs: 16, md: 22 } }} fontWeight="bold" component="div">
                                Não existem chamados ainda.
                            </Typography>
                        </Grid2>
                    }
                />
                <CardContent>
                    <Image
                        src="/adicionar_loja.png"
                        alt="adicionar loja"
                        width={200}
                        height={200}
                        quality={100}
                        style={{ height: "auto", width: 200 }}
                    />
                </CardContent>
            </Card>
        </Grid2>
    )
}
