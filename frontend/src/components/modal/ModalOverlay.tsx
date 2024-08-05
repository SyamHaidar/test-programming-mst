import { ReactNode } from 'react'
import { Portal } from 'react-portal'
import { Box, theme } from '../../theme'

// ----------------------------------------------------------------------

interface ModalOverlayProps {
  children?: ReactNode
  isModalShow?: any
}

export default function ModalOverlay({ children, isModalShow }: ModalOverlayProps) {
  return (
    <Portal>
      <Box
        sx={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          inset: 0,
          zIndex: 9999,
        }}
      >
        <Box
          onClick={isModalShow}
          sx={{
            backgroundColor: theme.palette.background.overlay,
            position: 'fixed',
            inset: 0,
          }}
        />
        {children}
      </Box>
    </Portal>
  )
}
