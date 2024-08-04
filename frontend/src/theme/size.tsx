const FONT = {
  default: '16px',
}

const BUTTON = {
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '56px',
  xxl: '64px',
}

const RADIUS = {
  sm: '8px',
  md: '16px',
  lg: '32px',
  xl: '64px',
  full: '1000px',
  top: {
    sm: '8px 8px 0 0',
    md: '16px 16px 0 0',
    lg: '32px 32px 0 0',
    xl: '64px 64px 0 0',
  },
  bottom: {
    sm: '0 0 8px 8px',
    md: '0 0 16px 16px',
    lg: '0 0 32px 32px',
    xl: '0 0 64px 64px',
  },
}

const COMMON = {
  blur: 'blur(8px)',
  font: FONT,
  button: BUTTON,
  radius: RADIUS,
}

export const size = {
  ...COMMON,
}
