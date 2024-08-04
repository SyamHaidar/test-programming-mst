import { css } from 'styled-components'
import { BreakpointProps } from '../types'

// ----------------------------------------------------------------------

export const ResponsiveStyles = (props: BreakpointProps) => css`
  ${props.$sx &&
  css`
    ${props.$sx}
  `}

  /* phone */
  ${props.$xs &&
  css`
    @media (max-width: 575px) {
      ${props.$xs}
    }
  `}

  /* tablet */
  ${props.$sm &&
  css`
    @media (min-width: 576px) {
      ${props.$sm}
    }
  `}

  /* tablet -> laptop */
  ${props.$md &&
  css`
    @media (min-width: 768px) {
      ${props.$md}
    }
  `}

  /* laptop */
  ${props.$lg &&
  css`
    @media (min-width: 1024px) {
      ${props.$lg}
    }
  `}
  
  /* laptop -> desktop */
  ${props.$xl &&
  css`
    @media (min-width: 1200px) {
      ${props.$xl}
    }
  `}
`
