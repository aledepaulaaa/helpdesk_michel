import React from "react"
import { useMediaQuery } from "@mui/material"

export const TableContext = React.createContext<any>({
    page: 0,
    totalItems: 0,
    rowsPerPage: 5,
    handleChangePage: () => { },
    handleChangeRowsPerPage: () => { },
    mdSize: false,
    handleStatusColor: () => { },
})

export const useTableContext = () => React.useContext(TableContext)

export function TableProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = React.useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const mdSize = useMediaQuery("(min-width: 768px)")
    const totalItems = 10000

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleStatusColor = (status: any) => {
        switch (status) {
            case "Concluído":
                return "success"
            case "Pendente":
                return "warning"
            case "Em andamento":
                return "info"
            case "Cancelado":
                return "error"
            default:
                return "black"
        }
    }

    return (
        <TableContext.Provider
            value={{
                page,
                totalItems,
                rowsPerPage,
                mdSize,
                handleChangePage,
                handleChangeRowsPerPage,
                handleStatusColor,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}