import { InputAdornment, TextField, Typography } from '@mui/material'
import { Controller, ControllerProps } from 'react-hook-form'
import NumberFormat from 'react-number-format'

interface CurrencyInputProps extends Omit<ControllerProps, 'render'> {
  label?: string
  required?: boolean
}

export function FormCurrencyInput({ control, label, required, ...props }: CurrencyInputProps) {
  function currencyFormatter(value: string) {
    if (!Number(value)) return ''
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value) / 100)
    return `${amount}`.replace(/[^0-9,]/gi, '')
  }

  return (
    <Controller
      {...props}
      control={control}
      render={({ field: { onChange, name, value } }) => (
        <NumberFormat
          format={currencyFormatter}
          required={required}
          decimalScale={2}
          decimalSeparator={','}
          fixedDecimalScale
          allowLeadingZeros={true}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          customInput={TextField}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography fontSize={12}>R$</Typography>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}
