import { Grid2, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"

export default function ImageGrid() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    return (
        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
            <Image
                src="/img/inspect_pc.svg"
                width={450}
                height={450}
                alt="Imagem de login"
                style={{ marginTop: 25, width: isMobile ? "50%" : "50%", height: isMobile ? "50%" : "100%" }}
                priority
                quality={100}
            />
        </Grid2>
    )
}