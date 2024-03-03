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
  ${p => p.noLeftOutline && `margin-left: 0;`}
`

const TextInputBox = styled.input.attrs({
  type: 'text',
})`
  width: ${p => (p.size ? inputSize[p.size] : inputSize['default'])};
  ${TextInputLike};

  ${p =>
    p.noOutline &
    `

    ${TextInputNoOutline};
    padding-left: 0;
    border-bottom-color: ${p.theme.colors.default};
    height: 2em;
    :hover {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.text};
    }
    :focus {
      ${TextInputNoOutline}
      border-bottom-color: ${p => p.theme.colors.text};
    }
    `}
`

// max-width: fit-content to make the error message only span the text input width
const StyledErrorMessage = styled(ErrorMessage)`
  max-width: fit-content;
`

export const TextInput = ({
  className,
  invalid,
  errorMsg,
  noOutline,
  noLeftOutline,
  inline,
  customRef,
  ...rest
}) => {
  return (
    <TextInputContainer
      className={className}
      inline={inline}
      noLeftOutline={noLeftOutline}
      noOutline={noOutline}
    >
      <TextInputBox invalid={invalid} noOutline={noOutline} ref={customRef} {...rest} />
      {invalid && <StyledErrorMessage> {errorMsg} </StyledErrorMessage>}
    </TextInputContainer>
  )
}

export default TextInput
