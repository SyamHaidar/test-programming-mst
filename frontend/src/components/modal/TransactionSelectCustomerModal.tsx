import { useEffect } from 'react'
import { useCustomer, useTransaction } from '../../contexts'
import { Modal, Stack, theme, Typography } from '../../theme'
import ModalOverlay from './ModalOverlay'

// ----------------------------------------------------------------------

interface TransactionSelectCustomerModalProps {
  isOpen?: any
}

export default function TransactionSelectCustomerModal({ isOpen }: TransactionSelectCustomerModalProps) {
  // context
  const { getAllCustomer, customerList } = useCustomer()
  const { handleCustomerSelect } = useTransaction()

  useEffect(() => {
    getAllCustomer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalOverlay isModalShow={isOpen}>
      <Modal width="520">
        <Stack alignItems="center" sx={{ height: '56px', padding: '0 16px' }}>
          <Typography as="h2" text="Pilih customer" size="18" weight="700" color="primary" />
        </Stack>
        <Stack direction="column" spacing="8" sx={{ padding: '16px' }}>
          {customerList &&
            customerList.map((data, index) => (
              <Stack
                key={index}
                direction="column"
                spacing="2"
                onClick={() => {
                  handleCustomerSelect(data)
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
