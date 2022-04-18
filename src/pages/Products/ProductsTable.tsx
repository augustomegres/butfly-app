import { Box, Grid } from '@mui/material'
import { ContentCard } from 'components/ContentCard'
import { TableComponent } from 'components/Table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiInstance } from 'services/axios'
import { ExportButton } from './ExportButton'
import { NewProduct } from './NewProduct'
import { ProductMapper } from './Mapper/ProductMapper'
import { SearchInput } from './SearchInput'
import { FormattedProducts } from './Types/Products'

const columns: { field: string; label: string; type?: 'currency' | 'date' | 'datetime'; hidden?: boolean }[] = [
  { field: 'id', label: 'Id', hidden: true },
  { field: 'name', label: 'Nome' },
  { field: 'category', label: 'Categoria' },
  { field: 'quantity', label: 'Quantidade' },
  { field: 'amount', label: 'Valor', type: 'currency' },
  { field: 'createdAt', label: 'Data de criação', type: 'datetime' }
]

export function ProductsTable() {
  const [products, setProducts] = useState<FormattedProducts[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)

  const navigate = useNavigate()

  const fetchData = async () => {
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/products`, { params: { page: !page ? 1 : Number(page) + 1 } })
      .then(response => {
        const newProducts = response.data.rows
        setPage(response.data.page)
        setTotalPages(response.data.totalPages)
        setProducts([...products, ...ProductMapper(newProducts)])
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleClickRow = (data: { [field: string]: string | number }) => {
    navigate(`/produtos/${data.id}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Box mb={2} mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={3} lg={6}>
            <ExportButton />
          </Grid>

          <Grid item xs={8} md={7} lg={5}>
            <SearchInput />
          </Grid>

          <Grid item xs={2} md={2} lg={1}>
            <NewProduct />
          </Grid>
        </Grid>
      </Box>
      <ContentCard sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <TableComponent rows={products} columns={columns} fetchMore={fetchData} onClickRow={handleClickRow} />
      </ContentCard>
    </>
  )
}
