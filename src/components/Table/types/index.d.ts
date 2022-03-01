interface Row {
  [field: string]: string | number
}

interface Column {
  field: string
  label: string
  type?: 'date' | 'datetime' | 'currency' | 'string'
  align?: 'left' | 'right' | 'center'
}