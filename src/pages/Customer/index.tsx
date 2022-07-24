import { Box, Tab, Tabs, useTheme } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CustomerType } from '../../types/GlobalProps'
import { PageContainer } from '../../components/PageContainer'
import { ApiInstance } from '../../services/axios'
import { CustomerContext } from './CustomerContext'
import AddressAndContact from './Tabs/AddressAndContract'

export default function Customer() {
  const { uid } = useParams()
  const [tab, setTab] = useState(0)
  const { palette } = useTheme()
  const { customer, setCustomer } = useContext(CustomerContext)
  const companyUid = localStorage.getItem('@Butfly:companyUid')
  useEffect(() => {
    async function fetchData() {
      const customer = await ApiInstance.get(`/companies/${companyUid}/customers/${uid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('@Butfly:token')}` }
      })
      setCustomer(customer.data)
    }
    fetchData()
  }, [uid])

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      <PageContainer mainText={customer?.name} secondaryText={customer?.email || ''}>
        <Box mt={3} mb={2}>
          <Tabs
            value={tab}
            TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
            sx={{
              '& .MuiTabs-indicator': { display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' },
              '& .MuiTabs-indicatorSpan': { maxWidth: '80%', width: '100%', background: palette.primary.main }
            }}
            onChange={(e, value) => setTab(value)}
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab style={{ borderRadius: 12 }} label="Resumo" />
            <Tab style={{ borderRadius: 12, overflow: 'hidden' }} label="Compras" />
            <Tab style={{ borderRadius: 12 }} label="Serviços" />
          </Tabs>

          <Box mt={3}>{tab === 0 && <AddressAndContact />}</Box>
        </Box>
      </PageContainer>
    </CustomerContext.Provider>
  )
}
