import styled from 'styled-components'
import { BaseProps } from '../../types'
import Stack from './Stack'

// ----------------------------------------------------------------------

const IContainer = styled.div<{ $maxWidth?: string }>`
  width: 100%;
  max-width: ${(props) => props.$maxWidth || '1280px'};
  min-width: 0;
  margin: 0 32px;
`
const Wrapper = styled(IContainer)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface ContainerProps extends BaseProps {
  maxWidth?: string
}

// ----------------------------------------------------------------------

export default function Container({ maxWidth, children, sx, ...other }: ContainerProps) {
  return (
    <Stack justifyContent="center">
      <Wrapper $maxWidth={maxWidth && `${maxWidth}px`} $sx={sx} {...other}>
        {children}
      </Wrapper>
    </Stack>
  )
}
