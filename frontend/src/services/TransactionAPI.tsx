import { ClientAPI as client } from '../configs'
import { TransactionRequestProps } from '../types/TransactionProps'

// ----------------------------------------------------------------------

const ROUTE = '/transaction'

const TranscationAPI = {
  getTransactions() {
    return client.get(ROUTE)
  },

  createTransaction(props: TransactionRequestProps) {
    const formData = new FormData()

    formData.append('transactionCode', props.transactionCode || '0001')
    formData.append('transactionDate', props.transactionDate)
    formData.append('custId', props.custId)

    props.products.forEach((product, index) => {
      formData.append(`products[${index}].id`, product.id)
      formData.append(`products[${index}].quantity`, product.quantity.toString())
      formData.append(`products[${index}].priceBeforeDiscount`, product.priceBeforeDiscount.toString())
      formData.append(`products[${index}].discountPercent`, product.discountPercent?.toString() || '0') // Fixed typo
      formData.append(`products[${index}].discountValue`, product.discountValue?.toString() || '0') // Fixed typo
      formData.append(`products[${index}].priceAfterDiscount`, product.priceAfterDiscount.toString())
      formData.append(`products[${index}].totalPrice`, product.totalPrice.toString())
    })

    formData.append('discount', props.discount.toString())
    formData.append('shippingPrice', props.shippingPrice.toString())
    formData.append('subtotal', props.subtotal.toString())
    formData.append('totalPayment', props.totalPayment.toString())

    return client.post(ROUTE, formData)
  },
}

export default TranscationAPI
