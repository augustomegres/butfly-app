import { format } from "date-fns"

const dateFormat = (value?: string | number) => {
  if (!value) return '-'
  return `${format(new Date(value), 'dd/MM/yyyy')}`
}

export { dateFormat }