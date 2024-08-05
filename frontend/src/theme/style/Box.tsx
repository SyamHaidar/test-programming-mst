import styled from 'styled-components'
import { BaseProps, BreakpointProps } from '../../types'
import { ResponsiveStyles } from '../../utils'

// ----------------------------------------------------------------------

const Wrapper = styled.div<BreakpointProps>`
  ${ResponsiveStyles}
`
// ----------------------------------------------------------------------

interface BoxProps extends BaseProps {}

// ----------------------------------------------------------------------

export default function Box({ children, sx, xs, sm, md, lg, xl, ...other }: BoxProps) {
  return (
    <Wrapper $sx={sx} $xs={xs} $sm={sm} $md={md} $lg={lg} $xl={xl} {...other}>
      {children}
    </Wrapper>
  )
}
