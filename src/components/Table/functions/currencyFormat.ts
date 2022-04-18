const currencyFormat = (value?: string | number) => {
  if (!value) return `R$ 0,00`
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`
}

export { currencyFormat }
