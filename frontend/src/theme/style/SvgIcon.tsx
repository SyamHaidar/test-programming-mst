import styled, { css } from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const ISvgIcon = styled.span<{
  $icon?: string
  $size?: string
  $color?: string
  $variant?: string
}>`
  display: inline-block;
  height: ${(props) => props.$size || '18px'};
  width: ${(props) => props.$size || '18px'};
  background-color: ${(props) => props.$color || 'currentcolor'};
  mask: ${(props) => `url(/static/icons/${props.$icon}.svg)`};
  -webkit-mask: ${(props) => `url(/static/icons/${props.$icon}.svg) center center / contain no-repeat`};

  /* Variant Props */
  ${(props) => {
    if (props.$variant === 'primary') {
      return css`
        background-color: ${theme.palette.text.primary};
      `
    }
  }}
`

const Wrapper = styled(ISvgIcon)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface SvgIconProps extends BaseProps {
  icon?: string
  size?: string
  color?: string
  variant?: string
}

// ----------------------------------------------------------------------

export default function SvgIcon({ icon, size, variant, color, sx, ...other }: SvgIconProps) {
  return <Wrapper $icon={icon} $size={size && `${size}px`} $color={color} $variant={variant} $sx={sx} {...other} />
}
