import { PageWrapper } from '../../components'
import { useProduct } from '../../contexts/ProductContext'
import { Box, Button, Card, Container, Divider, Stack, TextField, theme, Typography } from '../../theme'

// ----------------------------------------------------------------------

export default function AddProductPage() {
  const { handleProductForm, createProduct, productForm, errorMessage } = useProduct()

  return (
    <PageWrapper>
      <Container>
        <Box sx={{ marginTop: '32px' }}>
          <Typography size="24" weight="600" color="primary">
            Tambah Produk
          </Typography>

          <Card variant="outline" sx={{ marginTop: '32px', padding: '0' }}>
            <Box sx={{ padding: '16px' }}>
              <Typography color="primary" weight="500">
                Form produk
              </Typography>
            </Box>

            <Divider />

            <Stack direction="column" spacing="16" sx={{ padding: '16px' }}>
              <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                <TextField label="Nama" type="text" name="name" value={productForm.name} onChange={handleProductForm} />
                {errorMessage.name && (
                  <Typography size="12" hexColor={theme.palette.color.danger.default}>
                    {errorMessage.name}
                  </Typography>
                )}
              </Stack>

              <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                <TextField
                  label="Harga"
                  type="text"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductForm}
                />
                {errorMessage.price && (
                  <Typography size="12" hexColor={theme.palette.color.danger.default}>
                    {errorMessage.price}
                  </Typography>
                )}
              </Stack>

              <Stack justifyContent="end" spacing="8">
                <Button text="Batal" variant="light-secondary" />
                <Button text="Simpan" variant="secondary" onClick={createProduct} />
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Container>
    </PageWrapper>
  )
}
