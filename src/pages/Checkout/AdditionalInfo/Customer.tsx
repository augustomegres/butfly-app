import { Box } from '@mui/material'
import { useTheme } from '@mui/system'
import { SyntheticEvent, useContext, useState } from 'react'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { AsyncAutoComplete } from '../../../components/AsyncAutoComplete'
import { ApiInstance } from '../../../services/axios'

export function Customer() {
  const { palette } = useTheme()
  const [customers, setCustomers] = useState([])
  const [customerLoading, setCustomerLoading] = useState(false)
  const { customer, setCustomer } = useContext(CheckoutContext)

  async function fetchCustomers(event: SyntheticEvent<Element, Event>, value: string) {
    setCustomerLoading(true)
    await ApiInstance.get(`customers`, { params: { name: value } })
      .then(response => {
        setCustomers(response.data.rows)
        setCustomerLoading(false)
      })
      .catch(() => {
        setCustomerLoading(false)
      })
  }

  return (
    <Box p={1}>
      <AsyncAutoComplete
        isRequired
        label="Cliente"
        name="client"
        data={customers}
        setData={setCustomers}
        value={customer}
        onChange={setCustomer}
        fetchData={fetchCustomers}
      />
    </Box>
  )
}
