import { InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import { toast } from 'react-toastify'

interface DiscountInputProps extends NumberFormatProps {
  discountType: 'money' | 'percentage'
  amount?: number
  discount?: number
  setDiscount: (discount: number) => void
}

export function DiscountInput({ discountType, amount, discount, setDiscount, ...props }: DiscountInputProps) {
  function handleChangeDiscount(event) {
    const toNumber = value => Number(value.replace(',', '.'))
    const discountValue = toNumber(event.target.value)
    if (discountType === 'money' && amount && discountValue > amount) {
      return setDiscount(amount)
    }
    if (discountType === 'percentage' && discountValue > 100) return setDiscount(100)

    setDiscount(discountValue)
  }

  return (
    <NumberFormat
      name="discount"
      label="Desconto"
      value={discount}
      onChange={handleChangeDiscount}
      fullWidth
      decimalScale={discountType === 'money' ? 2 : 0}
      decimalSeparator={','}
      allowNegative={false}
      isAllowed={({ floatValue }) => {
        const maxValue: number = discountType === 'money' ? amount || 0 : 100
        if (discountType === 'money' && !amount) {
          toast.warning(`Defina um valor antes de inserir o desconto.`)
          return false
        }
        const isValid = (floatValue ? floatValue : 0) <= maxValue
        const maxValueFormatted = discountType === 'money' ? `R$ ${amount}` : `${100}%`
        if (!isValid) toast.warning(`O valor máximo permitido é de ${maxValueFormatted}.`)
        if (isValid) return true
        return false
      }}
      fixedDecimalScale
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography fontSize={12}>{discountType === 'money' ? 'R$' : '%'}</Typography>
          </InputAdornment>
        )
      }}
      customInput={TextField}
    />
  )
}
