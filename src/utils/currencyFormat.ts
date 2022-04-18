const currencyFormat = (value: number | undefined) => {
  if (!value) return `R$ 0,00`
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

export { currencyFormat }
