import React from 'react'
import { H1, H2, QuestionHeading } from '../components/Typography'
import { TextInput, TextArea } from '../components/Input'
import ResumeUploadBtn from '../components/ResumeUploadBtn'
import styled from 'styled-components'

const StyledQuestionHeading = styled(QuestionHeading)`
  margin-right: 9em;
`

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
`

export default ({ formInputs, onChange }) => {
  return (
    <>
      <H1>
        Flex your skills!{' '}
        <span role="img" aria-label="muscle">
          &#128170;
        </span>
      </H1>
      <QuestionHeading>question 12</QuestionHeading>
      <H1>
        {' '}
        Don't be shy! Show off your wonderful skills{' '}
        <span role="img" aria-label="smiling face">
          &#128513;
        </span>
        (Please ensure the links are publicly accessible by opening them in an incognito browser)
      </H1>

      <QuestionHeading>resume</QuestionHeading>
      <ResumeUploadBtn
        onChange={e =>
          onChange({
            ...formInputs,
            resume: e.target.value,
          })
        }
      />

      <QuestionHeading>github</QuestionHeading>
      <TextInput
        placeholder="Required"
        value={formInputs.github}
        onChange={e =>
          onChange({
            ...formInputs,
            github: e.target.value,
          })
        }
      ></TextInput>

      <QuestionHeading>linkedin</QuestionHeading>
      <TextInput
        placeholder="Optional"
        value={formInputs.linkedin}
        onChange={e =>
          onChange({
            ...formInputs,
            linkedin: e.target.value,
          })
        }
      ></TextInput>

      <QuestionHeading>portfolio</QuestionHeading>
      <TextInput
        placeholder="Optional"
        value={formInputs.portfolio}
        onChange={e =>
          onChange({
            ...formInputs,
            portfolio: e.target.value,
          })
        }
      ></TextInput>

      <QuestionHeading>question 13</QuestionHeading>
      <H1> Answer one of the two questions: </H1>
      <H2>
        {' '}
        1. Describe how you became interested in the world of technology and here you hope to go
        from here on out!
      </H2>
      <H2> 2. How would you like to challenge yourself during this hackathon? </H2>
      <TextArea
        placeholder=""
        maxLength="650"
        value={formInputs.longAnswer}
        onChange={val =>
          onChange({
            ...formInputs,
            longAnswer: val,
          })
        }
      ></TextArea>
    </>
  )
}

{
  /* <QuestionContainer>
<ColumnContainer>
  <QuestionHeading>resume</QuestionHeading>
  <QuestionHeading>github</QuestionHeading>
  <QuestionHeading>linkedin</QuestionHeading>
  <QuestionHeading>portfolio</QuestionHeading>
</ColumnContainer>

<ColumnContainer>
  <ResumeUploadBtn
    onChange={e => onChange({
      ...formInputs,
      resume: e.target.value
    })}
    />
  <TextInput 
  placeholder='Required' 
  value={formInputs.github}
  onChange={e => onChange({
    ...formInputs,
    github: e.target.value
  })}></TextInput>
  <TextInput 
  placeholder='Optional'  
  value={formInputs.linkedin}
  onChange={e => onChange({
    ...formInputs,
    linkedin: e.target.value
  })}></TextInput>
  <TextInput 
  placeholder='Optional' 
  value={formInputs.portfolio}
  onChange={e => onChange({
    ...formInputs,
    portfolio: e.target.value
  })}></TextInput>
</ColumnContainer>
</QuestionContainer> */
}
