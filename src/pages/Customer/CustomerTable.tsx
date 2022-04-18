import { Box, Button, Grid, InputBase, useTheme } from '@mui/material'
import { ContentCard } from 'components/ContentCard'
import { TableComponent } from 'components/Table'
import { FormattedCustomers } from './Types/Customers'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiInstance } from 'services/axios'
import { ExportButton } from '../../components/ExportButton'
import { CustomerMapper } from './Mapper/CustomerMapper'
import { HiPlusSm } from 'react-icons/hi'
import { IoSearch } from 'react-icons/io5'

const columns: { field: string; label: string; type?: 'currency' | 'date' | 'datetime'; hidden?: boolean }[] = [
  { field: 'id', label: 'Id', hidden: true },
  { field: 'name', label: 'Nome' },
  { field: 'email', label: 'Email' },
  { field: 'phone', label: 'Telefone' },
  { field: 'createdAt', label: 'Cadastro', type: 'datetime' },
  { field: 'contact', label: 'Contato' }
]

export function CustomerTable() {
  const [customers, setCustomers] = useState<FormattedCustomers[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)
  const { palette } = useTheme()

  const navigate = useNavigate()

  const fetchData = async () => {
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/customers`, { params: { page: !page ? 1 : Number(page) + 1 } })
      .then(response => {
        const newCustomers = response.data.rows
        setPage(response.data.page)
        setTotalPages(response.data.totalPages)
        setCustomers([...customers, ...CustomerMapper(newCustomers)])
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleClickRow = (data: { [field: string]: string | number }) => {
    navigate(`/clientes/${data.id}`)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Box mb={2} mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={3} lg={6}>
            <ExportButton title="Exportar clientes" onCsvExport={() => console.log('CSV')} onPdfExport={() => console.log('PDF')} />
          </Grid>
          <Grid item xs={8} md={7} lg={5}>
            <InputBase
              fullWidth
              startAdornment={<IoSearch style={{ marginRight: 8 }} />}
              placeholder="Pesquise um cliente..."
              sx={{ borderRadius: '12px', px: 2, background: palette.background.paper, color: palette.text.primary }}
            />
          </Grid>

          <Grid item xs={2} md={2} lg={1}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              style={{ height: 46, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}
              onClick={() => navigate('/clientes/novo-cliente')}
            >
              <HiPlusSm size={22} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ContentCard sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <TableComponent rows={customers} columns={columns} fetchMore={fetchData} onClickRow={handleClickRow} />
      </ContentCard>
    </>
  )
}
