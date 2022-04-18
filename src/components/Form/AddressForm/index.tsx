import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { ViaCepInstance } from 'services/cep'
import UFList from '../../../utils/UFlist.json'

const MaskedInput = props => <ReactInputMask {...props}>{inputProps => <TextField {...inputProps} />}</ReactInputMask>

export function AddressForm() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext()
  const [focusedInput, setFocusedInput] = useState('')
  useEffect(() => {
    const cep = watch('address.cep')
    if (cep?.length === 9) {
      ViaCepInstance(`${cep}/json`).then((response: { data: ViaCepResponse }) => {
        setValue('address.neighborhood', response.data.bairro || '')
        setValue('address.additionalInfo', response.data.complemento || '')
        setValue('address.street', response.data.logradouro || '')
        setValue('address.uf', response.data.uf || '')
        setValue('address.city', response.data.localidade || '')
      })
    }
  }, [watch('address.cep')])

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            {...register('address.cep')}
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <MaskedInput
                required
                error={!!errors.address?.cep}
                helperText={errors.address?.cep?.message}
                fullWidth
                value={value || ''}
                onFocus={() => setFocusedInput('cep')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'cep' || watch('address.cep') }}
                onChange={onChange}
                mask="99999-999"
                maskChar=""
                label="CEP"
              />
            )}
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            {...register('address.street')}
            error={!!errors.address?.street}
            helperText={errors.address?.street?.message}
            onFocus={() => setFocusedInput('street')}
            onBlur={() => setFocusedInput('')}
            InputLabelProps={{ shrink: focusedInput === 'street' || watch('address.street') }}
            required
            label="Logradouro"
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            {...register('address.number')}
            error={!!errors.address?.number}
            helperText={errors.address?.number?.message}
            onFocus={() => setFocusedInput('number')}
            onBlur={() => setFocusedInput('')}
            InputLabelProps={{ shrink: focusedInput === 'number' || watch('address.number') }}
            label="Nº"
            defaultValue=""
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('address.additionalInfo')}
            error={!!errors.address?.additionalInfo}
            helperText={errors.address?.additionalInfo?.message}
            onFocus={() => setFocusedInput('additionalInfo')}
            onBlur={() => setFocusedInput('')}
            InputLabelProps={{ shrink: focusedInput === 'additionalInfo' || watch('address.additionalInfo') }}
            label="Complemento"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('address.neighborhood')}
            error={!!errors.address?.neighborhood}
            helperText={errors.address?.neighborhood?.message}
            onFocus={() => setFocusedInput('neighborhood')}
            onBlur={() => setFocusedInput('')}
            InputLabelProps={{ shrink: focusedInput === 'neighborhood' || watch('address.neighborhood') }}
            required
            label="Bairro"
            fullWidth
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            {...register('address.city')}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
            onFocus={() => setFocusedInput('city')}
            onBlur={() => setFocusedInput('')}
            InputLabelProps={{ shrink: focusedInput === 'city' || watch('address.city') }}
            required
            label="Cidade"
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Controller
            {...register('address.uf')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <TextField
                  required
                  select
                  error={!!errors.address?.uf}
                  helperText={errors.address?.uf?.message}
                  onFocus={() => setFocusedInput('uf')}
                  onBlur={() => setFocusedInput('')}
                  InputLabelProps={{ shrink: focusedInput === 'uf' || watch('address.uf') }}
                  sx={{ height: 46 }}
                  fullWidth
                  value={value || ''}
                  onChange={onChange}
                  defaultValue=""
                  label="UF"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  {UFList.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}
          ></Controller>
        </Grid>
      </Grid>
    </Box>
  )
}
