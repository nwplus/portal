import React from 'react'
import styled from 'styled-components'
import { TextInputLike, TextInputLikeErrorMsg as ErrorMsg, TextInputNoOutline } from '../Common.js'

const inputSize = {
  small: '160px',
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
  width: ${p => (p.size ? inputSize[p.size] : inputSize['default'])};
  ${TextInputLike};
  ${p =>
    p.noOutline &&
    `
    ${TextInputNoOutline};
    border-bottom-color: ${p.theme.colors.default};
    :hover {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.primary};
    }
    :focus {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.primary};
    }
    :disabled {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.highlight};
    }
    `}
`

export const TextInput = ({ className, invalid, errorMsg, noOutline, ...rest }) => {
  return (
    <TextInputContainer className={className}>
      <TextInputBox invalid={invalid} noOutline={noOutline} {...rest} />
      {invalid && <ErrorMsg> {errorMsg} </ErrorMsg>}
    </TextInputContainer>
  )
}

export default TextInput
