import { PageContainer } from 'components/PageContainer'
import React from 'react'
import { CustomerTable } from './CustomerTable'

export function Customer() {
  return (
    <PageContainer mainText="Clientes" secondaryText="Seus clientes">
      <CustomerTable />
    </PageContainer>
  )
}
