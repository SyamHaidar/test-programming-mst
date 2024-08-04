import { useEffect, useState } from 'react'
import { PageWrapper, Table } from '../../components'
import TransactionProductModalAdd from '../../components/modal/TransactionProductModalAdd'
import TransactionSelectCustomerModal from '../../components/modal/TransactionSelectCustomerModal'
import { useTransaction } from '../../contexts'
import { Box, Button, Card, Container, Divider, Stack, SvgIcon, TextField, theme, Typography } from '../../theme'
import { CurrencyFormat } from '../../utils'

// ----------------------------------------------------------------------

export default function AddTransactionPage() {
  const { handleTransactionForm, createTransaction, transactionForm, errorMessage, deleteProduct } = useTransaction()

  // add product modal toggle
  const [openProductModal, setOpenProductModal] = useState(false)
  const isOpenProductModal = () => setOpenProductModal(!openProductModal)

  // add product modal toggle
  const [openCustomerModal, setOpenCustomerModal] = useState(false)
  const isOpenCustomerModal = () => setOpenCustomerModal(!openCustomerModal)

  // Edit product state
  const [isEditing, setIsEditing] = useState(false)
  const [editingProductIndex, setEditingProductIndex] = useState<number>()

  const productTableHead = [
    { name: 'Ubah' },
    { name: 'Hapus' },
    { name: 'No' },
    { name: 'Kode Barang' },
    { name: 'Nama Barang' },
    { name: 'Qty' },
    { name: 'Harga Bandrol' },
    { name: 'Diskon (%)' },
    { name: 'Diskon (Rp)' },
    { name: 'Harga Diskon' },
    { name: 'Total' },
  ]

  const handleProductEdit = (index: number) => {
    setEditingProductIndex(index)
    setIsEditing(true)
    isOpenProductModal()
  }

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
              <Stack direction="column" spacing="16" sx={{ padding: '16px' }}>
                <Card variant="outline">
                  <Stack direction="column" spacing="16">
                    <Typography size="12" weight="700" color="disabled">
                      TRANSAKSI
                    </Typography>
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
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
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
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
                  <Stack direction="column" spacing="16">
                    <Typography size="12" weight="700" color="disabled">
                      CUSTOMER
                    </Typography>
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
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
                        <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                          <TextField label="Nama" type="text" value={transactionForm.custName} disabled />
                        </Stack>
                        <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                          <TextField label="No Telepon" type="text" value={transactionForm.custPhone} disabled />
                        </Stack>
                      </>
                    )}
                  </Stack>
                </Card>

                {/* product */}
                <Card variant="outline">
                  <Stack direction="column" spacing="16">
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

                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                      <Table head={productTableHead} data={transactionForm.products}>
                        {transactionForm.products.map((data, index) => (
                          <tr key={index}>
                            <td>
                              <Stack
                                onClick={() => handleProductEdit(index)}
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  height: '40px',
                                  width: '40px',
                                  background: theme.palette.color.secondary.light,
                                  borderRadius: theme.size.radius.full,
                                }}
                              >
                                <SvgIcon icon="edit" color="black" />
                              </Stack>
                            </td>
                            <td>
                              <Stack
                                onClick={() => deleteProduct(index)}
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  height: '40px',
                                  width: '40px',
                                  background: theme.palette.color.danger.light,
                                  borderRadius: theme.size.radius.full,
                                }}
                              >
                                <SvgIcon icon="trash" color="red" />
                              </Stack>
                            </td>
                            <td>{index + 1}</td>
                            <td>{data.code}</td>
                            <td>{data.name}</td>
                            <td>{data.quantity}</td>
                            <td>{CurrencyFormat(Number(data.priceBeforeDiscount))}</td>
                            <td>{data.discountPercent} %</td>
                            <td>{CurrencyFormat(Number(data.discountValue))}</td>
                            <td>{CurrencyFormat(Number(data.priceAfterDiscount))}</td>
                            <td>{CurrencyFormat(Number(data.totalPrice))}</td>
                          </tr>
                        ))}
                      </Table>
                    </Stack>
                  </Stack>
                </Card>

                {/* detail */}
                <Card variant="outline">
                  <Stack direction="column" spacing="16">
                    <Typography size="12" weight="700" color="disabled">
                      DETAIL
                    </Typography>
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                      <TextField
                        label="Subtotal"
                        type="text"
                        name="subtotal"
                        value={CurrencyFormat(Number(transactionForm.subtotal))}
                        onChange={handleTransactionForm}
                        disabled
                      />
                    </Stack>
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                      <TextField
                        label="Diskon"
                        type="text"
                        name="discount"
                        value={transactionForm.discount}
                        onChange={handleTransactionForm}
                      />
                    </Stack>
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                      <TextField
                        label="Ongkir"
                        type="text"
                        name="shippingPrice"
                        value={transactionForm.shippingPrice}
                        onChange={handleTransactionForm}
                      />
                    </Stack>
                    <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                      <TextField
                        label="Total Bayar"
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
