import { ChangeEvent, createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionAPI } from '../services'
import { CustomerListProps, TransactionRequestProps } from '../types'
import {
  TransactionListResponseProps,
  TransactionRequestMessageProps,
  TransactionRequestProductsProps,
} from '../types/TransactionProps'
import { GenerateTransactionCode } from '../utils'

// ----------------------------------------------------------------------

interface TransactionContextProps {
  transactionList: TransactionListResponseProps[]
  transactionForm: TransactionRequestProps
  errorMessage: TransactionRequestMessageProps
  getAllTransaction: () => Promise<void>
  createTransaction: (transaction: TransactionRequestProps) => Promise<void>
  handleTransactionForm: (e: ChangeEvent<HTMLInputElement>) => void
  handleCustomerSelect: (customer: CustomerListProps) => void
  handleAddProduct: (product: TransactionRequestProductsProps) => void
  handleEditProduct: (index: number, product: TransactionRequestProductsProps) => void
  handleDeleteProduct: (index: number) => void
}

export const TransactionContext = createContext<TransactionContextProps | null>(null)

// ----------------------------------------------------------------------

interface TransactionProviderProps {
  children: ReactNode
}

export default function TransactionProvider({ children }: TransactionProviderProps) {
  const navigate = useNavigate()
  const [transactionList, setTransactionList] = useState([])
  const [transactionForm, setTransactionForm] = useState<TransactionRequestProps>({
    transactionCode: GenerateTransactionCode(),
    transactionDate: '',
    custId: '',
    custCode: '',
    custName: '',
    custPhone: '',
    products: [],
    discount: '',
    shippingPrice: '',
    subtotal: '',
    totalPayment: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    transactionCode: '',
    transactionDate: '',
    custId: '',
    discount: '',
    shippingPrice: '',
  })

  // handle transaction
  const handleTransactionForm = (e: ChangeEvent<HTMLInputElement>) => {
    setTransactionForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  // handle customer
  const handleCustomerSelect = (customer: CustomerListProps) => {
    setTransactionForm((prevState) => ({
      ...prevState,
      custId: customer.id,
      custCode: customer.code,
      custName: customer.name,
      custPhone: customer.phoneNumber,
    }))
  }

  // handle product
  const handleAddProduct = (product: TransactionRequestProductsProps) => {
    setTransactionForm((prevState) => ({
      ...prevState,
      products: [...prevState.products, product],
    }))
  }

  const handleEditProduct = (index: number, updatedProduct: TransactionRequestProductsProps) => {
    const updatedProducts = transactionForm.products.map((product, i) => (i === index ? updatedProduct : product))
    setTransactionForm((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }))
  }

  const handleDeleteProduct = (index: number) => {
    const newProducts = transactionForm.products.filter((_, i) => i !== index)
    setTransactionForm({
      ...transactionForm,
      products: newProducts,
    })
  }

  // API
  const getAllTransaction = async () => {
    try {
      const { data } = await TransactionAPI.getTransactions()
      setTransactionList(data)
    } catch (error) {
      throw new Error('Get transaction failed')
    }
  }

  const createTransaction = async () => {
    // validate
    const errors = {
      transactionCode: '',
      transactionDate: '',
      custId: '',
      discount: '',
      shippingPrice: '',
    }
    if (!transactionForm.transactionCode) {
      errors.transactionCode = '* No transaksi tidak boleh kosong.'
    }
    if (!transactionForm.transactionDate) {
      errors.transactionDate = '* Tanggal tidak valid.'
    }
    if (!transactionForm.custId) {
      errors.custId = '* Customer tidak boleh kosong.'
    }
    if (!/^\d+$/.test(transactionForm.discount.toString())) {
      errors.discount = '* Harga diskon tidak valid.'
    }
    if (!/^\d+$/.test(transactionForm.shippingPrice.toLocaleString())) {
      errors.shippingPrice = '* Harga ongkir tidak valid.'
    }
    if (errors.transactionCode || errors.transactionDate || errors.custId || errors.discount || errors.shippingPrice) {
      setErrorMessage(errors)
      return
    }

    try {
      await TransactionAPI.createTransaction(transactionForm)
      navigate(`/transaction`, { replace: true })
    } catch (error) {
      throw new Error('Create transaction failed: ' + error)
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactionList,
        transactionForm,
        errorMessage,
        getAllTransaction,
        createTransaction,
        handleTransactionForm,
        handleCustomerSelect,
        handleAddProduct,
        handleDeleteProduct,
        handleEditProduct,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransaction must be used within an TransactionProvider')
  }
  return context
}
