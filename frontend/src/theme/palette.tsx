const white = '#ffffff'

const COLOR = {
  primary: {
    default: '#1628ed',
    light: '#f3f4fe',
  },
  secondary: {
    default: '#040D12',
    light: '#f2f3f3',
  },
  danger: {
    default: '#ed1a16',
    light: '#fef4f3',
  },
}

const TEXT = {
  primary: '#040d12',
  secondary: '#434a4d',
  disabled: '#9b9ea0',
  contrast: '#000000',
}

const BUTTON = {
  text: {
    default: white,
    primary: COLOR.primary.default,
    secondary: COLOR.secondary.default,
    danger: COLOR.danger.default,
  },
  ...COLOR,
}

const BACKGROUND = {
  canvas: {
    default: white,
    light: COLOR.primary.light,
    ...COLOR,
  },
  blur: `${white}a6`,
  overlay: `${COLOR.secondary.default}cc`,
}

const BORDER = {
  default: '#e6e7e8',
  ...COLOR,
}

const SHADOW = {
  default: `0 0 2px rgba(155, 158, 160, 0.2), 
    0 12px 24px -4px rgba(155, 158, 160, 0.12)`,
  top: `0 0 2px rgba(155, 158, 160, 0.20), 
    0 12px 24px -4px rgba(155, 158, 160, 0.12)`,
  primary: `0 8px 16px ${COLOR.primary.default}40`,
  secondary: `0 8px 16px ${COLOR.secondary.default}40`,
  danger: `0 8px 16px ${COLOR.danger.default}40`,
}

const COMMON = {
  scrollbar: '#b4bcc3',
  color: COLOR,
  text: TEXT,
  button: BUTTON,
  background: BACKGROUND,
  border: BORDER,
  shadow: SHADOW,
}

export const palette = {
  ...COMMON,
}
