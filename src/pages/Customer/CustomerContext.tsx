import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { CustomerType } from '../../types/GlobalProps'

export const CustomerContext = createContext<{ customer: CustomerType; setCustomer: Dispatch<SetStateAction<any>> }>({
  customer: { addresses: [], createdAt: new Date(), observations: '', phones: [], name: '', email: '', surname: '', uid: '' },
  setCustomer: () => {}
})

export function CustomerProvider({ children }: { children: any }) {
  const [customer, setCustomer] = useState<CustomerType>({
    uid: '',
    name: '',
    email: '',
    surname: '',
    addresses: [],
    createdAt: new Date(),
    observations: '',
    phones: []
  })
  return <CustomerContext.Provider value={{ customer, setCustomer }}>{children}</CustomerContext.Provider>
}
