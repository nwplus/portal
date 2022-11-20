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
  maxWords,
  placeholder,
  invalid,
  errorMsg,
  className,
  width,
  customRef,
  ...rest
}) => {
  const [isLengthExceeded, setIsLengthExceeded] = useState(false)
  const getWords = () => {
    const split = value?.split(' ')
    if (split.length === 1) {
      if (split[0] === '') {
        return 0
      } else {
        return 1
      }
    }
    const cleanedSplit = []
    for (let i = 0; i < split.length; i++) {
      if (split[i] !== '') cleanedSplit.push(split[i])
    }
    return cleanedSplit.length || 0
  }
  useEffect(() => {
    // debounced with setTimeout
    const handler = setTimeout(() => {
      setIsLengthExceeded(
        maxLength ? value && value.length > maxLength : maxWords ? getWords() > maxWords : false
      )
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
          maxLength == null
            ? maxWords == null
              ? ''
              : `Maximum of ${maxWords} words`
            : `Maximum of ${maxLength} characters`
        }`}
        ref={customRef}
        {...rest}
      />
      {invalid && <ErrorMessage> {errorMsg} </ErrorMessage>}
      {isLengthExceeded && (
        <ErrorMessage>
          {' '}
          Sorry! It looks like your answer is{' '}
          {maxLength
            ? `${value.length - maxLength}  character(s)`
            : `${getWords() - maxWords} word(s)`}{' '}
          over the limit.{' '}
        </ErrorMessage>
      )}
      {maxLength ? (
        <Message> {value.length} characters.</Message>
      ) : maxWords ? (
        <Message> {`${getWords()} word${getWords() === 1 ? '' : 's'}.`}</Message>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TextArea
