import { ClientAPI as client } from '../configs'
import { ProductRequestProps } from '../types'

// ----------------------------------------------------------------------

const ROUTE = '/product'

const ProductAPI = {
  getAllProduct() {
    return client.get(ROUTE)
  },

  createProduct(props: ProductRequestProps) {
    const formData = new FormData()

    formData.append('name', props.name)
    formData.append('price', props.price)

    return client.post(ROUTE, formData)
  },
}

export default ProductAPI
