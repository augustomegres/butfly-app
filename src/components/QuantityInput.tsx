import { InputAdornment, TextField, Typography } from '@mui/material'
import NumberFormat from 'react-number-format'

interface QuantityInputProps {
  value: number | undefined
  onChange: (event: any, value: number) => void
}

export function QuantityInput({ onChange, value, ...props }: QuantityInputProps) {
  return (
    <NumberFormat
      name="quantity"
      label="Quantidade"
      required
      fullWidth
      decimalScale={2}
      decimalSeparator={','}
      fixedDecimalScale
      value={value}
      onChange={event => {
        const value = Number(event.target.value.replace(',', '.'))
        if (onChange) onChange(event, value)
      }}
      allowNegative={false}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Typography fontSize={12}>Un.</Typography>
          </InputAdornment>
        )
      }}
      customInput={TextField}
      {...props}
    />
  )
}
