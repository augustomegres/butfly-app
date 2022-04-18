interface Row {
  [field: string]: any
}

interface Column {
  field: string
  label: string
  type?: 'date' | 'datetime' | 'currency' | 'string'
  align?: 'left' | 'right' | 'center'
  hidden?: boolean
}

export { Row, Column }
