export interface RawProducts {
  id: string
  name: string
  amount: number
  quantity: number
  category?: {
    name: string
    icon: string
  }
  createdAt: string | number
}

export interface FormattedProducts {
  name: any
  amount: number
  quantity: number
  category?: string
  createdAt: string | number
}
