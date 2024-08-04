export const CurrencyFormat = (value: number) => {
  const currency = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 3,
  })

  return currency.format(value)
}

export const GenerateTransactionCode = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const prefix = `${year}${month}`
  const randomPart = Math.floor(100000 + Math.random() * 900000)

  return `${prefix}-${randomPart}`
}
