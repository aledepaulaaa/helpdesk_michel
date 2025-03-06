import React from "react"
import { CssBaseline } from "@mui/material"
import { theme as customTheme } from "../theme/theme"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"

export interface IThemeContextProps {
    themeMode: "light" | "dark"
    toggleThemeMode: () => void
    theme: any
}

export const ThemeContext = React.createContext<IThemeContextProps>({
    theme: customTheme("light"),
    themeMode: "light",
    toggleThemeMode: () => { },
})

export const useThemeProvider = () => React.useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeMode, setThemeMode] = React.useState<"light" | "dark">("light")

    React.useEffect(() => {
        const storedTheme = localStorage.getItem("themeMode") as "light" | "dark" | null
        if (storedTheme) {
            setThemeMode(storedTheme)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem("themeMode", themeMode)
    }, [themeMode])

    const toggleThemeMode = () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
    }

    const theme = customTheme(themeMode)

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleThemeMode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}