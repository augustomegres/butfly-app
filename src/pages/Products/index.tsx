import { PageContainer } from 'components/PageContainer'
import { ProductsTable } from './ProductsTable'

export function Products() {
  return (
    <PageContainer mainText="Produtos" secondaryText="Aqui você encontra tudo o que precisa para gerenciar seus produtos.">
      <ProductsTable />
    </PageContainer>
  )
}
