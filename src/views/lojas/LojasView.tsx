import React from "react"
import Lojas from "./Lojas"
import LojasVazias from "./LojasVazias"
import { Grid2 } from "@mui/material"
import { useLojaContext } from "@/src/context/LojasContext"

export default function LojasView() {
    const { carregarLojas, setCarregarLojas, handleBuscarLojas } = useLojaContext()

    React.useEffect(() => {
        const lojasLocais = localStorage.getItem("lojas")
        if (lojasLocais) {
            setCarregarLojas(JSON.parse(lojasLocais))
        } else {
            handleBuscarLojas()
            localStorage.setItem("lojas", JSON.stringify(carregarLojas))
        }
    }, [])

    return (
        <Grid2 container spacing={2}>
            {carregarLojas.sigla.length > 0 ? (
                <Lojas />
            ) : (
                <LojasVazias />
            )}
        </Grid2>
    )
}