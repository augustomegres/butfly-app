import { Box, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ContentCard } from '../../components/ContentCard'
import { ApiInstance } from '../../services/axios'
import { AdditionalInfo } from './AdditionalInfo'
import { CheckoutContext } from './Contexts/CheckoutContext'
import { FinishTransaction } from './Modals/FinishTransaction'
import { NewProduct } from './NewProduct'
import { ProductList } from './ProductList'
import { AddressProps } from './types/address'
import { ProductListProps } from './types/products'

export function Checkout() {
  const { palette } = useTheme()
  const [products, setProducts] = useState<ProductListProps[]>([])
  const [customer, setCustomer] = useState<{ name: string } | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductListProps | null>(null)
  const [address, setAddress] = useState<AddressProps | null>(null)
  const [step, setStep] = useState<number>(1)
  const [useAddress, setUseAddress] = useState(false)
  const [useCustomer, setUseCustomer] = useState(false)
  const [finishModal, setFinishModal] = useState(false)

  function addProduct(data: ProductListProps) {
    if (products.find(product => product.product.uid === data.product.uid))
      return toast.error('O produto informado já foi adicionado a lista, edite ou remova o produto já existente.')
    setProducts([...products, data])
  }

  function removeProduct(id: string) {
    const newProductsArray = products.filter(({ product }) => product.uid !== id)
    setProducts(newProductsArray)
  }

  function updateProduct(index: number, newData: ProductListProps) {
    const newProductsArray = products
    newProductsArray[index] = newData
    setProducts(newProductsArray)
  }

  function handleReset() {
    setProducts([])
    setCustomer(null)
    setSelectedProduct(null)
    setAddress(null)
    setStep(1)
    setUseAddress(false)
    setUseCustomer(false)
    setFinishModal(false)
  }

  const handleSubmitCheckout = () =>
    ApiInstance.post('/sales', {
      products,
      address: useAddress ? address : null,
      customer: useCustomer ? customer : null
    })

  return (
    <CheckoutContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateProduct,
        selectedProduct,
        setSelectedProduct,
        step,
        setStep,
        useAddress,
        setUseAddress,
        address,
        setAddress,
        handleSubmitCheckout,
        useCustomer,
        setUseCustomer,
        customer,
        setCustomer,
        handleReset
      }}
    >
      <Box>
        <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
          Frente de caixa
        </Typography>
        <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
          Mais agilidade na venda de seus produtos 🕺
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} pb={{ xs: 16, md: 0 }} mt={3} height="100%">
        {step === 1 && (
          <ContentCard flex={{ xs: 1, md: 0.5 }} mr={{ xs: 0, lg: 2 }}>
            <NewProduct />
          </ContentCard>
        )}

        {step === 2 && (
          <ContentCard flex={{ xs: 1, md: 0.5 }} mr={{ xs: 0, lg: 2 }}>
            <AdditionalInfo />
            <FinishTransaction open={finishModal} setOpen={setFinishModal} />
          </ContentCard>
        )}

        <ContentCard display="flex" flexDirection="column" flex={{ xs: 1, lg: 0.5 }} mt={{ xs: 2, lg: 0 }} boxSizing="border-box">
          <ProductList sx={{ flexBasis: '100%', flexGrow: 1 }} finishModal={setFinishModal} />
        </ContentCard>
      </Box>
    </CheckoutContext.Provider>
  )
}
