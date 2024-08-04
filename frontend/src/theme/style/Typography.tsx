import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { BaseProps, BreakpointProps } from '../../types'
import { ResponsiveStyles } from '../../utils'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const ITypography = styled.div<{
  $font?: string
  $size?: string
  $weight?: string
  $lineHeight?: string
  $lineClamp?: string
  $color?: string
  $hexColor?: string
}>`
  font-family: ${(props) => props.$font};
  font-size: ${(props) => props.$size};
  font-weight: ${(props) => props.$weight};
  line-height: ${(props) => props.$lineHeight};

  /* color props */
  ${(props) => {
    switch (props.$color) {
      case 'primary':
        return css`
          color: ${theme.palette.text.primary};
        `
      case 'secondary':
        return css`
          color: ${theme.palette.text.secondary};
        `
      case 'disabled':
        return css`
          color: ${theme.palette.text.disabled};
        `
    }
  }}

  /* hex color props */
  ${(props) => {
    switch (true) {
      case !!props.$hexColor:
        return css`
          color: ${props.$hexColor};
        `
    }
  }}

  /* line clamp props */
  ${(props) => {
    switch (true) {
      case !!props.$lineClamp:
        if (props.$lineClamp === '1') {
          return css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `
        } else {
          return css`
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: ${props.$lineClamp};
          `
        }
    }
  }}
`

const Wrapper = styled(ITypography)<BreakpointProps>`
  ${ResponsiveStyles}
`

// ----------------------------------------------------------------------

interface TypographyProps extends BaseProps {
  children?: ReactNode
  font?: string
  size?: string
  weight?: string
  color?: 'primary' | 'secondary' | 'disabled'
  hexColor?: string
  lineClamp?: string
  lineHeight?: string
  text?: string | boolean
}

// ----------------------------------------------------------------------

export default function Typography({
  children,
  as = 'span',
  font,
  size,
  weight,
  color = 'secondary',
  hexColor,
  lineClamp,
  lineHeight,
  text,
  sx,
  xs,
  sm,
  md,
  lg,
  xl,
  ...other
}: TypographyProps) {
  return (
    <Wrapper
      as={as}
      $font={font}
      $size={size && `${size}px`}
      $weight={weight}
      $color={color}
      $hexColor={hexColor}
      $lineClamp={lineClamp}
      $lineHeight={lineHeight && `${lineHeight}px`}
      $text={text}
      $sx={sx}
      $xs={xs}
      $sm={sm}
      $md={md}
      $lg={lg}
      $xl={xl}
      {...other}
    >
      {text}
      {children}
    </Wrapper>
  )
}
