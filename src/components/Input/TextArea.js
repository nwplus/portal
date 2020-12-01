import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextInputLike, TextInputLikeErrorMsg as ErrorMsg } from '../Common.js'

const TextAreaBox = styled.textarea.attrs({
  type: 'text',
})`
  height: 200px;
  width: ${p => p.width || '600px'};
  box-sizing: border-box;
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
        placeholder={`${placeholder}. ${maxLength && `Maximum of ${maxLength} characters`}`}
        {...rest}
      />
      {invalid && <ErrorMsg> {errorMsg} </ErrorMsg>}
      {isLengthExceeded && (
        <ErrorMsg> Sorry! It looks like your answer is more than {maxLength} characters. </ErrorMsg>
      )}
    </div>
  )
}

export default TextArea
