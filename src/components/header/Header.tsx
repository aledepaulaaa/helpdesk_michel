import React from "react"
import { useTheme } from "@mui/material/styles"
import AvatarDropDown from "../drawer/AvatarDropDown"
import { IHeaderProps } from "@/src/interfaces/IHeaderProps"
import { useThemeProvider } from "@/src/context/ThemeContext"
import { AppBar, Toolbar, IconButton, Box } from "@mui/material"
import { Brightness4, Brightness7, Menu as MenuIcon, Notifications } from "@mui/icons-material"

export default function Header({ toggleSidebar, isSmallScreen, sidebarExpanded, drawerWidth }: IHeaderProps) {
    const theme = useTheme()
    const { themeMode, toggleThemeMode } = useThemeProvider()
    const actualDrawerWidth = isSmallScreen ? drawerWidth : (sidebarExpanded ? drawerWidth : 60)

    return (
        <AppBar
            position="fixed"
            component="header"
            variant="outlined"
            sx={{
                width: isSmallScreen ? '100%' : `calc(100% - ${actualDrawerWidth}px)`,
                ml: isSmallScreen ? 0 : `${actualDrawerWidth}px`,
                zIndex: theme.zIndex.drawer + 1,
                flexShrink: 0,
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ gap: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton
                    edge="start"
                    color={theme.palette.mode === "dark" ? "inherit" : "primary"}
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {themeMode === "dark" ? (
                        <IconButton onClick={toggleThemeMode} sx={{ color: theme.palette.primary.main }}>
                            <Brightness7 />
                        </IconButton>
                    ) : (
                        <IconButton onClick={toggleThemeMode} sx={{ color: theme.palette.primary.main }}>
                            <Brightness4 />
                        </IconButton>
                    )}
                    <IconButton>
                        <Notifications sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                    <AvatarDropDown />
                </Box>
            </Toolbar>
        </AppBar>
    )
}