import { ClientAPI as client } from '../configs'
import { CustomerRequestProps } from '../types'

// ----------------------------------------------------------------------

const ROUTE = '/customer'

const CustomerAPI = {
  getAllCustomer() {
    return client.get(ROUTE)
  },

  createProduct(props: CustomerRequestProps) {
    const formData = new FormData()

    formData.append('name', props.name)
    formData.append('phoneNumber', props.phoneNumber)

    return client.post(ROUTE, formData)
  },
}

export default CustomerAPI
