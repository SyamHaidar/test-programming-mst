import styled, { css } from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const IButton = styled.button<{
  $variant?: string
  $height?: string
  $width?: string
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${theme.size.font.default};
  border-radius: ${theme.size.radius.xl};

  /* variant props */
  ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return css`
          background-color: ${theme.palette.button.primary.default};
          color: ${theme.palette.button.text.default};
          border: 1px solid ${theme.palette.border.primary};
          padding: 0 24px;
        `
      case 'outline-primary':
        return css`
          border: 1px solid ${theme.palette.border.primary.default};
          color: ${theme.palette.button.text.primary};
          padding: 0 24px;
        `
      case 'light-primary':
        return css`
          background-color: ${theme.palette.button.primary.light};
          color: ${theme.palette.button.text.primary};
          border: 1px solid ${theme.palette.border.primary.light};
          padding: 0 24px;
        `
      case 'secondary':
        return css`
          background-color: ${theme.palette.button.secondary.default};
          color: ${theme.palette.button.text.default};
          border: 1px solid ${theme.palette.border.secondary};
          padding: 0 24px;
        `
      case 'outline-secondary':
        return css`
          border: 1px solid ${theme.palette.border.secondary.default};
          color: ${theme.palette.button.text.secondary};
          padding: 0 24px;
        `
      case 'light-secondary':
        return css`
          background-color: ${theme.palette.button.secondary.light};
          color: ${theme.palette.button.text.secondary};
          border: 1px solid ${theme.palette.border.secondary.light};
          padding: 0 24px;
        `
      case 'danger':
        return css`
          background-color: ${theme.palette.button.danger.default};
          color: ${theme.palette.button.text.default};
          border: 1px solid ${theme.palette.border.danger};
          padding: 0 24px;
        `
      case 'outline-danger':
        return css`
          border: 1px solid ${theme.palette.border.danger.default};
          color: ${theme.palette.button.text.danger};
          padding: 0 24px;
        `
      case 'light-danger':
        return css`
          background-color: ${theme.palette.button.danger.light};
          color: ${theme.palette.button.text.danger};
          border: 1px solid ${theme.palette.border.danger.light};
          padding: 0 24px;
        `
      case 'link':
        return css`
          color: ${theme.palette.button.primary.default};
          &:hover {
            text-decoration: underline;
          }
        `
    }
  }}

  /* height props */
  ${(props) => {
    switch (props.$height) {
      case 'sm':
        return css`
          font-size: 12px;
          height: ${theme.size.button.sm};
        `
      case 'md':
        return css`
          height: ${theme.size.button.md};
        `
      case 'lg':
        return css`
          height: ${theme.size.button.lg};
        `
      case 'xl':
        return css`
          height: ${theme.size.button.xl};
        `
      case 'xxl':
        return css`
          height: ${theme.size.button.xxl};
        `
    }
  }}

  /* width props */
  ${(props) => {
    if (props.$width === 'full') {
      return css`
        width: 100%;
      `
    }
  }}
`

const Wrapper = styled(IButton)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface ButtonProps extends BaseProps {
  variant?:
    | 'primary'
    | 'outline-primary'
    | 'light-primary'
    | 'secondary'
    | 'outline-secondary'
    | 'light-secondary'
    | 'danger'
    | 'outline-danger'
    | 'light-danger'
    | 'link'
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  width?: 'full'
  text?: string
  disabled?: boolean
}

// ----------------------------------------------------------------------

export default function Button({
  variant = 'primary',
  height = 'md',
  width,
  text,
  disabled = false,
  sx,
  ...other
}: ButtonProps) {
  return (
    <Wrapper $variant={variant} $height={height} $width={width} $sx={sx} disabled={disabled} {...other}>
      {text}
    </Wrapper>
  )
}
