import styled, { css } from 'styled-components'
import { BaseProps, BreakpointProps } from '../../types'
import { ResponsiveStyles } from '../../utils'

// ----------------------------------------------------------------------

const IStack = styled.div<{
  $direction?: string
  $justifyContent?: string
  $alignItems?: string
  $spacing?: string
}>`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};

  /* direction props */
  ${(props) => {
    switch (props.$direction) {
      case 'row':
        return css<{ $spacing?: string }>`
          & > :not(:first-child) {
            margin-left: ${props.$spacing};
          }
        `
      case 'row-reverse':
        return css<{ $spacing?: string }>`
          display: inline-flex;
          color: #000;
          & > :not(:last-child) {
            margin-left: ${props.$spacing};
          }
        `
      case 'column':
        return css<{ $spacing?: string }>`
          & > :not(:first-child) {
            margin-top: ${props.$spacing};
          }
        `
    }
  }}
`

const Wrapper = styled(IStack)<BreakpointProps>`
  ${ResponsiveStyles}
`

// ----------------------------------------------------------------------

interface StackProps extends BaseProps, BreakpointProps {
  direction?: 'row' | 'row-reverse' | 'column'
  justifyContent?: string
  alignItems?: string
  spacing?: string
}

// ----------------------------------------------------------------------

export default function Stack({
  children,
  direction = 'row',
  justifyContent,
  alignItems,
  spacing,
  sx,
  xs,
  sm,
  md,
  lg,
  xl,
  ...other
}: StackProps) {
  return (
    <Wrapper
      $direction={direction}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $spacing={spacing && `${spacing}px`}
      $sx={sx}
      $xs={xs}
      $sm={sm}
      $md={md}
      $lg={lg}
      $xl={xl}
      {...other}
    >
      {children}
    </Wrapper>
  )
}
