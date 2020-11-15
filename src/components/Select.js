import React from 'react'
import styled from 'styled-components'

const SelectWrapper = styled.div`
  display: inline-block;
  border: 2px solid ${p => (p.color ? p.color : p.theme.colors.default)};
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
  background: ${p.theme.colors.textInput.selectHover};
  border: 2px solid ${p.theme.colors.textInput.default};
  cursor: pointer;
}`}

  ${p =>
    p.checked &&
    `
  background: ${p.theme.colors.textInput.default};
  border: 2px solid ${p.theme.colors.textInput.default};
  transition: background-color 0.25s linear;
  :hover {
    background: ${p.theme.colors.textInput.default};
    border: 2px solid ${p.theme.colors.textInput.default};
    cursor: pointer;
  `}
  ${p => `:focus-within {
    background: ${p.theme.colors.textInput.selectClick};
    border: 2px solid ${p.theme.colors.textInput.default};
  }`}
`

const Selector = styled.span`
  display: inline-block;
  position: relative;
  width: 12px;
  height: 12px;
  margin: auto 24px auto auto;
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
        : (p.checked &&
            `
    border: 2px solid ${p.theme.colors.buttonText};
    `) ||
          `border: 2px solid ${p.theme.colors.textInput.default};`}
  }
`

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
`

const Label = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  height: 24px;

  ${SelectWrapper}:hover & {
    ${p =>
      p.disabled
        ? `cursor: not-allowed;
    color: ${p.theme.colors.default};`
        : (p.checked &&
            `
    color: ${p.theme.colors.default}; 
    cursor: pointer;`) ||
          `color: ${p.theme.colors.textInput.default};
    cursor: pointer;`}
  }

  ${p =>
    p.checked &&
    `
color: ${p.theme.colors.buttonText};
font-weight: ${p.theme.typography.h3.weight};
`}
`

export default props => (
  <SelectWrapper {...props}>
    <Label {...props}>
      <Input {...props} />
      <Selector {...props} />
      {props.label}
    </Label>
  </SelectWrapper>
)
