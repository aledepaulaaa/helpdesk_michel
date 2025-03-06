import { useLojaContext } from "@/src/context/LojasContext"
import AddLocationIcon from "@mui/icons-material/AddLocation"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import { Button, CircularProgress, FormControl, TextField } from "@mui/material"

export default function CamposAdicionarLoja() {
    const { loading } = useLoadingAndStatusContext()
    const { lojas, setLojas, handleObterLocalizacao } = useLojaContext()

    return (
        <FormControl fullWidth>
            <TextField
                autoFocus
                margin="dense"
                label="Sigla | Loja"
                fullWidth
                variant="outlined"
                placeholder="Ex: MC1, L2"
                type="text"
                value={lojas?.sigla || ""}
                onChange={(e) => setLojas({ ...lojas, sigla: e.target.value })}
            />
            <TextField
                margin="dense"
                label="E-mail da Loja"
                placeholder="Ex: loja@email.com"
                fullWidth
                multiline
                variant="outlined"
                value={lojas?.email || ""}
                onChange={(e) => setLojas({ ...lojas, email: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Telefone da Loja"
                placeholder="Ex: (31) 99999-9999"
                fullWidth
                multiline
                variant="outlined"
                value={lojas?.telefone || ""}
                onChange={(e) => setLojas({ ...lojas, telefone: e.target.value })}
            />
            <TextField
                margin="dense"
                label="CNPJ da Loja"
                placeholder="Ex: 99.999.999/9999-99"
                fullWidth
                multiline
                variant="outlined"
                value={lojas?.cnpj || ""}
                onChange={(e) => setLojas({ ...lojas, cnpj: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Nome do Responsável"
                placeholder="Ex: João da Silva"
                fullWidth
                multiline
                variant="outlined"
                value={lojas?.responsavel || ""}
                onChange={(e) => setLojas({ ...lojas, responsavel: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Localização da Loja"
                placeholder="Ex: coordenadas do Google Maps"
                fullWidth
                disabled
                variant="outlined"
                value={lojas?.localizacao || ""}
                onChange={(e) => setLojas({ ...lojas, localizacao: e.target.value })}
            />
            <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
                startIcon={<AddLocationIcon />}
                onClick={handleObterLocalizacao}
            >
                {loading ? <CircularProgress /> : "Adicionar Localização"}
            </Button>
        </FormControl>
    )
}