import { Grid, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { ViaCepInstance } from '../../../services/cep'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { AddressProps } from '../types/address'

const MaskedInput = props => <ReactInputMask {...props}>{inputProps => <TextField {...inputProps} />}</ReactInputMask>
const UFList = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]

export function Shipping() {
  const { address, setAddress } = useContext(CheckoutContext)
  const handleChangeCep = async event => {
    const inputValue: string = event?.target?.value
    let addressInfo: AddressProps = {
      cep: inputValue || '',
      neighborhood: address?.neighborhood || '',
      additionalInfo: address?.additionalInfo || '',
      city: address?.city || '',
      street: address?.street || '',
      uf: address?.uf || '',
      number: address?.number || ''
    }
    setAddress({ ...addressInfo })
    if (inputValue.length === 9) {
      await ViaCepInstance.get(`${inputValue}/json`)
        .then(response => {
          const { bairro, complemento, localidade, logradouro, uf, erro } = response.data
          if (erro) return toast.warn('Endereço não encontrado, verifique o CEP informado ou informe o endereço manualmente.')
          setAddress({
            ...addressInfo,
            neighborhood: bairro || '',
            additionalInfo: complemento || '',
            city: localidade || '',
            street: logradouro || '',
            uf: uf || ''
          })
        })
        .catch(error => {
          toast.error('Erro de comunicação com o gateway, aguarde alguns instantes e tente novamente')
        })
    }
  }

  const handleChangeAddress = event => {
    const { name, value } = event.target
    if (address) setAddress({ ...address, [name]: value })
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MaskedInput required mask="99999-999" value={address?.cep} maskChar="" label="CEP" fullWidth onChange={handleChangeCep} />
        </Grid>

        <Grid item xs={8}>
          <TextField
            required
            name="street"
            label="Logradouro"
            value={address?.street}
            onChange={handleChangeAddress}
            InputLabelProps={{ shrink: address?.street ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField required name="number" label="Nº" value={address?.number} fullWidth onChange={handleChangeAddress} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="additionalInfo"
            label="Complemento"
            value={address?.additionalInfo}
            onChange={handleChangeAddress}
            InputLabelProps={{ shrink: address?.additionalInfo ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name="neighborhood"
            label="Bairro"
            value={address?.neighborhood}
            onChange={handleChangeAddress}
            InputLabelProps={{ shrink: address?.neighborhood ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            required
            label="Cidade"
            value={address?.city}
            onChange={handleChangeAddress}
            InputLabelProps={{ shrink: address?.city ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Select value={address?.uf || ''} onChange={handleChangeAddress} fullWidth>
            {UFList.map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Box>
  )
}
