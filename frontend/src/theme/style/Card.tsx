import styled, { css } from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const ICard = styled.div<{ $variant?: string; p?: string }>`
  display: block;
  overflow: hidden;

  /* variant props */
  ${(props) => {
    switch (props.$variant) {
      case 'outline':
        return css`
          padding: 16px;
          background-color: ${theme.palette.background.canvas.default};
          border: 1px solid ${theme.palette.border.default};
          border-radius: ${theme.size.radius.md};
        `
      case 'shadow':
        return css`
          padding: 16px;
          background-color: ${theme.palette.background.canvas.default};
          box-shadow: ${theme.palette.shadow.default};
          border-radius: ${theme.size.radius.md};
        `
      case 'light':
        return css`
          padding: 16px;
          background-color: ${theme.palette.background.canvas.light};
          border-radius: ${theme.size.radius.md};
        `
    }
  }}
`

const Wrapper = styled(ICard)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface CardProps extends BaseProps {
  variant?: 'outline' | 'light' | 'shadow' | undefined
}

// ----------------------------------------------------------------------

export default function Card({ children, variant, sx, ...other }: CardProps) {
  return (
    <Wrapper $variant={variant} $sx={sx} {...other}>
      {children}
    </Wrapper>
  )
}
