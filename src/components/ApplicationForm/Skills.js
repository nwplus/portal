import React from 'react'
import { CenteredH1, H3, QuestionHeading, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput, TextArea } from '../Input'
import ResumeUploadBtn from '../ResumeUploadBtn'
import { findElement } from '../../utility/utilities'
import Dropdown from '../Input/Dropdown'
import { FormSpacing, SubHeading } from './'
import styled from 'styled-components'

const hackathonOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4+' },
]

const QuestionForm = styled.form`
  display: table;
  position: relative;
  & > div {
    display: table-row;

    & > * {
      display: table-cell;
    }
  }
  ${p => p.theme.mediaQueries.tabletLarge} {
    & > div {
      display: block;
      & > * {
        display: block;
        margin: 0.5em 0;
      }
    }
  }
`

const QuestionRow = styled(QuestionHeading)`
  padding-right: 4em;
  ${p => p.theme.mediaQueries.xs} {
    padding-right: 1em;
  }
`

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

const FormRow = ({ id, children }) => (
  <div>
    <QuestionRow>{id}</QuestionRow>
    <div>{children}</div>
  </div>
)

export default ({ errors, formInputs, onChange, role, handleResume }) => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Flex your skills!{' '}
          <span role="img" aria-label="muscle">
            💪
          </span>
        </CenteredH1>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 12</QuestionHeading>
        <SubHeading>
          How many hackathons have you attended (both online and in-person)?
          <Required />
        </SubHeading>
        {errors?.hackathonsAttended && <ErrorMessage>{errors?.hackathonsAttended}</ErrorMessage>}
        <Dropdown
          options={hackathonOptions}
          placeholder="Number of Hackathons"
          isSearchable={false}
          value={findElement(hackathonOptions, 'value', formInputs.hackathonsAttended)}
          onChange={inputValue =>
            onChange({
              hackathonsAttended: inputValue.value,
            })
          }
          isValid={!errors?.hackathonsAttended}
        />
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 13</QuestionHeading>
        <SubHeading color="primary">
          Answer one of the two questions:
          <Required />
        </SubHeading>
        <SubHeading size="1.25em">
          1. Describe how you became interested in the world of technology and where you hope to go
          from here on out!
        </SubHeading>
        <SubHeading size="1.25em">
          2. How would you like to challenge yourself during this hackathon?
        </SubHeading>
        <StyledTextArea
          maxLength="650"
          width="100%"
          value={formInputs.longAnswers}
          invalid={!!errors.longAnswers}
          errorMsg={errors.longAnswers}
          onChange={val =>
            onChange({
              longAnswers: val,
            })
          }
        />
      </FormSpacing>
    </>
  )
}
