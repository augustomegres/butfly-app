import { Box, Button, Grid, MenuItem, Select, Typography, useTheme } from '@mui/material'
import { SyntheticEvent, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AsyncAutoComplete } from '../../../components/AsyncAutoComplete'
import { CurrencyInput } from '../../../components/CurrencyInput'
import { DiscountInput } from '../../../components/DiscountInput'
import { QuantityInput } from '../../../components/QuantityInput'
import { ApiInstance } from '../../../services/axios'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { ProductListProps, ProductProps } from '../types/products'

export function NewProduct() {
  const { palette } = useTheme()
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [products, setProducts] = useState([])
  const [amount, setAmount] = useState<number | undefined>()
  const [quantity, setQuantity] = useState<number | undefined>()
  const [discount, setDiscount] = useState<number | undefined>()
  const [discountType, setDiscountType] = useState<'money' | 'percentage'>('percentage')
  const [, setProductLoading] = useState(false)
  const { handleSubmit, register } = useForm()
  const { addProduct } = useContext(CheckoutContext)

  async function fetchProducts(event: SyntheticEvent<Element, Event>, value: string) {
    setProductLoading(true)
    await ApiInstance.get(`products`, { params: { name: value } })
      .then(response => {
        setProducts(response.data.rows)
        setProductLoading(false)
      })
      .catch(() => {
        setProductLoading(false)
      })
  }

  function addProductAndResetForm() {
    if (!product) return
    const addProductData: ProductListProps = {
      quantity: quantity,
      amount: amount,
      discount: discount,
      discountType: discountType,
      product: product
    }
    addProduct(addProductData)
    setProduct(null)
    setAmount(undefined)
    setQuantity(undefined)
    setDiscount(undefined)
  }

  function handleChangeProduct(data) {
    setProduct(data)
    if (!amount) setAmount(data.amount)
    if (!quantity) setQuantity(1)
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(addProductAndResetForm)} display="flex" flexDirection="column">
      <Box display="flex" mb={4}>
        <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
          Informações da venda
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AsyncAutoComplete
            isRequired
            value={product}
            onChange={handleChangeProduct}
            label="Produto"
            data={products}
            setData={setProducts}
            fetchData={fetchProducts}
          />
        </Grid>

        <Grid item xs={6}>
          <CurrencyInput value={amount} onChange={(event, value) => setAmount(value)} />
        </Grid>

        <Grid item xs={6}>
          <QuantityInput value={quantity} onChange={(event, value) => setQuantity(value)} />
        </Grid>

        <Grid item xs={3}>
          <Select
            fullWidth
            {...register('discountType')}
            defaultValue="percentage"
            value={discountType}
            onChange={(e: any) => setDiscountType(e.target?.value)}
          >
            <MenuItem value={'percentage'}>%</MenuItem>
            <MenuItem value={'money'}>R$</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={9}>
          <DiscountInput discountType={discountType} amount={amount} setDiscount={setDiscount} discount={discount} />
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ alignSelf: 'flex-end', mt: 2 }} type="submit">
        Adicionar produto
      </Button>
    </Box>
  )
}
