import React from "react"
import Image from "next/image"
import { menuItems } from "./ItensDoMenu"
import { IBarraLateralProps } from "@/src/interfaces/IBarraLateralProps"
import { useDashboardContext } from "@/src/context/DashboardContext"
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from "@mui/material"

export default function BarraLateral({ isSmallScreen, sidebarExpanded, open, toggleOpen, drawerWidth }: IBarraLateralProps) {
    const theme = useTheme()
    const { setCurrentView } = useDashboardContext()

    const handleItemClick = (route: string) => {
        setCurrentView(menuItems.find((item) => item.id === route)!.id)
        if (isSmallScreen) {
            toggleOpen()
        }
    }

    // Em desktop, se não estiver expandida, usa uma largura menor (ex.: 60px)
    const actualWidth = isSmallScreen ? drawerWidth : (sidebarExpanded ? drawerWidth : 60)

    return (
        <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            open={open}
            onClose={toggleOpen}
            ModalProps={{ keepMounted: true }}
            sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#F4F4F4",
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: actualWidth,
                    overflow: "hidden",
                    marginTop: isSmallScreen ? 6 : 0,
                },
            }}
        >
            <List>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image
                        src="logo_helpdesk.svg"
                        alt="Logo Help Desk"
                        width={100}
                        height={100}
                        style={{ height: "auto", width: 48, marginTop: 10 }}
                    />
                </Box>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{ display: "flex", alignItems: "center", flexDirection: "row", p: 2 }}
                            onClick={() => handleItemClick(item.id)}
                        >
                            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                                {<item.icon />}
                            </ListItemIcon>
                            {(sidebarExpanded || isSmallScreen) && (
                                <Typography variant="body1" fontWeight={700}>
                                    {item.label}
                                </Typography>
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
