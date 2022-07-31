import { MaskedInput } from '@components/Inputs/MaskedInput'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { ApiInstance } from '@services/axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { AddressType, CustomerType } from '../../../../../types/GlobalProps'

export function EditAddressModal({
  addressUid,
  isOpen,
  customer,
  setCustomer,
  onClose
}: {
  addressUid: string
  customer: CustomerType
  isOpen: boolean
  setCustomer: (customer: CustomerType) => void
  onClose: VoidFunction
}) {
  const oldAddress = customer.addresses.find(address => address.uid === addressUid)
  if (!oldAddress) return null
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      uid: '',
      zipCode: oldAddress?.zipCode || '',
      neighborhood: oldAddress?.neighborhood || '',
      complement: oldAddress?.complement || '',
      street: oldAddress?.street || '',
      state: oldAddress?.state || '',
      city: oldAddress?.city || '',
      number: oldAddress?.number || ''
    }
  })
  const [focusedInput, setFocusedInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdateAddress(address: AddressType) {
    const companyUid = localStorage.getItem('@Butfly:companyUid')

    await ApiInstance.put(
      `/companies/${companyUid}/customers/${customer?.uid}/addresses/${addressUid}`,
      {
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        neighborhood: address.neighborhood,
        street: address.street,
        number: address.number,
        complement: address.complement
      },
      {
        headers: { authorization: 'Bearer ' + localStorage.getItem('@Butfly:token') }
      }
    )
      .then(response => {
        setIsLoading(false)
        onClose()
        const address = {
          uid: response.data.uid,
          city: response.data.city,
          state: response.data.state,
          neighborhood: response.data.neighborhood,
          street: response.data.street,
          number: response.data.number,
          zipCode: response.data.zipCode,
          complement: response.data.complement
        }
        setCustomer({ ...customer, addresses: [...customer.addresses.filter(address => address.uid !== addressUid), address] })
      })
      .catch(error => {
        setIsLoading(false)
        toast(`Erro ao atualizar o endereço.`, { type: 'error' })
      })
  }

  function handleCheckFocus(field: any): boolean {
    return focusedInput === field || watch(field) ? true : false
  }

  return (
    <Dialog open={isOpen} maxWidth={'xs'} onClose={onClose}>
      <DialogTitle>Edição de endereço</DialogTitle>
      <DialogContent>
        <form id="address-form" onSubmit={handleSubmit(handleUpdateAddress)}>
          <Grid container spacing={1} mt={0}>
            <Grid item xs={12} md={4}>
              <Controller
                name="zipCode"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <MaskedInput
                    required
                    fullWidth
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                    value={value || ''}
                    onFocus={() => setFocusedInput('zipCode')}
                    onBlur={() => setFocusedInput('')}
                    InputLabelProps={{ shrink: handleCheckFocus('zipCode') }}
                    onChange={onChange}
                    mask="99999-999"
                    maskChar=""
                    label="CEP"
                  />
                )}
              />
            </Grid>
            <Grid item xs={9} md={6}>
              <TextField
                fullWidth
                label="Cidade"
                {...register('city')}
                onFocus={() => setFocusedInput('city')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('city') }}
                required
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextField
                fullWidth
                label="UF"
                {...register('state')}
                onFocus={() => setFocusedInput('state')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('state') }}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Bairro"
                {...register('neighborhood')}
                onFocus={() => setFocusedInput('neighborhood')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('neighborhood') }}
                required
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Logradouro"
                {...register('street')}
                onFocus={() => setFocusedInput('street')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('street') }}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                {...register('number')}
                label="Nº"
                onFocus={() => setFocusedInput('number')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('number') }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complemento"
                {...register('complement')}
                onFocus={() => setFocusedInput('complement')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('complement') }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton loading={isLoading} variant="contained" color="primary" type="submit" form="address-form">
          Atualizar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
