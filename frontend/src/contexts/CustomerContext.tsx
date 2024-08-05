import { ChangeEvent, createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomerAPI } from '../services'
import { CustomerListProps, CustomerRequestProps } from '../types'

// ----------------------------------------------------------------------

interface CustomerContextProps {
  customerList: CustomerListProps[]
  customerForm: CustomerRequestProps
  errorMessage: CustomerRequestProps
  getAllCustomer: () => Promise<void>
  createCustomer: () => Promise<void>
  handleCustomerForm: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomerContext = createContext<CustomerContextProps | null>(null)

// ----------------------------------------------------------------------

interface CustomerProviderProps {
  children: ReactNode
}

export default function CustomerProvider({ children }: CustomerProviderProps) {
  const navigate = useNavigate()
  // state
  const [customerList, setCustomerList] = useState([])
  const [customerForm, setCustomerForm] = useState({ name: '', phoneNumber: '' })
  const [errorMessage, setErrorMessage] = useState({ name: '', phoneNumber: '' })

  // handle
  const handleCustomerForm = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value })
  }

  // API
  const getAllCustomer = async () => {
    try {
      const { data } = await CustomerAPI.getAllCustomer()
      setCustomerList(data)
    } catch (error) {
      throw new Error('Get customer failed:' + error)
    }
  }

  const createCustomer = async () => {
    // validate
    const errors = { name: '', phoneNumber: '' }
    if (!customerForm.name) {
      errors.name = '* Nama tidak boleh kosong.'
    }
    if (
      !/^\d+$/.test(customerForm.phoneNumber) ||
      customerForm.phoneNumber.length < 10 ||
      customerForm.phoneNumber.length > 15
    ) {
      errors.phoneNumber = '* Nomor telepon tidak valid.'
    }
    if (errors.name || errors.phoneNumber) {
      setErrorMessage(errors)
      return
    }

    try {
      await CustomerAPI.createProduct(customerForm)
      navigate(`/customer`, { replace: true })
    } catch (error) {
      throw new Error('Create product failed:' + error)
    }
  }

  return (
    <CustomerContext.Provider
      value={{
        customerList,
        customerForm,
        errorMessage,
        getAllCustomer,
        createCustomer,
        handleCustomerForm,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('useCustomer must be used within an CustomerProvider')
  }
  return context
}
