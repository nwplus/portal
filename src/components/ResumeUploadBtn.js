import React, { useRef } from 'react'
import { Button } from '../components/Input'
import styled from 'styled-components'
import { ErrorMessage } from './Typography'

const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
`
const ResumeFile = ({ inputFile, onChange }) => {
  return <input ref={inputFile} type="file" hidden onChange={onChange} />
}

const UploadButton = ({ handleClick }) => {
  return (
    <Button color="tertiary" onClick={handleClick}>
      Upload
    </Button>
  )
}

export default ({ onChange, hint, errorMsg }) => {
  const inputFile = useRef()

  const handleClick = () => {
    inputFile.current.click()
  }

  return (
    <ResumeContainer>
      <ResumeFile inputFile={inputFile} onChange={onChange} />
      <UploadButton handleClick={handleClick} />
      {hint !== undefined &&
        (hint ? (
          <span>{hint.match(/[/\\]([\w\d\s.\-()]+)$/)[1]}</span>
        ) : (
          <ErrorMessage>{errorMsg}</ErrorMessage>
        ))}
    </ResumeContainer>
  )
}
