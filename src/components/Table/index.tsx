import { useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { currencyFormat, dateFormat, dateTimeFormat } from './functions';

export default function TableComponent({ rows, columns, fetchMore }: { rows: Row[], columns: Column[], fetchMore?: () => Promise<void> }) {
  const { palette } = useTheme()
  const [fetchInProgress, setFetchInProgress] = useState(false)
  const ref: any = useRef()

  const onScroll = useDebouncedCallback((event: any) => {
    const target = event.target as HTMLTextAreaElement;
    const maxScroll = target.scrollHeight - target.offsetHeight
    const currentScroll = target.scrollTop
    if (!fetchInProgress && fetchMore && ((maxScroll - currentScroll) < 200)) {
      setFetchInProgress(true)
      fetchMore()
        .then(() => setFetchInProgress(false))
        .catch(() => setFetchInProgress(false))
    }
  }, 50)

  const getValue = ({ value, type }: { value?: number | string, type: 'currency' | 'date' | 'datetime' | 'string' }) => {
    const map = {
      currency: (value?: string | number) => currencyFormat(value),
      date: (value?: string | number) => dateFormat(value),
      datetime: (value?: string | number) => dateTimeFormat(value),
      string: (value?: string | number) => value
    }
    if (!map[type]) return value
    return map[type](value)
  }

  return (
    <TableContainer sx={{ height: '100%' }} onScroll={onScroll} ref={ref}>
      <Table stickyHeader >
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell sx={{ background: palette.background.paper }}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map(column => (
                <TableCell sx={{ color: palette.text.primary }}>
                  {column.type ? getValue({ value: row[column.field], type: column.type }) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  )
}
