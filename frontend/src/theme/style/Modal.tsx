import styled, { css } from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'
import { AnimateModal, AnimateModalBottom, AnimateModalRight } from './Animate'

// ----------------------------------------------------------------------

const IModal = styled.div<{ $position?: string; $width?: string }>`
  background: ${theme.palette.background.canvas.default};
  position: fixed;
  overflow: hidden;

  /* position props */
  @media (min-width: 576px) {
    ${(props) => {
      if (props.$position === 'right') {
        return css`
          right: 0;
          height: 100vh;
          width: 380px;
          border-left: 1px solid ${theme.palette.border};
          animation: ${AnimateModalRight} 0.3s ease-out;
          transform-origin: right;
        `
      } else {
        return css<{ $width?: string }>`
          width: ${(props) => props.$width || '320px'};
          border: 1px solid ${theme.palette.border};
          border-radius: 12px;
          animation: ${AnimateModal} 0.1s ease-out;
          box-shadow: 0 8px 12px rgba(32, 33, 36, 0.2);
        `
      }
    }}
  }

  /* Small screen <= 576px */
  @media (max-width: 575px) {
    bottom: 0;
    width: 100%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    animation: ${AnimateModalBottom} 0.3s ease-out;
    box-shadow: 0 -8px 12px rgba(32, 33, 36, 0.2);
  }
`

const Wrapper = styled(IModal)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface ModalProps extends BaseProps {
  position?: string
  width?: string
}

// ----------------------------------------------------------------------

export default function Modal({ children, position, width, sx }: ModalProps) {
  return (
    <Wrapper $position={position} $width={`${width}px`} $sx={sx}>
      {children}
    </Wrapper>
  )
}
