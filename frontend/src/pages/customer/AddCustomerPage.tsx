import { NavLink } from 'react-router-dom'
import { PageWrapper } from '../../components'
import { useCustomer } from '../../contexts'
import { Box, Button, Card, Container, Divider, Stack, TextField, theme, Typography } from '../../theme'

// ----------------------------------------------------------------------

export default function AddProductPage() {
  const { handleCustomerForm, createCustomer, customerForm, errorMessage } = useCustomer()

  return (
    <PageWrapper>
      <Container>
        <Box sx={{ marginTop: '32px' }}>
          <Typography size="24" weight="600" color="primary">
            Tambah Customer
          </Typography>

          <Card variant="outline" sx={{ marginTop: '16px', padding: '0' }}>
            <Box sx={{ padding: '16px' }}>
              <Typography color="primary" weight="500">
                Form customer
              </Typography>
            </Box>

            <Divider />

            <Stack direction="column" spacing="16" sx={{ padding: '16px' }}>
              <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                <TextField
                  label="Nama"
                  type="text"
                  name="name"
                  value={customerForm.name}
                  onChange={handleCustomerForm}
                />
                {errorMessage.name && (
                  <Typography size="12" hexColor={theme.palette.color.danger.default}>
                    {errorMessage.name}
                  </Typography>
                )}
              </Stack>

              <Stack direction="column" spacing="8" sx={{ width: '100%' }}>
                <TextField
                  label="No Telepon"
                  type="text"
                  name="phoneNumber"
                  value={customerForm.phoneNumber}
                  onChange={handleCustomerForm}
                />
                {errorMessage.phoneNumber && (
                  <Typography size="12" hexColor={theme.palette.color.danger.default}>
                    {errorMessage.phoneNumber}
                  </Typography>
                )}
              </Stack>

              <Stack justifyContent="end" spacing="8">
                <Button text="Batal" variant="light-secondary" as={NavLink} to="/customer" />
                <Button text="Simpan" variant="secondary" onClick={createCustomer} />
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Container>
    </PageWrapper>
  )
}
