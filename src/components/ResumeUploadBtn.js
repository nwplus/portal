import React, { useRef } from 'react'
import { Button } from '../components/Input'
import { QuestionHeading } from '../components/Typography'
import styled from 'styled-components'
import { TextInputLikeErrorMsg } from './Common'

const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
`

export default ({ onChange, isValid, hint, errorMsg }) => {
  const inputFile = useRef()

  const handleClick = () => {
    inputFile.current.click()
  }

  const resumeFile = <input ref={inputFile} type="file" hidden onChange={onChange} />
  const button = (
    <Button color="tertiary" onClick={handleClick}>
      Upload
    </Button>
  )

  return (
    <ResumeContainer>
      <QuestionHeading>resume</QuestionHeading>
      {resumeFile}
      {button}
      {isValid ? (
        <span>{hint.match(/[/\\]([\w\d\s.\-()]+)$/)[1]}</span>
      ) : (
        <TextInputLikeErrorMsg>{errorMsg}</TextInputLikeErrorMsg>
      )}
    </ResumeContainer>
  )
}
