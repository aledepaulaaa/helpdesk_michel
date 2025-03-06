import { createTheme } from "@mui/material"

export const theme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode: mode,
            primary: {
                main: mode === "light" ? "#121212" : "#F4F4F4",
            },
            secondary: {
                main: "#00BBFF" // Azul
            },
            background: {
                default: mode === "light" ? "#FFFFFF" : "#121212",
                paper: mode === "light" ? "#F4F4F4" : "#121212",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: mode === "light" ? "#FFFFFF" : "#121212",
                        color: mode === "light" ? "#121212" : "#F4F4F4",
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: mode === "light" ? "#F4F4F4" : "#121212",
                        borderBottom: `1px solid ${mode === "light" ? "#ddd" : "#333"}`,
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRight: `1px solid ${mode === "light" ? "#ddd" : "#333"}`,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: mode === "light" ? "#333" : "#00BBFF",
                        "&:hover": {
                            backgroundColor: mode === "light" ? "#00BBFF" : "#58D3FF",
                        },
                    },
                },
            },
        },
        typography: {
            fontFamily: "Roboto, sans-serif",
            allVariants: {
                color: mode === "light" ? "#121212" : "#00BBFF",
            },
        },
    })

    // 00BBFF azul
    // 121212 preto
    // F4F4F4 branco
    // 333 cinza
    // ddd cinza claro