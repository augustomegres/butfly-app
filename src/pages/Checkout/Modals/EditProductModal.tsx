import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, MenuItem, Select, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { CurrencyInput } from '../../../components/CurrencyInput'
import { DiscountInput } from '../../../components/DiscountInput'
import { QuantityInput } from '../../../components/QuantityInput'
import { CheckoutContext } from '../Contexts/CheckoutContext'

interface EditProductProps extends DialogProps {
  index: number
  onClose: () => void
}
export function EditProduct({ onClose, ...props }: EditProductProps) {
  const { products, updateProduct } = useContext(CheckoutContext)
  const product = products[props.index]
  const [amount, setAmount] = useState<number | undefined>()
  const [quantity, setQuantity] = useState<number | undefined>()
  const [discountType, setDiscountType] = useState<'percentage' | 'money'>('percentage')
  const [discount, setDiscount] = useState<number | undefined>()

  useEffect(() => {
    setAmount(product?.amount)
    setQuantity(product?.quantity)
    setDiscount(product?.discount)
    setDiscountType(product?.discountType)
  }, [product])

  function handleUpdate() {
    updateProduct(props.index, { ...product, quantity, amount, discount, discountType })
    onClose()
  }
  return (
    <Dialog open={props.open} onClose={onClose} keepMounted={false}>
      <DialogTitle>Edição de produto</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} pt={0.5}>
          <Grid item xs={12}>
            <TextField value={product?.product?.name} label="Produto" disabled fullWidth />
          </Grid>

          <Grid item xs={6}>
            <CurrencyInput value={amount} onChange={(event, value) => setAmount(value)} />
          </Grid>

          <Grid item xs={6}>
            <QuantityInput value={quantity} onChange={(event, value) => setQuantity(value)} />
          </Grid>

          <Grid item xs={3}>
            <Select fullWidth defaultValue="percentage" value={discountType} onChange={(e: any) => setDiscountType(e.target?.value)}>
              <MenuItem value={'percentage'}>%</MenuItem>
              <MenuItem value={'money'}>R$</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={9}>
            <DiscountInput discountType={discountType} amount={amount} setDiscount={setDiscount} discount={discount} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
