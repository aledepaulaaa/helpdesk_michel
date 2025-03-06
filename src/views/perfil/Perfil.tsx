import { Grid2, Typography } from "@mui/material"
import React from "react"
import User from "./User"

export default function Perfil() {

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography textAlign="center" variant="h4">Perfil</Typography>
                <User />
            </Grid2>
        </Grid2>
    )
}