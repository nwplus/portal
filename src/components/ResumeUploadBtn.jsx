import React, { useRef } from 'react'
import { Button } from './Input'
import styled from 'styled-components'
import { ErrorMessage } from './Typography'

const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
`
const ResumeFile = ({ inputFile, onChange }) => {
  return <input ref={inputFile} type="file" accept=".pdf" hidden onChange={onChange} />
}

const StyledButton = styled(Button)`
  margin-left: 0;
`

const UploadButton = ({ handleClick, customRef }) => {
  return (
    <StyledButton color="secondary" onClick={handleClick} customRef={customRef}>
      Upload
    </StyledButton>
  )
}

const ResumeUploadBtn = ({ onChange, hint, errorMsg, customRef }) => {
  const inputFile = useRef()

  const handleClick = () => {
    inputFile.current.click()
  }

  return (
    <ResumeContainer>
      <ResumeFile inputFile={inputFile} onChange={onChange} />
      <UploadButton handleClick={handleClick} customRef={customRef} />
      {hint ? <span>✔ {hint} uploaded!</span> : <ErrorMessage>{errorMsg}</ErrorMessage>}
    </ResumeContainer>
  )
}

export default ResumeUploadBtn
