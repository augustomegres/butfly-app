import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ContentCard } from '../../components/ContentCard'
import Table from '../../components/Table'
import { ApiInstance } from '../../services/axios'


const columns: { field: string, label: string, type?: 'currency' | 'date' }[] = [
  { field: 'name', label: 'Nome', },
  { field: 'quantity', label: 'Quantidade' },
  { field: 'price', label: 'Valor', type: 'currency' },
  { field: 'createdAt', label: 'Data de criação', type: 'date' }
]

export function Products() {
  const [products, setProducts] = useState<any>([])
  const [page, setPage] = useState(1)
  const [totalPages] = useState(4)
  const { palette } = useTheme()

  const fetchData = async () => {
    if (page > totalPages) return
    await ApiInstance.get(`/products?page=${page}&limit=25`)
      .then(response => {
        setPage(page + 1)
        setProducts([...products, ...response.data])
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Produtos
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Gerencie e controle seus produtos de forma simples.
      </Typography>
      <ContentCard mt={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }} >
        <Table rows={products} columns={columns} fetchMore={fetchData} />
      </ContentCard>
    </Box>
  )
}
