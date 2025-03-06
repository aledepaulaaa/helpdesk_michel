import React from "react"
import Header from "../header/Header"
import BarraLateral from "../drawer/BarraLateral"
import { Box, Toolbar, useTheme, useMediaQuery } from "@mui/material"
import { useDashboardContext } from "@/src/context/DashboardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))
    const drawerWidth = 200

    const [sidebarExpanded, setSidebarExpanded] = React.useState(false)
    const [sidebarOpen, setSidebarOpen] = React.useState(false)
    const { renderView } = useDashboardContext()

    // Em telas pequenas, abre ou fecha o Drawer em telas grandes, alterna entre expandido e colapsado
    const handleToggleSidebar = () => {
        if (isSmallScreen) {
            setSidebarOpen((prev) => !prev)
        } else {
            setSidebarExpanded((prev) => !prev)
        }
    }

    // Para telas grandes, a largura da sidebar muda conforme o estado
    const actualSidebarWidth = isSmallScreen ? drawerWidth : (sidebarExpanded ? drawerWidth : 60)

    return (
        <Box sx={{ display: "flex" }}>
            <Header
                toggleSidebar={handleToggleSidebar}
                isSmallScreen={isSmallScreen}
                sidebarExpanded={sidebarExpanded}
                drawerWidth={drawerWidth}
            />
            <BarraLateral
                isSmallScreen={isSmallScreen}
                sidebarExpanded={sidebarExpanded}
                open={isSmallScreen ? sidebarOpen : true}
                toggleOpen={() => setSidebarOpen((prev) => !prev)}
                drawerWidth={drawerWidth}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    scrollbarWidth: "thin",
                    scrollBehavior: "smooth",
                    overflow: "hidden",
                    ml: isSmallScreen ? 0 : `${actualSidebarWidth}px`,
                }}
            >
                <Toolbar />
                {renderView()}
            </Box>
        </Box>
    )
}