import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material'
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, Table as TanstackTable, useReactTable } from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { AddAction } from './AddButton'
import { ExportButton } from './ExportButton'
import { SearchInput } from './SearchInput'

export function TableComponent({
  table: _table,
  rows: _rows,
  columns: _columns,
  fetchMoreResults: fetchMoreResults,
  filterResults: filterResults,
  onRowClick: onRowClick,
  addFunction: addFunction
}: {
  table: TanstackTable<any>
  rows: any
  columns: ColumnDef<any>[]
  fetchMoreResults: () => Promise<void>
  filterResults: (search: string) => void
  onRowClick?: (row: any) => void
  addFunction: VoidFunction
}) {
  useEffect(() => setData(_rows), [_rows])
  const [data, setData] = useState(() => [..._rows])
  const [columns] = useState<any>(() => [..._columns])
  const [filter, setFilter] = useState('')
  const { palette } = useTheme()
  const ref: any = useRef()

  const onScroll = useDebouncedCallback(event => {
    const target = event.target as HTMLTextAreaElement
    const maxScroll = target.scrollHeight - target.offsetHeight
    const currentScroll = target.scrollTop
    if (currentScroll > maxScroll - 1000) fetchMoreResults()
  }, 50)

  const instance = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter
    },
    enableGlobalFilter: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <Box mb={2} mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={2} md={3} lg={6}>
              <ExportButton />
            </Grid>

            <Grid item xs={8} md={7} lg={5}>
              <SearchInput onChange={useDebouncedCallback(event => filterResults(event.target.value), 300)} />
            </Grid>

            <Grid item xs={2} md={2} lg={1}>
              <AddAction addFunction={() => addFunction()} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <TableContainer onScroll={onScroll} ref={ref} sx={{ background: palette.background.paper, flexGrow: 1, height: 0 }}>
        <Table stickyHeader>
          <TableHead>
            {instance.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell sx={{ background: palette.background.paper }} key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {instance.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick && onRowClick(row.original)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default'
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
