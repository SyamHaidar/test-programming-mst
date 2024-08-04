import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { BaseProps } from '../../types'
import { theme } from '../GlobalStyles'

// ----------------------------------------------------------------------

const ITextField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Input = styled.input<{ $sx?: any }>`
  display: block;
  color: ${theme.palette.text.primary};
  border: 1px solid ${theme.palette.border.default};
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    border: 1px solid ${theme.palette.border.default};
  }
`

const Label = styled.label`
  color: ${theme.palette.text.secondary};
  position: absolute;
  left: 0;
  pointer-events: none;
  width: auto;
  padding: 0 6px;
  line-height: normal;
  left: 12px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;

  ${Input}:focus + && {
    color: ${theme.palette.color.secondary.default};
    background-color: ${theme.palette.background.canvas.default};
    transform: scale(0.75) translateY(-35px);
  }

  ${Input}:not(:placeholder-shown) + && {
    background-color: ${theme.palette.background.canvas.default};
    transform: scale(0.75) translateY(-35px);
  }
`

const Wrapper = styled(ITextField)<{ $sx?: any }>`
  ${(props) => props.$sx}
`

// ----------------------------------------------------------------------

interface TextFieldProps extends BaseProps {
  label?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  readOnly?: boolean
}

// ----------------------------------------------------------------------

export default function TextField({
  label,
  name,
  placeholder = '',
  type,
  value,
  onChange,
  disabled,
  readOnly,
  sx,
  ...other
}: TextFieldProps) {
  return (
    <Wrapper>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        $sx={sx}
        {...other}
      />
      {label && <Label>{label}</Label>}
    </Wrapper>
  )
}
