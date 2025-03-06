import React from "react"

export interface IDashboardProps {
    children: React.ReactNode
    currentView: string
    setCurrentView: (view: string) => void
    renderView: () => React.ReactNode | any
}