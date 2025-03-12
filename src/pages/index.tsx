import React from "react"
import { Box } from "@mui/material"
import Layout from "../components/layout/Layout"
import Dashboard from "../components/dashboard/Dashboard"
import AvisoSobreConta from "../views/AvisoSobreConta"
import { useAuthContext } from "../context/AuthContext"

export default function Home() {
    const { cargo, handleVerificarUsuario } = useAuthContext()

    React.useEffect(() => {
        handleVerificarUsuario()
    }, [])

    return (
        <Box>
            {cargo === "Usuário" || cargo === "Admin" ? (
                <Layout>
                    <Dashboard />
                </Layout>
            ) : (
                <AvisoSobreConta />
            )}
        </Box>
    )
}