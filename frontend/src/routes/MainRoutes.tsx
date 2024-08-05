import { Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts'
import { AddCustomerPage, CustomerPage } from '../pages/customer'
import { AddProductPage, ProductPage } from '../pages/product'
import { AddTransactionPage, TransactionPage } from '../pages/transactions'

// ----------------------------------------------------------------------

const MainRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // navigate to default route
      { path: '/', element: <Navigate to="/transaction" />, index: true },
      {
        path: 'product',
        children: [
          { index: true, element: <ProductPage /> },
          { path: 'create', element: <AddProductPage /> },
        ],
      },
      {
        path: 'transaction',
        children: [
          { index: true, element: <TransactionPage /> },
          { path: 'create', element: <AddTransactionPage /> },
        ],
      },
      {
        path: 'customer',
        children: [
          { index: true, element: <CustomerPage /> },
          { path: 'create', element: <AddCustomerPage /> },
        ],
      },
    ],
  },
]

export default MainRoutes
