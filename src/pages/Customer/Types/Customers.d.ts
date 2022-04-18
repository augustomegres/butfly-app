import React from 'react'

interface RawCustomers {
  uid: number
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
}

interface FormattedCustomers {
  name: string
  email: string
  phone: string
  createdAt: string
  contact: JSX.Element
}

export { FormattedCustomers, RawCustomers }
