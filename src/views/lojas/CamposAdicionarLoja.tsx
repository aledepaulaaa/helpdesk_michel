import React from "react"
import { useLojaContext } from "@/src/context/LojasContext"
import { FormControl, TextField } from "@mui/material"

export default function CamposAdicionarLoja() {
    const { lojas, setLojas, usuarioSelecionado } = useLojaContext()

    return (
        <FormControl fullWidth>
            <TextField
                autoFocus
                margin="dense"
                label="Usuário"
                disabled
                fullWidth
                variant="outlined"
                type="text"
                value={usuarioSelecionado?.name || ""}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Sigla | Loja"
                fullWidth
                variant="outlined"
                placeholder="Ex: MC1, L2"
                type="text"
                value={lojas?.loja?.sigla || ""}
                onChange={(e) => setLojas({ ...lojas, loja: { ...lojas.loja, sigla: e.target.value }})}
            />
            <TextField
                margin="dense"
                label="CNPJ da Loja"
                placeholder="Ex: 99.999.999/9999-99"
                fullWidth
                multiline
                variant="outlined"
                value={lojas?.loja?.cnpj || ""}
                onChange={(e) => setLojas({ ...lojas, loja: { ...lojas.loja, cnpj: e.target.value }})}
            />
            <TextField
                margin="dense"
                label="Nome do Responsável"
                placeholder="Ex: João da Silva"
                fullWidth
                multiline
                variant="outlined"
                value={lojas?.loja?.responsavel || ""}
                onChange={(e) => setLojas({ ...lojas, loja: { ...lojas.loja, responsavel: e.target.value }})}
            />
        </FormControl>
    )
}