import type { AppProps } from "next/app"
import { AdminProvider } from "../context/AdminContext"
import { AuthContextProvider } from "../context/AuthContext"
import { LoadingAndStatusProvider } from "../context/LoadingAndStatus"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "../context/ThemeContext"
import { DashboardProvider } from "../context/DashboardContext"
import { TableProvider } from "../context/TableContext"
import { AcoesChamadoProvider } from "../context/AcoesChamadoContext"
import { LojasContextProvider } from "../context/LojasContext"

export default function App({ Component, pageProps }: AppProps) {

    return (
        <LoadingAndStatusProvider>
            <AdminProvider>
                <LojasContextProvider>
                    <AcoesChamadoProvider>
                        <TableProvider>
                            <DashboardProvider>
                                <ThemeProvider>
                                    <AuthContextProvider>
                                        <CssBaseline />
                                        <Component {...pageProps} />
                                    </AuthContextProvider>
                                </ThemeProvider>
                            </DashboardProvider>
                        </TableProvider>
                    </AcoesChamadoProvider>
                </LojasContextProvider>
            </AdminProvider>
        </LoadingAndStatusProvider>
    )
}
