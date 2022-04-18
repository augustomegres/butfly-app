import { AxiosResponse } from 'axios'
import { createContext } from 'react'
import { AddressProps } from '../types/address'
import { ProductListProps } from '../types/products'

interface CheckoutContext {
  products: ProductListProps[]
  useCustomer: boolean
  setUseCustomer: (useAddress: boolean) => void
  customer: { name: string } | null
  setCustomer: (customer: { name: string }) => void
  selectedProduct: ProductListProps | null
  addProduct: (data: ProductListProps) => void
  removeProduct: (id: string) => void
  updateProduct: (index: number, data: ProductListProps) => void
  setSelectedProduct: (product: ProductListProps) => void
  step: number
  setStep: (step: number) => void
  useAddress: boolean
  setUseAddress: (useAddress: boolean) => void
  address: AddressProps | null
  setAddress: (address: AddressProps | null) => void
  handleSubmitCheckout: () => Promise<AxiosResponse<any, any>>
  handleReset: () => void
}

export const CheckoutContext = createContext<CheckoutContext>({
  products: [],
  addProduct: data => void data,
  removeProduct: (id: string) => void id,
  updateProduct: (index: number, data: ProductListProps) => void index,
  selectedProduct: null,
  useCustomer: false,
  setUseCustomer: useCustomer => void useCustomer,
  customer: null,
  setCustomer: (customer: { name: string }) => void customer,
  setSelectedProduct: (product: ProductListProps) => void product,
  useAddress: false,
  setUseAddress: useAddress => void useAddress,
  address: null,
  setAddress: (address: AddressProps | null) => void address,
  handleSubmitCheckout: () => new Promise(() => {}),
  step: 1,
  setStep: (step: number) => void step,
  handleReset: () => void 0
})
