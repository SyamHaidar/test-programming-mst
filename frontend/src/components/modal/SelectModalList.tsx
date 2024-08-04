import { ReactNode } from 'react'
import { Box, Button, Modal, Stack, Typography } from '../../theme'
import ModalOverlay from './ModalOverlay'

// ----------------------------------------------------------------------
interface SelectModalListProps {
  children: ReactNode
  isOpen?: any
  title?: string
  handleAddData: any
}

export default function SelectModalList({ children, isOpen, handleAddData, title }: SelectModalListProps) {
  return (
    <ModalOverlay isModalShow={isOpen}>
      <Modal width="400">
        <Stack justifyContent="space-between" alignItems="center" sx={{ height: '56px', padding: '0 16px' }}>
          <Typography as="h2" text={`Select ${title}`} size="18" weight="700" color="primary" />
          <Button onClick={isOpen} text="Batal" variant="outline-secondary" />
        </Stack>
        <Stack direction="column" spacing="8" sx={{ padding: '4px' }}>
          {children}
        </Stack>
        {handleAddData && (
          <Box sx={{ padding: '16px' }}>
            <Button onClick={handleAddData} text={`Add new ${title}`} variant="outline-secondary" width="full" />
          </Box>
        )}
      </Modal>
    </ModalOverlay>
  )
}
