import { useTheme } from '@mui/material'
import { createTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableComponent } from '../../components/TanstackTable'
import { ApiInstance } from '../../services/axios'
import { CustomerMapper } from './Mapper/CustomerMapper'
import { FormattedCustomers } from './Types/Customers'

export function CustomerTable() {
  const [customers, setCustomers] = useState<FormattedCustomers[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)
  const [search, setSearch] = useState<string | undefined>()

  const navigate = useNavigate()

  const fetchData = async () => {
    const selectedCompany = localStorage.getItem('@Butfly:companyUid')
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/companies/${selectedCompany}/customers`, {
      params: { page: !page ? 1 : Number(page) + 1, search, include: '(phones;emails)' },
      headers: { authorization: `Bearer ${localStorage.getItem('@Butfly:token')}` }
    }).then(response => {
      const newCustomers = response.data.rows
      setPage(response.data.page)
      setTotalPages(response.data.totalPages)
      setCustomers([...customers, ...CustomerMapper(newCustomers)])
    })
  }

  const handleClickRow = (data: { [field: string]: string | number }) => {
    navigate(`/clientes/${data.uid}`)
  }

  useEffect(() => {
    fetchData()
  }, [search])

  function filterData(search?: string) {
    setPage(0)
    setCustomers([])
    setSearch(search)
  }

  const table = createTable().setRowType<FormattedCustomers>()
  const columns = [
    table.createDataColumn('name', {
      header: 'Nome'
    }),
    table.createDataColumn('surname', {
      header: 'Apelido'
    }),
    table.createDataColumn('createdAt', {
      header: 'Cadastro',
      cell: ({ row }) => <>{row.original?.createdAt ? format(row.original.createdAt, 'dd/MM/yyyy hh:mm:ss') : '-'}</>
    })
  ]

  return (
    <TableComponent
      table={table}
      columns={columns}
      rows={customers}
      fetchMoreResults={fetchData}
      filterResults={filterData}
      onRowClick={handleClickRow}
      addFunction={() => navigate('/clientes/novo-cliente')}
    />
  )
}
