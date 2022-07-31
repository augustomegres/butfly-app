import { dateFormat, dateTimeFormat } from '@components/Table/functions'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableComponent } from '../../components/TanstackTable'
import { ApiInstance } from '../../services/axios'
import { FormattedCustomers } from './Types/Customers'

type Customer = {
  name: string
  surname: string
  createdAt: number
}

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
      setCustomers([...customers, ...newCustomers])
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

  const columnHelper = createColumnHelper<Customer>()
  const columns: any = [
    columnHelper.accessor('name', {
      header: () => 'Nome',
      cell: field => field.getValue()
    }),
    columnHelper.accessor('surname', {
      header: () => 'Apelido',
      cell: field => field.getValue()
    }),
    columnHelper.accessor('createdAt', {
      header: () => 'Criação',
      cell: field => dateTimeFormat(field.getValue())
    })
  ]

  const table = useReactTable<FormattedCustomers>({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

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
