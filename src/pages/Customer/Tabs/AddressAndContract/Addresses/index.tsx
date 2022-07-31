import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { CustomerContext } from '@pages/Customer/CustomerContext'
import { useContext, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { DeleteAddressModal } from './DeleteAddressModal'
import { EditAddressModal } from './EditAddressModal'
import { NewAddressModal } from './NewAddressModal'

export function Addresses() {
  const { palette } = useTheme()
  const { customer, setCustomer } = useContext(CustomerContext)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [addressUid, setAddressUid] = useState('')
  const [editAddressModal, setEditAddressModal] = useState(false)
  const [newAddressModal, setNewAddressModal] = useState(false)
  return (
    <>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
        Endereços
      </Typography>

      <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
        {customer?.addresses.map((address, index) => (
          <Box key={index} sx={{ my: 1, background: palette.background.default, p: 3, borderRadius: 4, display: 'flex' }}>
            <>
              <Grid container>
                <Grid item xs={5} mb={2}>
                  <Typography color="gray" fontSize={14}>
                    Cidade
                  </Typography>
                  <Typography fontSize={14} fontWeight="bold" color={palette.text.primary}>
                    {address.city} - {address.state}
                  </Typography>
                </Grid>

                <Grid item xs={7}>
                  <Typography color="gray" fontSize={14}>
                    Bairro
                  </Typography>
                  <Typography fontSize={14} fontWeight="bold" color={palette.text.primary}>
                    {address.neighborhood}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="gray" fontSize={14}>
                    Logradouro
                  </Typography>
                  <Typography fontSize={14} fontWeight="bold" color={palette.text.primary}>
                    {address?.street}, {address?.number}
                  </Typography>
                </Grid>

                {address?.complement && (
                  <Grid item xs={6}>
                    <Typography color="gray" fontSize={14}>
                      Complemento
                    </Typography>
                    <Typography fontSize={14} fontWeight="bold" color={palette.text.primary}>
                      {address?.complement}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Box display="flex" sx={{ mb: 1 }} alignItems="flex-start">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => {
                    setAddressUid(address?.uid)
                    setEditAddressModal(true)
                  }}
                >
                  <MdEdit />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    setAddressUid(address?.uid)
                    setDeleteModalIsOpen(true)
                  }}
                >
                  <MdDelete />
                </IconButton>
              </Box>
            </>
          </Box>
        ))}
        {!customer?.addresses.length && (
          <Typography color="gray" fontSize={14}>
            Nenhum endereço cadastrado.
          </Typography>
        )}
      </Box>

      <Box width="100%" display="flex" justifyContent={'flex-end'}>
        <Button variant="contained" onClick={() => setNewAddressModal(true)}>
          Novo endereço
        </Button>
      </Box>

      <DeleteAddressModal isOpen={deleteModalIsOpen} onClose={() => setDeleteModalIsOpen(false)} addressUid={addressUid} />
      <EditAddressModal
        customer={customer}
        addressUid={addressUid}
        isOpen={editAddressModal}
        setCustomer={setCustomer}
        onClose={() => setEditAddressModal(false)}
      />
      <NewAddressModal customer={customer} isOpen={newAddressModal} onClose={() => setNewAddressModal(false)} setCustomer={setCustomer} />
    </>
  )
}
