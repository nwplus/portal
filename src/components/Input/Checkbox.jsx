import React from 'react'
import styled from 'styled-components'

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Icon = styled.svg`
  fill: none;
  stroke: ${p => p.theme.colors.backgroundSecondary};
  stroke-width: 4px;
  z-index: 2;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${p =>
    p.checked ? p.theme.colors.select.border : p.theme.colors.select.background.default};
  border-radius: 3px;
  border: 2px solid ${p => p.theme.colors.select.border};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 0px ${p => p.theme.colors.select.border};
  }

  :hover {
    background: ${p =>
      p.checked ? p.theme.colors.select.border : p.theme.colors.select.background.hover};
    border: 2px solid ${p => (p.checked ? '' : p.theme.colors.select.border)};
  }

  ${Icon} {
    visibility: ${p => (p.checked ? 'visible' : 'hidden')};
  }
`

const CheckboxContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  padding: 8px;
`

const StyledLabel = styled.label`
  ${p =>
    p.flex &&
    `display: flex;
padding: 8px 0;`}
  cursor: pointer;
`

const LabelText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Checkbox = ({ className, checked, label, children, flex, ...props }) => (
  <StyledLabel flex={flex}>
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
    {flex ? <LabelText>{children || label}</LabelText> : <span>{children || label}</span>}
  </StyledLabel>
)

export default Checkbox
