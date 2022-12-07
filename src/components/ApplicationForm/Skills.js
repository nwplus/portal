import React from 'react'
import { CenteredH1, P, QuestionHeading, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput, TextArea } from '../Input'
import ResumeUploadBtn from '../ResumeUploadBtn'
import { Select } from '../Input'
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

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
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
        <QuestionHeading>question 14</QuestionHeading>
        <SubHeading>
          Is this your first hackathon?
          <Required />
        </SubHeading>
        {errors?.hackathonsAttended && <ErrorMessage>{errors?.hackathonsAttended}</ErrorMessage>}
        <Select
          type="radio"
          label="Yes"
          checked={formInputs.hackathonsAttended}
          onChange={() => onChange({ hackathonsAttended: true })}
          customRef={refs['hackathonsAttendedRef']}
        />
        <Select
          type="radio"
          label="No"
          checked={formInputs.hackathonsAttended === false}
          onChange={() => onChange({ hackathonsAttended: false })}
        />
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 15</QuestionHeading>
        <SubHeading>
          Help us get to know you better by providing as many links as you feel will support your
          registration!
        </SubHeading>
        <P>
          We will be looking at your resume and GitHub if you're a developer, and we will be looking
          at your resume and portfolio if you're a designer. Please ensure the links are publicly
          accessible by opening them in an incognito browser. Resume cannot exceed 2MB and must be a
          PDF document.
        </P>

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
        <QuestionHeading>question 16</QuestionHeading>
        <SubHeading>General question</SubHeading>
        <P>
          Although many come to hackathons to work together to build a software project, we
          recognize that there may be other reasons for attending an hackathon, such as attending
          workshops, or connecting with sponsors.
        </P>
        <SubHeading size="1.25em">
          In your own words, describe your definition of a hackathon, and what it means to you. (max
          200 words)
          <Required />
        </SubHeading>
        <StyledTextArea
          maxWords="200"
          width="100%"
          value={formInputs.longAnswers1}
          invalid={!!errors.longAnswers1}
          errorMsg={errors.longAnswers1}
          onChange={val =>
            onChange({
              longAnswers1: val,
            })
          }
          customRef={refs['longAnswers1Ref']}
        />
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 17</QuestionHeading>
        <SubHeading>Open ended question!</SubHeading>
        <P>
          We recommend to not write more than a paragraph. Your response should be concise, sweet
          and sufficient.
        </P>
        <SubHeading size="1.25em">
          Please answer one of below two questions (max 200 words) <Required /> <br />
          Option 1: How would you like to challenge yourself during this hackathon? <br />
          Option 2: What should technology be used for?
        </SubHeading>
        <StyledTextArea
          maxWords="200"
          width="100%"
          value={formInputs.longAnswers2}
          invalid={!!errors.longAnswers2}
          errorMsg={errors.longAnswers2}
          onChange={val =>
            onChange({
              longAnswers2: val,
            })
          }
          customRef={refs['longAnswers2Ref']}
        />
      </FormSpacing>
    </>
  )
}
