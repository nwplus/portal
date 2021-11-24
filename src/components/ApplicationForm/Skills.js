import React from 'react'
import { CenteredH1, H3, QuestionHeading, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput, TextArea } from '../Input'
import ResumeUploadBtn from '../ResumeUploadBtn'
import { findElement } from '../../utility/utilities'
import Dropdown from '../Input/Dropdown'
import { FormSpacing, SubHeading } from './'
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

const hackathonOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4+' },
]

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

const FormRow = ({ fieldValue, children }) => (
  <div>
    <QuestionRow>{fieldValue}</QuestionRow>
    <div>{children}</div>
  </div>
)

export default ({ refs, errors, formInputs, onChange, role, handleResume }) => {
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
        <SubHeading>
          {' '}
          Don't be shy! Show off your wonderful skills{' '}
          <span role="img" aria-label="smiling face">
            😁
          </span>
        </SubHeading>
        <H3>
          (Please ensure the links are publicly accessible by opening them in an incognito browser)
        </H3>

        <QuestionForm>
          <FormRow fieldValue="resume">
            <ResumeUploadBtn
              onChange={e => {
                if (e.target.files[0]) {
                  handleResume(e.target.files[0])
                }
              }}
              hint={formInputs.resume}
              customRef={refs['resumeRef']}
            />
            {errors?.resume && <ErrorMessage>{errors?.resume}</ErrorMessage>}
          </FormRow>

          {role === 'designer' ? (
            <>
              <FormRow fieldValue="Personal website/portfolio link">
                <TextInput
                  inline
                  placeholder="Required"
                  size="large"
                  value={formInputs.portfolio}
                  invalid={!!errors.portfolio}
                  errorMsg={errors.portfolio}
                  onChange={e =>
                    onChange({
                      portfolio: e.target.value,
                    })
                  }
                />
              </FormRow>
              <FormRow fieldValue="GitHub/BitBucket/GitLab">
                <TextInput
                  inline
                  placeholder="Optional"
                  size="large"
                  value={formInputs.github}
                  invalid={!!errors.github}
                  errorMsg={errors.github}
                  onChange={e =>
                    onChange({
                      github: e.target.value,
                    })
                  }
                />
              </FormRow>
            </>
          ) : (
            <>
              <FormRow fieldValue="GitHub/BitBucket/GitLab">
                <TextInput
                  inline
                  placeholder="Required"
                  size="large"
                  value={formInputs.github}
                  invalid={!!errors.github}
                  errorMsg={errors.github}
                  onChange={e =>
                    onChange({
                      github: e.target.value,
                    })
                  }
                />
              </FormRow>
              <FormRow fieldValue="Personal website/portfolio link">
                <TextInput
                  inline
                  placeholder="Optional"
                  size="large"
                  value={formInputs.portfolio}
                  invalid={!!errors.portfolio}
                  errorMsg={errors.portfolio}
                  onChange={e =>
                    onChange({
                      portfolio: e.target.value,
                    })
                  }
                />
              </FormRow>
            </>
          )}

          <FormRow fieldValue="linkedin">
            <TextInput
              inline
              placeholder="Optional"
              size="large"
              value={formInputs.linkedin}
              invalid={!!errors.linkedin}
              errorMsg={errors.linkedin}
              onChange={e =>
                onChange({
                  linkedin: e.target.value,
                })
              }
            />
          </FormRow>
        </QuestionForm>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 13</QuestionHeading>
        <SubHeading color="primary">Two written questions:</SubHeading>
        <SubHeading size="1.25em">
          1. What should technology be used for?
          <Required />
        </SubHeading>
        <StyledTextArea
          maxLength="650"
          width="100%"
          value={formInputs.longAnswers1}
          invalid={!!errors.longAnswers1}
          errorMsg={errors.longAnswers1}
          onChange={val =>
            onChange({
              longAnswers1: val,
            })
          }
        />
        <SubHeading size="1.5em">
          Choose one of the following:
          <Required />
        </SubHeading>
        <SubHeading size="1.25em">
          1: How would you like to challenge yourself during this hackathon?
        </SubHeading>
        <SubHeading size="1.25em">
          2. Describe a time where you went above and beyond of your role to demonstrate leadership
          in a project.
        </SubHeading>
        <StyledTextArea
          maxLength="650"
          width="100%"
          value={formInputs.longAnswers2}
          invalid={!!errors.longAnswers2}
          errorMsg={errors.longAnswers2}
          onChange={val =>
            onChange({
              longAnswers2: val,
            })
          }
          customRef={refs['longAnswersRef']}
        />
      </FormSpacing>
    </>
  )
}
