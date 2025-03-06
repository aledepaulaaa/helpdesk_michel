import { TablePagination } from "@mui/material"
import { useTableContext } from "@/src/context/TableContext"

export default function PaginacaoTabelaChamadosAdmin({  }) {
    const { page, totalItems, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useTableContext()

    return (
        <TablePagination
            component="div"
            count={totalItems}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Itens por página"
        />
    )
}