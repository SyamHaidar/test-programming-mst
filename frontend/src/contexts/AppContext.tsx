import { ReactNode } from 'react'
import CustomerProvider from './CustomerContext'
import ProductProvider from './ProductContext'
import TransactionProvider from './TransactionContext'

// ----------------------------------------------------------------------

interface AppContextProps {
  children: ReactNode
}

export default function AppContext({ children }: AppContextProps) {
  return (
    <ProductProvider>
      <CustomerProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </CustomerProvider>
    </ProductProvider>
  )
}
