import { useEffect, useState } from 'react'
import { PageWrapper, Table, TransactionProductModalAdd, TransactionSelectCustomerModal } from '../../components'
import { useTransaction } from '../../contexts'
import { Box, Button, Card, Container, Divider, Stack, SvgIcon, TextField, theme, Typography } from '../../theme'
import { CurrencyFormat } from '../../utils'

// ----------------------------------------------------------------------

export default function AddTransactionPage() {
  // context
  const { handleTransactionForm, createTransaction, transactionForm, errorMessage, handleDeleteProduct } =
    useTransaction()

  // add product modal toggle
  const [openProductModal, setOpenProductModal] = useState(false)
  const isOpenProductModal = () => setOpenProductModal(!openProductModal)

  // add customer modal toggle
  const [openCustomerModal, setOpenCustomerModal] = useState(false)
  const isOpenCustomerModal = () => setOpenCustomerModal(!openCustomerModal)

  // Edit product state
  const [isEditing, setIsEditing] = useState(false)
  const [editingProductIndex, setEditingProductIndex] = useState<number>()

  // handle
  const handleProductEdit = (index: number) => {
    setEditingProductIndex(index)
    setIsEditing(true)
    isOpenProductModal()
  }

  // other
  const productTableHead = [
    { name: 'No' },
    { name: 'Kode Barang' },
    { name: 'Nama Barang' },
    { name: 'Qty' },
    { name: 'Harga Bandrol' },
    { name: 'Diskon (%)' },
    { name: 'Diskon (Rp)' },
    { name: 'Harga Diskon' },
    { name: 'Total' },
    { name: 'Aksi' },
  ]

  useEffect(() => {
    const subtotal = transactionForm.products.reduce((acc, product) => acc + Number(product.totalPrice), 0)
    const discount = Number(transactionForm.discount)
    const shippingPrice = Number(transactionForm.shippingPrice)
    const totalPayment = subtotal - discount + shippingPrice

    handleTransactionForm({ target: { name: 'subtotal', value: subtotal.toString() } } as any)
    handleTransactionForm({ target: { name: 'totalPayment', value: totalPayment.toString() } } as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionForm.products, transactionForm.discount, transactionForm.shippingPrice])

  return (
    <>
      <PageWrapper>
        <Container>
          <Box sx={{ marginTop: '32px' }}>
            <Typography size="24" weight="600" color="primary">
              Tambah Transaksi
            </Typography>

            <Card variant="outline" sx={{ marginTop: '32px', padding: '0' }}>
              <Box sx={{ padding: '16px' }}>
                <Typography color="primary" weight="500">
                  Form transaksi
                </Typography>
              </Box>

              <Divider />

              {/* transaction */}
              <Stack direction="column" spacing="20" sx={{ padding: '16px' }}>
                <Card variant="outline">
                  <Stack direction="column" spacing="16">
                    <Typography size="12" weight="700" color="disabled">
                      TRANSAKSI
                    </Typography>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        label="No Transaksi"
                        type="text"
                        name="transactionCode"
                        value={transactionForm.transactionCode}
                        onChange={handleTransactionForm}
                        disabled
                      />
                      {errorMessage.transactionCode && (
                        <Typography size="12" hexColor={theme.palette.color.danger.default}>
                          {errorMessage.transactionCode}
                        </Typography>
                      )}
                    </Stack>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        label="Tanggal"
                        type="date"
                        name="transactionDate"
                        value={transactionForm.transactionDate}
                        onChange={handleTransactionForm}
                      />
                      {errorMessage.transactionDate && (
                        <Typography size="12" hexColor={theme.palette.color.danger.default}>
                          {errorMessage.transactionDate}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Card>

                {/* customer */}
                <Card variant="outline">
                  <Stack direction="column" spacing="20">
                    <Typography size="12" weight="700" color="disabled">
                      CUSTOMER
                    </Typography>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        onClick={isOpenCustomerModal}
                        label="Kode Customer"
                        type="text"
                        name="custId"
                        value={transactionForm.custCode}
                        onChange={handleTransactionForm}
                        readOnly
                        sx={{ '&:hover': { cursor: 'pointer !important' } }}
                      />
                      {errorMessage.custId && (
                        <Typography size="12" hexColor={theme.palette.color.danger.default}>
                          {errorMessage.custId}
                        </Typography>
                      )}
                    </Stack>
                    {transactionForm.custId && (
                      <>
                        <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                          <TextField label="Nama" type="text" value={transactionForm.custName} disabled />
                        </Stack>
                        <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                          <TextField label="No Telepon" type="text" value={transactionForm.custPhone} disabled />
                        </Stack>
                      </>
                    )}
                  </Stack>
                </Card>

                {/* product */}
                <Card variant="outline">
                  <Stack direction="column" spacing="20">
                    <Stack justifyContent="space-between" alignItems="center">
                      <Typography size="12" weight="700" color="disabled">
                        PRODUK
                      </Typography>

                      <Stack
                        onClick={isOpenProductModal}
                        alignItems="center"
                        spacing="4"
                        sx={{
                          height: '24px',
                          padding: '0 8px',
                          background: theme.palette.color.secondary.default,
                          borderRadius: theme.size.radius.full,
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <SvgIcon icon="add" color="white" />
                        <Typography size="12" hexColor="#fff">
                          Tambah
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* product list */}
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <Table head={productTableHead} data={transactionForm.products}>
                        {transactionForm.products.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.code}</td>
                            <td>{data.name}</td>
                            <td>{data.quantity}</td>
                            <td>{CurrencyFormat(Number(data.priceBeforeDiscount))}</td>
                            <td>{data.discountPercent} %</td>
                            <td>{CurrencyFormat(Number(data.discountValue))}</td>
                            <td>{CurrencyFormat(Number(data.priceAfterDiscount))}</td>
                            <td>{CurrencyFormat(Number(data.totalPrice))}</td>
                            <td>
                              <Stack spacing="8">
                                <Stack
                                  onClick={() => handleProductEdit(index)}
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                    height: '40px',
                                    width: '40px',
                                    background: theme.palette.color.secondary.light,
                                    borderRadius: theme.size.radius.sm,
                                  }}
                                >
                                  <SvgIcon icon="edit" color="black" />
                                </Stack>
                                <Stack
                                  onClick={() => handleDeleteProduct(index)}
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                    height: '40px',
                                    width: '40px',
                                    background: theme.palette.color.danger.light,
                                    borderRadius: theme.size.radius.sm,
                                  }}
                                >
                                  <SvgIcon icon="trash" color="red" />
                                </Stack>
                              </Stack>
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </Stack>
                  </Stack>
                </Card>

                {/* detail */}
                <Card variant="outline">
                  <Stack direction="column" spacing="20">
                    <Typography size="12" weight="700" color="disabled">
                      DETAIL
                    </Typography>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        label="Subtotal"
                        type="text"
                        name="subtotal"
                        value={CurrencyFormat(Number(transactionForm.subtotal))}
                        onChange={handleTransactionForm}
                        disabled
                      />
                    </Stack>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        label="Diskon"
                        type="text"
                        name="discount"
                        value={transactionForm.discount}
                        onChange={handleTransactionForm}
                      />
                      {errorMessage.discount && (
                        <Typography size="12" hexColor={theme.palette.color.danger.default}>
                          {errorMessage.discount}
                        </Typography>
                      )}
                    </Stack>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        label="Ongkir"
                        type="text"
                        name="shippingPrice"
                        value={transactionForm.shippingPrice}
                        onChange={handleTransactionForm}
                      />
                      {errorMessage.shippingPrice && (
                        <Typography size="12" hexColor={theme.palette.color.danger.default}>
                          {errorMessage.shippingPrice}
                        </Typography>
                      )}
                    </Stack>
                    <Stack direction="column" spacing="2" sx={{ width: '100%' }}>
                      <TextField
                        label="Total Harga"
                        type="text"
                        name="totalPayment"
                        value={CurrencyFormat(Number(transactionForm.totalPayment))}
                        onChange={handleTransactionForm}
                        disabled
                      />
                    </Stack>
                  </Stack>
                </Card>
              </Stack>

              <Box sx={{ padding: '16px' }}>
                <Stack justifyContent="end" spacing="8">
                  <Button text="Batal" variant="light-secondary" />
                  <Button text="Simpan" variant="secondary" onClick={createTransaction} />
                </Stack>
              </Box>
            </Card>
          </Box>
        </Container>
      </PageWrapper>

      {/* select customer modal */}
      {openCustomerModal && <TransactionSelectCustomerModal isOpen={isOpenCustomerModal} />}

      {/* add product */}
      {openProductModal && (
        <TransactionProductModalAdd
          isOpen={isOpenProductModal}
          isEditing={isEditing}
          editingProductIndex={editingProductIndex}
        />
      )}
    </>
  )
}
