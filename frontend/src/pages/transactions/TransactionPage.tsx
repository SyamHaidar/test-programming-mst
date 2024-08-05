import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { PageWrapper, Table } from '../../components'
import { useTransaction } from '../../contexts'
import { Box, Container, Stack, SvgIcon, theme, Typography } from '../../theme'
import { CurrencyFormat } from '../../utils'

// ----------------------------------------------------------------------

export default function TransactionPage() {
  // context
  const { getAllTransaction, transactionList } = useTransaction()

  const tableHead = [
    { name: 'No' },
    { name: 'No Transaksi' },
    { name: 'Tanggal' },
    { name: 'Nama Customer' },
    { name: 'Jumlah Barang' },
    { name: 'Subtotal' },
    { name: 'Diskon' },
    { name: 'Ongkir' },
    { name: 'Total' },
  ]

  useEffect(() => {
    getAllTransaction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      <Container>
        <Box sx={{ marginTop: '32px' }}>
          <Stack justifyContent="space-between" alignItems="center">
            <Typography size="24" weight="600" color="primary">
              Daftar Transaksi
            </Typography>

            <Stack
              as={NavLink}
              to="/transaction/create"
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '40px',
                width: '40px',
                background: theme.palette.color.secondary.default,
                borderRadius: theme.size.radius.full,
              }}
            >
              <SvgIcon icon="add" color="white" />
            </Stack>
          </Stack>

          <Box sx={{ marginTop: '16px' }}>
            <Table head={tableHead} data={transactionList}>
              {transactionList.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.code}</td>
                  <td>{data.date}</td>
                  <td>{data.customerName}</td>
                  <td>{data.quantity}</td>
                  <td>{CurrencyFormat(Number(data.subtotal))}</td>
                  <td>{CurrencyFormat(Number(data.discount))}</td>
                  <td>{CurrencyFormat(Number(data.shippingPrice))}</td>
                  <td>{CurrencyFormat(Number(data.totalPayment))}</td>
                </tr>
              ))}
            </Table>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  )
}
