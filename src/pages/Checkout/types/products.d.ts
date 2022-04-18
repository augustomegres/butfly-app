export interface ProductProps {
  uid: string
  name: string
  quantity: string
  price: number
  category: {
    name: string
  }
}

export interface ProductListProps {
  product: ProductProps
  amount: number | undefined
  quantity: number | undefined
  discount: number | undefined
  discountType: 'percentage' | 'money'
}
