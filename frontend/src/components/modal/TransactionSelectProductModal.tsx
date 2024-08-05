import { useEffect } from 'react'
import { useProduct } from '../../contexts'
import { Modal, Stack, theme, Typography } from '../../theme'
import ModalOverlay from './ModalOverlay'

// ----------------------------------------------------------------------

interface TransactionSelectProductModalProps {
  isOpen?: any
  handleProductSelect?: any
}

export default function TransactionSelectProductModal({
  isOpen,
  handleProductSelect,
}: TransactionSelectProductModalProps) {
  // context
  const { getAllProduct, productList } = useProduct()

  useEffect(() => {
    getAllProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalOverlay isModalShow={isOpen}>
      <Modal width="520">
        <Stack alignItems="center" sx={{ height: '56px', padding: '0 16px' }}>
          <Typography as="h2" text="Pilih produk" size="18" weight="700" color="primary" />
        </Stack>
        <Stack direction="column" spacing="8" sx={{ padding: '16px' }}>
          {productList &&
            productList.map((data, index) => (
              <Stack
                key={index}
                direction="column"
                spacing="2"
                onClick={() => {
                  handleProductSelect(data)
                  isOpen(false)
                }}
                sx={{
                  padding: '8px 12px',
                  borderRadius: theme.size.radius.sm,
                  '&:hover': {
                    backgroundColor: `${theme.palette.background.canvas.light}`,
                    cursor: 'pointer',
                  },
                }}
              >
                <Typography text={data.code} size="14" weight="500" />
                <Typography text={data.name} size="12" weight="700" color="primary" />
              </Stack>
            ))}
        </Stack>
      </Modal>
    </ModalOverlay>
  )
}
