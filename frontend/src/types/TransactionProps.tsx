export interface TransactionListProps {
  code: string
  date: string
  custId: string
  totalProduct: string
  subtotal: string
  discount: string
  shippingPrice: string
  totalPayment: string
}

export interface TransactionListResponseProps {
  id: string
  code: string
  date: string
  customerName: string
  quantity: string
  subtotal: string
  discount: string
  shippingPrice: string
  totalPayment: string
}

export interface TransactionRequestProductsProps {
  id: string
  code: string
  name: string
  quantity: number | string
  priceBeforeDiscount: number | string
  discountPercent: number | string
  discountValue: number | string
  priceAfterDiscount: number | string
  totalPrice: number | string
}

export interface TransactionRequestProps {
  transactionCode: string
  transactionDate: string
  custId: string
  custCode: string
  custName: string
  custPhone: string
  products: TransactionRequestProductsProps[]
  discount: number | string
  shippingPrice: number | string
  subtotal: number | string
  totalPayment: number | string
}
