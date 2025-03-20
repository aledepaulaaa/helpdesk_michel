import { Card, Grid2, Typography, CardActionArea } from "@mui/material"
import CampaignIcon from "@mui/icons-material/Campaign"
import LogoutIcon from "@mui/icons-material/Logout"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import { useAuthContext } from "@/src/context/AuthContext"
import { useDashboardContext } from "@/src/context/DashboardContext"
import { AdminContext, useAdminContext } from "@/src/context/AdminContext" // Importe useAdminContext
import React, { useMemo } from "react"

interface MenuItem {
    id: string
    label: string
    icon: React.ReactNode
    view?: string
    onClick?: () => void
}

export default function Dashboard() {
    const { handleLogout } = useAuthContext()
    const { setCurrentView } = useDashboardContext()
    const { isAdmin } = useAdminContext()
    const { handleVerificarCargo, setIsAdmin } = React.useContext(AdminContext)


    //Função para verificar o tipo de usuário
    React.useEffect(() => {
        handleVerificarCargo()
    }, [])

    // Itens de menu do técnico/usuário comum
    const itemsMenuUser: MenuItem[] = useMemo(() => { // Use MenuItem[]
        if (!isAdmin) {
            return [
                { id: "chamados", label: "Chamados", icon: <CampaignIcon fontSize="large" />, view: "Chamados" },
                { id: "relatorios", label: "Relatórios", icon: <AssignmentTurnedInIcon fontSize="large" />, view: "Relátorios" },
            ]
        } else {
            return []
        }
    }, [isAdmin])

    // Itens de menu do admin
    const itemsMenuAdmin: MenuItem[] = useMemo(() => { // Use MenuItem[]
        if (isAdmin) {
            return [
                { id: "chamados", label: "Chamados", icon: <CampaignIcon fontSize="large" />, view: "Chamados" },
                { id: "gerir-lojas", label: "Gerir Lojas", icon: <AccountCircleIcon fontSize="large" />, view: "Gerir Lojas" },
            ]
        } else {
            return []
        }
    }, [isAdmin])

    // Itens de menu combinados, com base no cargo do usuário
    const combinedMenuItems: MenuItem[] = useMemo(() => {
        const commonItems: MenuItem[] = [
            { id: "perfil", label: "Perfil", icon: <AccountCircleIcon fontSize="large" />, view: "Perfil" },
            { id: "sair", label: "Sair", icon: <LogoutIcon fontSize="large" />, onClick: handleLogout }, // Usa onClick
        ]

        if (isAdmin) {
            return [...itemsMenuAdmin, ...commonItems]
        } else {
            return [...itemsMenuUser, ...commonItems]
        }
    }, [isAdmin, itemsMenuAdmin, itemsMenuUser])

    const handleClick = (view: string) => {
        setCurrentView(view)
    }


    return (
        <Grid2 container spacing={2}>
            <Grid2
                size={{ xs: 12 }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    Bem vindo ao sistema de chamados!
                </Typography>
            </Grid2>
            <Grid2
                size={{ xs: 12 }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                gap={4}
            >
                {combinedMenuItems.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            width: "100%",
                            maxWidth: "300px",
                            height: "100px",
                            display: "flex",
                            borderRadius: 6,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#B8ECFF",
                            }
                        }}
                    >
                        <CardActionArea
                            onClick={item.onClick ? item.onClick : () => handleClick(item.view as string)} // Agora o TypeScript entende!
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                            }}
                        >
                            {item.icon}
                            <Typography variant="h6" textAlign="center">
                                {item.label}
                            </Typography>
                        </CardActionArea>
                    </Card>
                ))}
            </Grid2>
        </Grid2>
    )
}