import React from 'react'
import styled from 'styled-components'

const SelectWrapper = styled.span`
  display: inline-block;
  border: 2px solid ${p => p.theme.colors.default};
  border-radius: 8px;
  padding: 8px 24px 8px 16px;
  margin: 8px;

  ${p =>
    p.disabled
      ? `
  opacity: ${p.theme.opacity.disabled};
  cursor: not-allowed;
`
      : `:hover {
  background: ${p.theme.colors.selects.hover};
  border: 2px solid ${p.theme.colors.primary};
  cursor: pointer;
}`}

  ${p =>
    p.checked &&
    `
  background: ${p.theme.colors.primary};
  border: 2px solid ${p.theme.colors.primary};
  transition: background-color 0.25s linear;
  :hover {
    background: ${p.theme.colors.selects.focus};
  `}

  ${p => `:focus-within {
    background: ${p.theme.colors.selects.focus};
    border: 2px solid ${p.theme.colors.primary};
  }
  :focus {
    background: ${p.theme.colors.selects.focus};
    border: 2px solid ${p.theme.colors.primary};
  }`}
`

const Selector = styled.span`
  display: inline-block;
  position: relative;
  width: 12px;
  height: 12px;
  margin: auto 24px auto auto;
  align-items: center;
  border-radius: ${p => (p.type === 'radio' ? '50%' : '4px')};
  vertical-align: middle;
  ${p =>
    p.checked
      ? `background-color: ${p.theme.colors.buttonText};
        border: 2px solid ${p.theme.colors.buttonText};`
      : `border: 2px solid ${p.theme.colors.default};`}

  ${SelectWrapper}:hover & {
    ${p =>
      p.disabled
        ? `cursor: not-allowed;`
        : `border: 2px solid ${p.checked ? p.theme.colors.buttonText : p.theme.colors.primary};`}
  }
`

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
`

const Label = styled.label`
  align-items: center;
  color: ${p => p.checked && p.theme.colors.buttonText};

  :hover {
    ${p =>
      p.disabled
        ? `cursor: not-allowed;`
        : `
    color: ${p.theme.colors.primary}; 
    cursor: pointer;`}
  }
`

export default ({ type, label, checked, onChange, disabled, ...rest }) => (
  <Label checked={checked} disabled={disabled}>
    <SelectWrapper checked={checked} disabled={disabled}>
      <Input type={type} checked={checked} onChange={onChange} disabled={disabled} {...rest} />
      <Selector type={type} checked={checked} disabled={disabled} />
      {label}
    </SelectWrapper>
  </Label>
)
