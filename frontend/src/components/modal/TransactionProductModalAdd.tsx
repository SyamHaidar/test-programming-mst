import { ChangeEvent, useEffect, useState } from 'react'
import { useTransaction } from '../../contexts'
import { Button, Modal, Stack, TextField, theme, Typography } from '../../theme'
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
  //context
  const { handleAddProduct, handleEditProduct } = useTransaction()
  // state
  const [productForm, setProductForm] = useState({
    id: '',
    code: '',
    name: '',
    quantity: '',
    priceBeforeDiscount: '',
    discountPercent: '',
    discountValue: '',
    priceAfterDiscount: '',
    totalPrice: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    code: '',
    quantity: '',
    priceBeforeDiscount: '',
    discountPercent: '',
  })

  // add product modal toggle
  const [openProductModal, setOpenProductModal] = useState(false)
  const isOpenProductModal = () => setOpenProductModal(!openProductModal)

  // handle
  const handleProductFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const handleProductFormSave = () => {
    // validate
    const errors = {
      code: '',
      quantity: '',
      priceBeforeDiscount: '',
      discountPercent: '',
    }
    if (!productForm.code) {
      errors.code = '* Kode produk tidak boleh kosong.'
    }
    if (!productForm.quantity) {
      errors.quantity = '* Jumlah barang tidak valid.'
    }
    if (!productForm.priceBeforeDiscount && !/^\d+$/.test(productForm.priceBeforeDiscount.toString())) {
      errors.priceBeforeDiscount = '* Harga bandrol tidak valid.'
    }
    if (!productForm.discountPercent && !/^\d+$/.test(productForm.discountPercent.toString())) {
      errors.discountPercent = '* Harga diskon tidak valid.'
    }
    if (errors.code || errors.quantity || errors.priceBeforeDiscount || errors.discountPercent) {
      setErrorMessage(errors)
      return
    }

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
      handleAddProduct(product)
    }

    handleClose()
  }

  const handleClose = () => {
    setProductForm({
      id: '',
      code: '',
      name: '',
      quantity: '',
      priceBeforeDiscount: '',
      discountPercent: '',
      discountValue: '',
      priceAfterDiscount: '',
      totalPrice: '',
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
    isOpenProductModal()
  }

  // other
  useEffect(() => {
    const priceBeforeDiscount = productForm.priceBeforeDiscount || '0'
    const discountPercent = productForm.discountPercent || '0'
    const discountValue = (Number(priceBeforeDiscount) * Number(discountPercent)) / 100
    const priceAfterDiscount = Number(priceBeforeDiscount) - discountValue
    setProductForm((prevState) => ({
      ...prevState,
      discountValue: discountValue.toString(),
      priceAfterDiscount: priceAfterDiscount.toString(),
      totalPrice: (priceAfterDiscount * (Number(productForm.quantity) || 1)).toString(),
    }))
  }, [productForm.priceBeforeDiscount, productForm.discountPercent, productForm.quantity])

  return (
    <>
      <ModalOverlay isModalShow={isOpen}>
        <Modal width="520">
          <Stack alignItems="center" sx={{ height: '56px', padding: '0 16px' }}>
            <Typography as="h2" text="Tambah produk" size="18" weight="700" color="primary" />
          </Stack>
          <Stack direction="column" spacing="20" sx={{ padding: '16px' }}>
            <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
              <TextField
                onClick={isOpenProductModal}
                label="Kode Produk"
                type="text"
                name="id"
                value={productForm.code}
                onChange={handleProductFormChange}
                readOnly
              />
              {errorMessage.code && (
                <Typography size="12" hexColor={theme.palette.color.danger.default}>
                  {errorMessage.code}
                </Typography>
              )}
            </Stack>
            {productForm.code && (
              <TextField
                label="Nama"
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductFormChange}
              />
            )}
            <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
              <TextField
                label="Quantity"
                type="text"
                name="quantity"
                value={productForm.quantity}
                onChange={handleProductFormChange}
              />
              {errorMessage.quantity && (
                <Typography size="12" hexColor={theme.palette.color.danger.default}>
                  {errorMessage.quantity}
                </Typography>
              )}
            </Stack>
            <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
              <TextField
                label="Harga Bandrol"
                type="text"
                name="priceBeforeDiscount"
                value={productForm.priceBeforeDiscount}
                onChange={handleProductFormChange}
              />
              {errorMessage.priceBeforeDiscount && (
                <Typography size="12" hexColor={theme.palette.color.danger.default}>
                  {errorMessage.priceBeforeDiscount}
                </Typography>
              )}
            </Stack>
            <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
              <TextField
                label="Diskon (%)"
                type="text"
                name="discountPercent"
                value={productForm.discountPercent}
                onChange={handleProductFormChange}
              />
              {errorMessage.discountPercent && (
                <Typography size="12" hexColor={theme.palette.color.danger.default}>
                  {errorMessage.discountPercent}
                </Typography>
              )}
            </Stack>
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
