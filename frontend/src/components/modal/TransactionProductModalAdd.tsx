import { ChangeEvent, useEffect, useState } from 'react'
import { useTransaction } from '../../contexts'
import { Button, Modal, Stack, TextField, Typography } from '../../theme'
import { ProductListProps } from '../../types'
import ModalOverlay from './ModalOverlay'
import TransactionSelectProductModal from './TransactionSelectProductModal'

// ----------------------------------------------------------------------

interface TransactionProductModalAddProps {
  isOpen?: any
  isEditing?: boolean
  editingProductIndex?: number
}

export default function TransactionProductModalAdd({
  isOpen,
  isEditing = false,
  editingProductIndex,
}: TransactionProductModalAddProps) {
  const { handleProduct, handleEditProduct } = useTransaction()
  const [productForm, setProductForm] = useState({
    id: '',
    code: '',
    name: '',
    quantity: 1,
    priceBeforeDiscount: 0,
    discountPercent: 0,
    discountValue: 0,
    priceAfterDiscount: 0,
    totalPrice: 0,
  })

  // add product modal toggle
  const [openProductModal, setOpenProductModal] = useState(false)
  const isOpenProductModal = () => setOpenProductModal(!openProductModal)

  const handleProductFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const handleProductFormSave = () => {
    const product = {
      id: productForm.id,
      code: productForm.code,
      name: productForm.name,
      quantity: productForm.quantity,
      priceBeforeDiscount: productForm.priceBeforeDiscount,
      discountPercent: productForm.discountPercent || 0,
      discountValue: productForm.discountValue || 0,
      priceAfterDiscount: productForm.priceAfterDiscount,
      totalPrice: productForm.totalPrice,
    }
    if (isEditing) {
      handleEditProduct(Number(editingProductIndex), product)
    } else {
      handleProduct(product)
    }
    handleClose()
  }

  const handleClose = () => {
    setProductForm({
      id: '',
      code: '',
      name: '',
      quantity: 1,
      priceBeforeDiscount: 0,
      discountPercent: 0,
      discountValue: 0,
      priceAfterDiscount: 0,
      totalPrice: 0,
    })
    isOpen(false)
  }

  const handleProductSelect = (product: ProductListProps) => {
    setProductForm((prevState) => ({
      ...prevState,
      id: product.id,
      code: product.code,
      name: product.name,
    }))
    isOpenProductModal() // Close the modal after selection
  }

  useEffect(() => {
    const priceBeforeDiscount = productForm.priceBeforeDiscount || 0
    const discountPercent = productForm.discountPercent || 0
    const discountValue = (priceBeforeDiscount * discountPercent) / 100
    const priceAfterDiscount = priceBeforeDiscount - discountValue
    setProductForm((prevState) => ({
      ...prevState,
      discountValue: discountValue,
      priceAfterDiscount: priceAfterDiscount,
      totalPrice: priceAfterDiscount * (productForm.quantity || 1),
    }))
  }, [productForm.priceBeforeDiscount, productForm.discountPercent, productForm.quantity])

  return (
    <>
      <ModalOverlay isModalShow={isOpen}>
        <Modal width="520">
          <Stack alignItems="center" sx={{ height: '56px', padding: '0 16px' }}>
            <Typography as="h2" text="Tambah produk" size="18" weight="700" color="primary" />
          </Stack>
          <Stack direction="column" spacing="16" sx={{ padding: '16px' }}>
            <TextField
              onClick={isOpenProductModal}
              label="Kode Produk"
              type="text"
              name="id"
              value={productForm.code}
              onChange={handleProductFormChange}
              readOnly
            />
            {productForm.code && (
              <TextField
                label="Nama"
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductFormChange}
              />
            )}
            <TextField
              label="Quantity"
              type="text"
              name="quantity"
              value={productForm.quantity}
              onChange={handleProductFormChange}
            />
            <TextField
              label="Harga Bandrol"
              type="text"
              name="priceBeforeDiscount"
              value={productForm.priceBeforeDiscount}
              onChange={handleProductFormChange}
            />
            <TextField
              label="Diskon (%)"
              type="number"
              name="discountPercent"
              value={productForm.discountPercent}
              onChange={handleProductFormChange}
            />
            <TextField
              label="Diskon (Rp)"
              type="text"
              name="discountValue"
              value={productForm.discountValue}
              onChange={handleProductFormChange}
              disabled
            />
            <TextField
              label="Harga Diskon"
              type="number"
              name="priceAfterDiscount"
              value={productForm.priceAfterDiscount}
              onChange={handleProductFormChange}
              disabled
            />
            <TextField
              label="Total Harga"
              type="text"
              name="totalPrice"
              value={productForm.totalPrice}
              onChange={handleProductFormChange}
              disabled
            />
            <Stack justifyContent="flex-end" spacing="16" sx={{ marginTop: '32px' }}>
              <Button onClick={isOpen} text="Batal" variant="light-secondary" />
              <Button onClick={handleProductFormSave} text="Simpan" variant="secondary" />
            </Stack>
          </Stack>
        </Modal>
      </ModalOverlay>

      {openProductModal && (
        <TransactionSelectProductModal isOpen={isOpenProductModal} handleProductSelect={handleProductSelect} />
      )}
    </>
  )
}
