import styled, { css } from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const IDivider = styled.div<{ $orientation?: string }>`
  border-color: ${theme.palette.border.default};
  flex-shrink: 0;
  border-style: solid;
  margin: 0px;

  /* orientation props */
  ${(props) => {
    switch (props.$orientation) {
      case 'vertical':
        return css`
          border-width: 0px thin 0px 0px;
          height: auto;
          align-self: stretch;
        `
      case 'horizontal':
        return css`
          width: 100%;
          border-width: 0px 0px thin;
        `
    }
  }}
`

const Wrapper = styled(IDivider)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface DividerProps extends BaseProps {
  orientation?: 'vertical' | 'horizontal'
}

// ----------------------------------------------------------------------

export default function Divider({ orientation = 'horizontal', sx }: DividerProps) {
  return <Wrapper $orientation={orientation} $sx={sx} />
}
