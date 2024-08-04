import { ReactNode } from 'react'

// ----------------------------------------------------------------------

export interface BaseProps {
  children?: ReactNode
  // styled-components
  as?: any
  to?: any
  sx?: any

  // screen
  xs?: any
  sm?: any
  md?: any
  lg?: any
  xl?: any

  // input
  type?: string
  placeholder?: string
  onClick?: any

  // img
  src?: string
  alt?: string
}
