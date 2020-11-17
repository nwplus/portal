import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextInputLike } from '../components/Common.js'

const TextAreaContainer = styled.div`
  margin: 1em;
`

const TextAreaBox = styled.textarea.attrs({
  type: 'text',
})`
  height: 200px;
  width: 600px;
  ${TextInputLike};
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid ${p => p.theme.colors.highlight};
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-resizer {
    background-color: transparent;
  }
`
const ErrorMsg = styled.p`
  color: ${p => p.theme.colors.warning};
  margin: 7px 0px;
`

export const TextArea = ({
  value,
  onChangeValue,
  maxLength,
  placeholder,
  invalid,
  errorMsg,
  ...rest
}) => {
  const [isLengthExceeded, setIsLengthExceeded] = useState(false)
  useEffect(() => {
    // debounced with setTimeout
    const handler = setTimeout(() => {
      setIsLengthExceeded(maxLength && value && value.length > maxLength)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [maxLength, value])

  return (
    <TextAreaContainer>
      <TextAreaBox
        value={value}
        onChange={val => {
          onChangeValue(val.target.value)
        }}
        invalid={invalid || isLengthExceeded}
        placeholder={`${placeholder} ${maxLength && `Maximum of ${maxLength} characters`}`}
        {...rest}
      />
      {invalid && <ErrorMsg> {errorMsg} </ErrorMsg>}
      {isLengthExceeded && (
        <ErrorMsg> Sorry! It looks like your answer is more than {maxLength} characters. </ErrorMsg>
      )}
    </TextAreaContainer>
  )
}

export default TextArea
