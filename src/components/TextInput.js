import React from 'react';
import styled from 'styled-components';

const size = {
  default: "300px",
  medium: "400px",
  large: "600px"
}

const TextInputContainer = styled.div`
  margin: 1em;
`

const TextInputBox = styled.input.attrs({
  type: 'text',
})`
  background-color: transparent; 
  width: ${p => p.size ? size[p.size] : size["default"]};
  padding: 10px;
  border: 2px solid ${p => p.theme.colors.highlight};
  border-radius: 7px;
  color: ${p => p.theme.colors.primary};
  font-family: 'HK Grotesk';
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
  ${p => (p.invalid) &&
    `border: 2px solid ${p.theme.colors.secondaryWarning};
    ::placeholder {
      color: ${p.theme.colors.secondaryWarning};
    }
    :hover {
      border: 2px solid ${p => p.theme.colors.primary};
    }`
  }
`
const ErrorMsg = styled.p`
  color: ${p => p.theme.colors.warning};
  margin: 7px 0px;
`

export const TextInput = ({
  value,
  onChange,
  placeholder,
  disabled,
  size,
  invalid,
  errorMsg
}) => {

  return (
    <TextInputContainer>
      <TextInputBox value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} size={size} invalid={invalid} />
      {invalid && <ErrorMsg> {errorMsg} </ErrorMsg>}
    </TextInputContainer>
  );
}

export default TextInput; 