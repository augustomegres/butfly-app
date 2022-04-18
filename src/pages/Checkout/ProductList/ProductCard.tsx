import { Box, BoxProps, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { IoMdCart } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { currencyFormat } from '../../../utils/currencyFormat'
import { ProductListProps } from '../types/products'
import { EditProduct } from '../Modals/EditProductModal'

interface ProductCardProps extends BoxProps {
  product: ProductListProps
  openRemoveProduct: (boolean) => void
  index: number
}

export function ProductCard({ product, index, openRemoveProduct, ...props }: ProductCardProps) {
  const { palette } = useTheme()
  const { setSelectedProduct } = useContext(CheckoutContext)
  const [editProductIsOpen, setEditProductIsOpen] = useState(false)
  const [editProductIndex, setEditProductIndex] = useState(-1)

  function handleEditProduct() {
    setEditProductIsOpen(true)
    setEditProductIndex(index)
  }

  return (
    <Box flex="1" position="relative" overflow="hidden" {...props}>
      <Box
        sx={{
          opacity: 0,
          transition: '.5s',
          '&:hover': {
            opacity: 1
          },
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: 80,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          cursor: 'pointer'
        }}
      >
        <Tooltip title="Editar item">
          <IconButton sx={{ mx: 2 }} color="warning" onClick={() => handleEditProduct()}>
            <MdEdit />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Remover item"
          onClick={() => {
            openRemoveProduct(true)
            setSelectedProduct(product)
          }}
        >
          <IconButton sx={{ mx: 2 }} color="error">
            <MdDelete />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid
        container
        sx={{
          borderRadius: 3,
          background: palette.background.default,
          height: 80,
          padding: 2
        }}
      >
        <Grid item xs={1} my="auto" mx={1} fontSize={20}>
          <IoMdCart color={palette.text.primary} />
        </Grid>
        <Grid item my="auto" ml={1}>
          <Typography fontSize={14} color={palette.text.primary}>
            {product.product.name}
          </Typography>
          <Typography fontSize={10} color={palette.text.secondary}>
            {product.product.category.name}
          </Typography>
        </Grid>
        <Grid item xs={3} my="auto" ml="auto">
          <Typography fontSize={12} fontWeight="light" color={palette.success.main} textAlign="right">
            {currencyFormat(product.amount)}
          </Typography>
          <Typography fontSize={12} fontWeight="light" color={palette.success.main} textAlign="right">
            x{Number(product.quantity)}
          </Typography>
        </Grid>
      </Grid>

      <EditProduct open={editProductIsOpen} index={editProductIndex} onClose={() => setEditProductIsOpen(false)} />
    </Box>
  )
}
