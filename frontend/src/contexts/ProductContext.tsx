import { ChangeEvent, createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductAPI } from '../services'
import { ProductListProps, ProductRequestProps } from '../types'

// ----------------------------------------------------------------------

interface ProductContextProps {
  productList: ProductListProps[]
  productForm: ProductRequestProps
  errorMessage: ProductRequestProps
  getAllProduct: () => Promise<void>
  createProduct: () => Promise<void>
  handleProductForm: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ProductContext = createContext<ProductContextProps | null>(null)

// ----------------------------------------------------------------------

interface ProductProviderProps {
  children: ReactNode
}

export default function ProductProvider({ children }: ProductProviderProps) {
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const [productForm, setProductForm] = useState({ name: '', price: '' })
  const [errorMessage, setErrorMessage] = useState({ name: '', price: '' })

  const handleProductForm = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const getAllProduct = async () => {
    try {
      const { data } = await ProductAPI.getAllProduct()
      setProductList(data)
    } catch (error) {
      throw new Error('Get product failed:' + error)
    }
  }

  const createProduct = async () => {
    // validate
    const errors = { name: '', price: '' }
    if (!productForm.name) {
      errors.name = '* Nama tidak boleh kosong.'
    }
    if (!/^\d+$/.test(productForm.price)) {
      errors.price = '* Harga tidak valid.'
    }
    if (errors.name || errors.price) {
      setErrorMessage(errors)
      return
    }

    try {
      await ProductAPI.createProduct(productForm)
      navigate(`/product`, { replace: true })
    } catch (error) {
      throw new Error('Create product failed:' + error)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        productList,
        errorMessage,
        getAllProduct,
        createProduct,
        handleProductForm,
        productForm,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within an ProductProvider')
  }
  return context
}
