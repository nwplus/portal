import React from 'react'
import { CenteredH1, H3, QuestionHeading, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput, TextArea } from '../Input'
import ResumeUploadBtn from '../ResumeUploadBtn'
import { findElement } from '../../utility/utilities'
import Dropdown from '../Input/Dropdown'
import { FormSpacing, SubHeading } from './'
import styled from 'styled-components'

const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    & > *:nth-child(1) {
      flex-grow: 1;
      margin: 0;
      width: 30%;
    }
    & > *:nth-child(2) {
      flex-grow: 1;
      margin: 0;
      width: 60%;
      & > div {
        margin-left: 0;
        padding-right: 0.5em;
      }
    }
  }
  ${p => p.theme.mediaQueries.tabletLarge} {
    & > div {
      flex-direction: column;
      align-items: stretch;
      & > * {
        width: 100%;
        display: block;
        margin: 0.5em 0;
      }
      & > *:nth-child(1),
      & > *:nth-child(2) {
        width: 100%;
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

const H3A = styled(H3)`
  opacity: 1;
`

const FormRow = ({ fieldValue, required, children }) => (
  <div>
    <QuestionRow>
      {fieldValue}
      {required && <Required />}
    </QuestionRow>
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
          <FormRow fieldValue="resume" required>
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
              <FormRow fieldValue="Personal website/portfolio link" required>
                <TextInput
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
                  customRef={refs['portfolioRef']}
                />
              </FormRow>
              <FormRow fieldValue="GitHub/BitBucket/GitLab">
                <TextInput
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
              <FormRow fieldValue="GitHub/BitBucket/GitLab" required>
                <TextInput
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
                  customRef={refs['githubRef']}
                />
              </FormRow>
              <FormRow fieldValue="Personal website/portfolio link">
                <TextInput
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
        <QuestionHeading>question 14</QuestionHeading>
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
        <SubHeading size="1.25em">
          2. Choose one of the following:
          <Required />
        </SubHeading>
        <H3A>A. How would you like to challenge yourself during this hackathon?</H3A>
        <H3A>
          B. Describe a time where you went above and beyond of your role to demonstrate leadership
          in a project.
        </H3A>
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
