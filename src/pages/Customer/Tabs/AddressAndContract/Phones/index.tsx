import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsWhatsapp } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { PhoneInput } from '@components/Inputs/Phone'
import { ApiInstance } from '@services/axios'
import { phoneMask } from '@utils/phoneMask'
import { CustomerContext } from '@pages/Customer/CustomerContext'
import { phoneSchema } from './yupResolver'
import { DeletePhoneModal } from './DeletePhoneModal'
import { toast } from 'react-toastify'

export function Phones() {
  const { palette } = useTheme()
  const [isCreating, setIsCreating] = useState(false)
  const [phone, setPhone] = useState({ uid: '', phone: '' })
  const [deletePhoneModal, setDeletePhoneModal] = useState(false)
  const { customer, setCustomer } = useContext(CustomerContext)
  async function handleCreatePhone(data: any) {
    const companyUid = localStorage.getItem('@Butfly:companyUid')
    if (!customer) return
    await ApiInstance.post(`/companies/${companyUid}/customers/${customer.uid}/phones`, data, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('@Butfly:token') }
    })
      .then(response => {
        setCustomer({ ...customer, phones: [...customer?.phones, { uid: response.data.uid, phone: response.data.phone }] })
        setIsCreating(false)
        reset()
      })
      .catch(() => toast('Erro ao criar o telefone.', { type: 'error' }))
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(phoneSchema)
  })

  return (
    <Box>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
        Telefones
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Box sx={{ maxHeight: 135, overflow: 'auto' }}>
          {customer?.phones.map((value, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{ h: 36, py: 1, px: 2, mx: 1, borderRadius: 3, my: 1, background: palette.background.default }}
            >
              <IconButton
                size="small"
                color="success"
                sx={{ mr: 1 }}
                onClick={() => window.open(`https://api.whatsapp.com/send/?phone=55${value.phone}`)}
              >
                <BsWhatsapp />
              </IconButton>

              <Typography fontSize={14} fontWeight="bold" color={palette.text.primary}>
                {phoneMask(value.phone)}
              </Typography>

              <IconButton
                size="small"
                color="error"
                sx={{ ml: 'auto' }}
                onClick={() => {
                  setDeletePhoneModal(true)
                  setPhone(value)
                }}
              >
                <MdDelete />
              </IconButton>
            </Box>
          ))}
        </Box>

        {!customer?.phones.length && !isCreating && (
          <Typography my={2} fontSize={14}>
            Não há telefones cadastrados para este cliente
          </Typography>
        )}
        {isCreating && (
          <form id="newPhone" onSubmit={handleSubmit(handleCreatePhone)}>
            <Box display="flex" alignItems={'center'}>
              <PhoneInput
                error={!!errors.phone}
                helperText={String(errors.phone?.message)}
                control={control}
                name="phone"
                label="Telefone"
                variant="outlined"
                sx={{ mr: 1 }}
              />
            </Box>
          </form>
        )}
      </Box>
      <Box width="100%" display="flex" justifyContent={'flex-end'}>
        {isCreating && (
          <Button variant="outlined" sx={{ ml: 'auto', mr: 1 }} onClick={() => setIsCreating(false)}>
            Cancelar
          </Button>
        )}
        {isCreating && (
          <Button type="submit" form="newPhone" variant="contained" onClick={() => setIsCreating(true)}>
            Salvar
          </Button>
        )}

        {!isCreating && (
          <Button variant="contained" sx={{ ml: 'auto' }} onClick={() => setIsCreating(true)}>
            Adicionar telefone
          </Button>
        )}
      </Box>

      <DeletePhoneModal
        open={deletePhoneModal}
        onClose={() => setDeletePhoneModal(false)}
        customerName={customer?.name as string}
        customerPhone={phone.phone}
        phoneUid={phone.uid}
      />
    </Box>
  )
}
