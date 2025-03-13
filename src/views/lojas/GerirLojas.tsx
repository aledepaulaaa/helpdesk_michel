import React from "react"
import { IUser } from "@/src/interfaces/authcontext/IUser"
import { useAdminContext } from "@/src/context/AdminContext"
import { useLojaContext } from "@/src/context/LojasContext"
import { useLoadingAndStatusContext } from "@/src/context/LoadingAndStatus"
import LojasDialog from "./LojasDialog"
import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import CloseIcon from "@mui/icons-material/Close"
import AdicionarLojasDialog from "./AdicionarLojasDialog"
import { Card, CardContent, CardHeader, Chip, Divider, Grid2, IconButton, Stack, Typography } from "@mui/material"
import CargoDialog from "../perfil/CargoDialog"

const dialogNameAdicionarLoja = "AdicionarLojasDialog"

export default function GerirLojas() {
    const { usuarios, handleObterUsuarios } = useAdminContext()
    const { handleOpenDialog } = useLoadingAndStatusContext()
    const { carregarLojas, setUsuarioSelecionado, handleBuscarLojas, handleExcluirLoja } = useLojaContext()
    const [lojasUsuarios, setLojasUsuarios] = React.useState<any>({})

    React.useEffect(() => {
        const loadLojas = async () => {
            const lojasData = await handleBuscarLojas()
            if (lojasData as any) {
                setLojasUsuarios(carregarLojas)
            }
        }
        loadLojas()
        handleObterUsuarios()
    }, [])

    const corCargo = (cargo: IUser["cargo"]) => {
        switch (cargo) {
            case "Admin":
                return "success"
            case "Usuário":
                return "info"
            case "Inativo":
                return "error"
            default: return "warning"
        }
    }

    const handleOpenUserDialog = (usuario: IUser) => {
        setUsuarioSelecionado(usuario)
        handleOpenDialog(dialogNameAdicionarLoja)
    }

    const handleDeleteLojaUusuario = async (userId: string) => {
        try {
            await handleExcluirLoja(userId)
            handleBuscarLojas()
        } catch (error) {
            console.error("Erro ao excluir loja: ", error)
        }
    }

    return (
        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
            <Stack direction="column" alignItems="center" spacing={2} overflow={"auto"}>
                <Typography variant="h4" fontWeight="bold">
                    Lista de Usuários
                </Typography>
                {usuarios.map((item, index) => (
                    <Card
                        key={index}
                        elevation={2}
                        sx={{ borderRadius: 4, width: "100%" }}>
                        <CardHeader
                            title={
                                <Grid2>
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.name}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Chip
                                            label={item.cargo}
                                            color={corCargo(item.cargo)}
                                        />
                                       <CargoDialog dialogOpenName={`CargoDialog-${item.id}`} />
                                        <LojasDialog
                                            usuario={item}
                                            dialogName={`LojasDialog-${item.id}`}
                                            lojaData={lojasUsuarios[item.id as string]}
                                        />
                                        {lojasUsuarios[index] && (
                                            <IconButton onClick={() => handleDeleteLojaUusuario(item.id as string)}>
                                                <CloseIcon color="error" fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Stack>
                                </Grid2>
                            }
                        />
                        <Divider />
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <Typography variant="body1">E-mail: {item.email}</Typography>
                            <IconButton onClick={() => handleOpenUserDialog(item)}>
                                <AddBusinessIcon color="primary" fontSize="large" />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
                <AdicionarLojasDialog />
            </Stack>
        </Grid2>
    )
}