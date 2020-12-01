import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  InputContainerLike,
  TextInputLike,
  TextInputLikeErrorMsg as ErrorMsg,
  ScrollbarLike,
} from '../Common.js'

const TextAreaContainer = styled.div`
  ${InputContainerLike};
`

const TextAreaBox = styled.textarea.attrs({
  type: 'text',
})`
  height: 200px;
  width: ${p => p.width || '600px'};
  box-sizing: border-box;
  ${TextInputLike};
  ${ScrollbarLike};
`

export const TextArea = ({
  value,
  onChange,
  maxLength,
  placeholder,
  invalid,
  errorMsg,
  className,
  width,
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
    <TextAreaContainer className={className}>
      <TextAreaBox
        value={value}
        width={width}
        onChange={val => onChange(val.target.value)}
        invalid={invalid || isLengthExceeded}
        placeholder={`${placeholder}. ${maxLength && `Maximum of ${maxLength} characters`}`}
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
