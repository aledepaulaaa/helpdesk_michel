import { TablePagination } from "@mui/material"
import { useTableContext } from "@/src/context/TableContext"
import { IPaginacaoTabelaChamadosProps } from "@/src/interfaces/IPaginacaoTabelaChamadosProps"

export default function PaginacaoTabelaChamados({ totalItems }: IPaginacaoTabelaChamadosProps) {
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useTableContext()

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