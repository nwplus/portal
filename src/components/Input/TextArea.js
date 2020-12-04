import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  ScrollbarLike,
  TextInputLike,
  TextInputLikeErrorMsg as ErrorMsg,
  TextInputLikeMsg as Msg,
} from '../Common.js'

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
    <div className={className}>
      <TextAreaBox
        value={value}
        width={width}
        onChange={val => onChange(val.target.value)}
        invalid={invalid || isLengthExceeded}
        placeholder={`${placeholder} ${
          maxLength == null ? '' : `Maximum of ${maxLength} characters`
        }`}
        {...rest}
      />
      {invalid && <ErrorMsg> {errorMsg} </ErrorMsg>}
      {isLengthExceeded ? (
        <ErrorMsg> Sorry! It looks like your answer is more than {maxLength} characters. </ErrorMsg>
      ) : (
        maxLength != null && <Msg> {value.length} characters. </Msg>
      )}
    </div>
  )
}

export default TextArea
