import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { PageWrapper, Table } from '../../components'
import { useProduct } from '../../contexts'
import { Box, Container, Stack, SvgIcon, theme, Typography } from '../../theme'
import { CurrencyFormat } from '../../utils'

// ----------------------------------------------------------------------

export default function ProductPage() {
  // context
  const { getAllProduct, productList } = useProduct()

  const tableHead = [{ name: 'No' }, { name: 'Kode' }, { name: 'Nama' }, { name: 'Harga' }]

  useEffect(() => {
    getAllProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      <Container>
        <Box sx={{ marginTop: '32px' }}>
          <Stack justifyContent="space-between" alignItems="center">
            <Typography size="24" weight="600" color="primary">
              Daftar Produk
            </Typography>

            <Stack
              as={NavLink}
              to="/product/create"
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
            <Table head={tableHead} data={productList}>
              {productList.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.code}</td>
                  <td>{data.name}</td>
                  <td>{CurrencyFormat(data.price)}</td>
                </tr>
              ))}
            </Table>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  )
}
