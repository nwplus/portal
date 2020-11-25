import React from 'react'
import styled from 'styled-components'

const inputSize = {
  default: '300px',
  medium: '400px',
  large: '600px',
}

const TextInputContainer = styled.div`
  margin: 1em;
`

const TextInputBox = styled.input.attrs({
  type: 'text',
})`
  background-color: transparent;
  width: ${p => (p.size ? inputSize[p.size] : inputSize['default'])};
  padding: 10px;
  border: 2px solid ${p => p.theme.colors.highlight};
  border-radius: 7px;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.font};
  font-size: ${p => p.theme.typography.h3.size};
  ::placeholder {
    color: ${p => p.theme.colors.highlight};
  }
  :hover {
    border: 2px solid ${p => p.theme.colors.primary};
  }
  :focus {
    border: 2px solid ${p => p.theme.colors.primary};
    outline: none;
  }
  :disabled {
    border: 2px solid ${p => p.theme.colors.highlight};
    opacity: ${p => p.theme.opacity.disabled};
  }
  ${p =>
    p.invalid &&
    `border: 2px solid ${p.theme.colors.warning};
    ::placeholder {
      color: ${p.theme.colors.warning};
    }
    :hover {
      border: 2px solid ${p.theme.colors.secondaryWarning};
    }
    :focus {
      border: 2px solid ${p.theme.colors.secondaryWarning};
    }`}
`
const ErrorMsg = styled.p`
  color: ${p => p.theme.colors.warning};
  margin: 7px 0px;
`

export const TextInput = ({ invalid, errorMsg, ...rest }) => {
  return (
    <TextInputContainer>
      <TextInputBox invalid={invalid} {...rest} />
      {invalid && <ErrorMsg> {errorMsg} </ErrorMsg>}
    </TextInputContainer>
  )
}

export default TextInput
