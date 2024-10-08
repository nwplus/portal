import React from 'react'
import styled from 'styled-components'

const SelectWrapper = styled.span`
  display: inline-block;
  color: ${p => p.theme.colors.text};
  border: 2px solid ${p => p.theme.colors.select.border};
  border-radius: 7px;
  padding: 8px 24px 8px 16px;
  margin: 8px 12px 12px 0;
  ${p =>
    p.disabled
      ? `
      opacity: ${p.theme.opacity.disabled};
      cursor: not-allowed;
    `
      : `
      :hover {
        background: ${p.theme.colors.select.background.hover};
        cursor: pointer;
        transition: background-color 0.25s linear;
      }
    `}
  ${p =>
    p.checked &&
    `
    background: ${p.theme.colors.select.background.default};
    transition: background-color 0.25s linear;
    :hover {
      background: ${p.theme.colors.select.background.hover};
    `}
`

const Selector = styled.span`
  display: inline-block;
  position: relative;
  width: 10px;
  height: 10px;
  margin: auto 24px auto auto;
  align-items: center;
  border-radius: ${p => (p.type === 'radio' ? '50%' : '4px')};
  vertical-align: middle;
  border: 2px solid ${p => p.theme.colors.select.border};
  ${p =>
    p.checked &&
    `
      background-color: ${p.theme.colors.select.border};
    `}
  ${SelectWrapper}:hover & {
    ${p => (p.disabled ? `cursor: not-allowed;` : `border: 2px solid ${p.theme.colors.text};`)}
  }
`

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
`

const Label = styled.label`
  align-items: center;
  color: ${p => p.checked && p.theme.colors.text};
  ${SelectWrapper}:hover {
    ${p => (p.disabled ? `cursor: not-allowed;` : `cursor: pointer;`)}
  }
`

const Select = ({ label, customRef, ...rest }) => {
  return (
    <Label {...rest}>
      <SelectWrapper tabIndex="0" ref={customRef} {...rest}>
        <Input {...rest} />
        <Selector {...rest} />
        {label}
      </SelectWrapper>
    </Label>
  )
}

export default Select
