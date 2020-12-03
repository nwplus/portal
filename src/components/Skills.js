import React from 'react'
import { CenteredH1, H1, H2, QuestionHeading } from '../components/Typography'
import { TextInput, TextArea } from '../components/Input'
import ResumeUploadBtn from '../components/ResumeUploadBtn'
import { FormSpacing } from '../components/ApplicationForm'
import styled from 'styled-components'

const QuestionForm = styled.form`
  display: table;
  position: relative;
  & > div {
    display: table-row;

    & > * {
      display: table-cell;
    }
  }
`

// #todo: remove the following after part-1 is merged
const QuestionRow = styled(QuestionHeading)`
  padding-right: 4em;
`

const FormRow = ({ id, children }) => (
  <div>
    <QuestionRow>{id}</QuestionRow>
    <div>{children}</div>
  </div>
)

export default ({ formInputs, onChange }) => {
  return (
    <>
      <CenteredH1>
        Flex your skills!{' '}
        <span role="img" aria-label="muscle">
          &#128170;
        </span>
      </CenteredH1>

      <FormSpacing>
        <QuestionHeading>question 12</QuestionHeading>
        <H1 size="1.5em">
          {' '}
          Don't be shy! Show off your wonderful skills{' '}
          <span role="img" aria-label="smiling face">
            &#128513;
          </span>
        </H1>
        <H2>
          (Please ensure the links are publicly accessible by opening them in an incognito browser)
        </H2>

        <QuestionForm>
          <FormRow id="resume">
            <ResumeUploadBtn
              onChange={e => {
                if (e.target.files[0]) {
                  onChange({
                    ...formInputs,
                    resume: e.target.files[0],
                  })
                }
              }}
            />
          </FormRow>

          <FormRow id="github">
            <TextInput
              placeholder="Required"
              size="large"
              value={formInputs.github}
              onChange={e =>
                onChange({
                  ...formInputs,
                  github: e.target.value,
                })
              }
            ></TextInput>
          </FormRow>

          <FormRow id="linkedin">
            <TextInput
              placeholder="Optional"
              size="large"
              value={formInputs.linkedin}
              onChange={e =>
                onChange({
                  ...formInputs,
                  linkedin: e.target.value,
                })
              }
            ></TextInput>
          </FormRow>

          <FormRow id="portfolio">
            <TextInput
              placeholder="Optional"
              size="large"
              value={formInputs.portfolio}
              onChange={e =>
                onChange({
                  ...formInputs,
                  portfolio: e.target.value,
                })
              }
            ></TextInput>
          </FormRow>
        </QuestionForm>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 13</QuestionHeading>
        <H1 color="" size="1.5em">
          {' '}
          Answer one of the two questions:{' '}
        </H1>
        <H1 size="1.5em">
          1. Describe how you became interested in the world of technology and here you hope to go
          from here on out!
        </H1>
        <H1 size="1.5em">2. How would you like to challenge yourself during this hackathon?</H1>
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
      </FormSpacing>

      <FormSpacing>
        <CenteredH1>
          Flex your skills!{' '}
          <span role="img" aria-label="muscle">
            &#128170;
          </span>
        </CenteredH1>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 12</QuestionHeading>
        <H1 size="1.5em">
          {' '}
          Don't be shy! Show off your wonderful skills{' '}
          <span role="img" aria-label="smiling face">
            &#128513;
          </span>
        </H1>
        <H2>
          (Please ensure the links are publicly accessible by opening them in an incognito browser)
        </H2>

        <QuestionForm>
          <FormRow id="resume">
            <ResumeUploadBtn
              onChange={e => {
                if (e.target.files[0]) {
                  onChange({
                    ...formInputs,
                    resume: e.target.files[0],
                  })
                }
              }}
            />
          </FormRow>

          <FormRow id="portfolio">
            <TextInput
              placeholder="Required"
              size="large"
              value={formInputs.portfolio}
              onChange={e =>
                onChange({
                  ...formInputs,
                  portfolio: e.target.value,
                })
              }
            ></TextInput>
          </FormRow>

          <FormRow id="linkedin">
            <TextInput
              placeholder="Optional"
              size="large"
              value={formInputs.linkedin}
              onChange={e =>
                onChange({
                  ...formInputs,
                  linkedin: e.target.value,
                })
              }
            ></TextInput>
          </FormRow>

          <FormRow id="github">
            <TextInput
              placeholder="Optional"
              size="large"
              value={formInputs.github}
              onChange={e =>
                onChange({
                  ...formInputs,
                  github: e.target.value,
                })
              }
            ></TextInput>
          </FormRow>
        </QuestionForm>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 13</QuestionHeading>
        <H1 size="1.5em"> Answer one of the two questions: </H1>
        <H1 size="1.5em">
          1. Describe how you became interested in the world of technology and here you hope to go
          from here on out!
        </H1>
        <H1 size="1.5em">2. How would you like to challenge yourself during this hackathon?</H1>
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
      </FormSpacing>
    </>
  )
}
