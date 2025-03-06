import React from "react"
import TabelaChamados from "@/src/components/tables/chamados/TabelaChamados"
import TabelaChamadosAdmin from "@/src/components/tables/chamados/TabelaChamadosAdmin"
import { useAdminContext } from "@/src/context/AdminContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Card, CircularProgress, Typography } from "@mui/material"

export default function Chamados() {
    const { loading } = useLoadingAndStatusContext()
    const { isAdmin, handleVerificarCargo } = useAdminContext()

    React.useEffect(() => {
        handleVerificarCargo()
    }, [])

    if (loading) {
        return (
            <Card sx={{ borderRadius: 4, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Verificando permissões...</Typography>
            </Card>
        )
    }

    return (
        <Card sx={{ borderRadius: 4, p: 2 }}>
            {isAdmin ? (
                <TabelaChamadosAdmin />
            ) : (
                <TabelaChamados />
            )}
        </Card>
    )
}