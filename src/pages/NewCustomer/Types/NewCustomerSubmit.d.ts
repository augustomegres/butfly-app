export interface NewCustomerSubmit {
  name: string
  surname?: string
  email?: string
  observation?: string
  address: {
    cep: string
    street: string
    number: string
    additionalInfo?: string
    neighborhood: string
    city: string
    state: string
  } | null
}
