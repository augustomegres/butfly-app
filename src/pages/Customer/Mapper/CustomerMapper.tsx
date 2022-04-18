import { Box, IconButton, Tooltip } from '@mui/material'
import { IoLogoWhatsapp } from 'react-icons/io'
import { MdMail } from 'react-icons/md'
import { Router } from 'react-router-dom'
import { FormattedCustomers, RawCustomers } from '../Types/Customers'

export function CustomerMapper(data: RawCustomers[]): FormattedCustomers[] {
  const formattedData = data.map(customer => {
    const contact = (
      <Box sx={{ h: 200 }}>
        <Tooltip title="Whatsapp">
          <IconButton
            sx={{ color: '#25d366' }}
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              const phone = customer.phone.replace(/\D/, '')
              window.open(`https://api.whatsapp.com/send?phone=55${phone}`)
            }}
          >
            <IoLogoWhatsapp style={{ fontSize: 22 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Email">
          <IconButton sx={{ color: '#34B7F1' }}>
            <MdMail style={{ fontSize: 22 }} />
          </IconButton>
        </Tooltip>
      </Box>
    )
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      createdAt: customer.createdAt,
      contact: contact
    }
  })

  return formattedData
}
