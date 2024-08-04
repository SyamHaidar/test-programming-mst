import styled from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const IAvatar = styled.img<{ $size?: string; $rounded?: boolean }>`
  height: ${(props) => props.$size || '48px'};
  width: ${(props) => props.$size || '48px'};
  object-fit: cover;
  border-radius: ${theme.size.radius.full};
  flex-shrink: 0;
`

const Wrapper = styled(IAvatar)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface AvatarProps extends BaseProps {
  size?: string
}

// ----------------------------------------------------------------------

export default function Avatar({ src, alt, size, sx, ...other }: AvatarProps) {
  return (
    <Wrapper
      src={src}
      alt={alt}
      $size={size && `${size}px`}
      $sx={sx}
      {...other}
    />
  )
}
