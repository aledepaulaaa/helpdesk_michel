import React from "react"
import { IDashboardProps } from "../interfaces/IDashboardProps"
import Dashboard from "../components/dashboard/Dashboard"
import Chamados from "../views/chamados/Chamados"
import Perfil from "../views/perfil/Perfil"
import GerirLojas from "../views/lojas/GerirLojas"

export const DashboardContext = React.createContext<IDashboardProps>({
    children: null,
    currentView: "",
    setCurrentView: () => { },
    renderView: () => null,
})

export const useDashboardContext = () => React.useContext(DashboardContext)

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentView, setCurrentView] = React.useState("dashboard")

    const renderView = () => {
        switch (currentView) {
            case "Chamados":
                return <Chamados />
            case "Gerir Lojas":
                return <GerirLojas />
            case "Relátorios":
                return <></>
            case "Perfil":
                return <Perfil />
            default:
                return <Dashboard />
        }
    }

    return (
        <DashboardContext.Provider
            value={{
                children,
                currentView,
                setCurrentView,
                renderView,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}