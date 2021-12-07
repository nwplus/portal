import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ScrollbarLike, TextInputLike } from '../Common.js'
import { ErrorMessage, Message } from '../Typography'

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
  customRef,
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
        placeholder={`${placeholder !== null || placeholder !== undefined ? '' : placeholder} ${
          maxLength == null ? '' : `Maximum of ${maxLength} characters`
        }`}
        ref={customRef}
        {...rest}
      />
      {invalid && <ErrorMessage> {errorMsg} </ErrorMessage>}
      {isLengthExceeded && (
        <ErrorMessage>
          {' '}
          Sorry! It looks like your answer is {value.length - maxLength} character(s) over the
          limit.{' '}
        </ErrorMessage>
      )}
      {maxLength != null && <Message> {value.length} characters. </Message>}
    </div>
  )
}

export default TextArea
