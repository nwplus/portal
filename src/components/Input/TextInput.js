import React from 'react'
import styled from 'styled-components'
import { TextInputLike, TextInputNoOutline } from '../Common.js'
import { ErrorMessage } from '../Typography'

const inputSize = {
  small: '200px',
  default: '300px',
  medium: '400px',
  large: '600px',
}

const TextInputContainer = styled.div`
  margin: 1em;
  ${p =>
    p.inline &&
    `display: inline-block;
  margin-left: 0;
  margin-top: 0.5em;`}
  ${p => p.noOutline && `margin: 0;`}
`

const TextInputBox = styled.input.attrs({
  type: 'text',
})`
  width: ${p => (p.size ? inputSize[p.size] : inputSize['default'])};
  ${TextInputLike};
  ${p =>
    p.noOutline &&
    `
    ${TextInputNoOutline};
    padding-left: 0;
    border-bottom-color: ${p.theme.colors.default};
    height: 2em;
    :hover {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.primary};
    }
    :focus {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.primary};
    }
    `}
`

const TextInputError = styled(ErrorMessage)`
  position: absolute;
`

export const TextInput = ({
  className,
  invalid,
  errorMsg,
  noOutline,
  inline,
  customRef,
  ...rest
}) => {
  return (
    <TextInputContainer className={className} inline={inline} noOutline={noOutline}>
      <TextInputBox invalid={invalid} noOutline={noOutline} ref={customRef} {...rest} />
      {invalid && <TextInputError> {errorMsg} </TextInputError>}
    </TextInputContainer>
  )
}

export default TextInput
