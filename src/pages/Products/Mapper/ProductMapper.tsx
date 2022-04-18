import { Box } from '@mui/material'
import { FormattedProducts, RawProducts } from '../Types/Products'

export function ProductMapper(products: RawProducts[]) {
  const productsFormatted: FormattedProducts[] = []
  products.forEach(product => {
    productsFormatted.push({
      name: product.name,
      category: product.category?.name,
      quantity: product.quantity,
      amount: product.amount,
      createdAt: product.createdAt
    })
  })
  return productsFormatted
}
