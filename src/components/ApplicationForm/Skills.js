import React from 'react'
import { CenteredH1, P, QuestionHeading, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput, TextArea } from '../Input'
import ResumeUploadBtn from '../ResumeUploadBtn'
import { Select } from '../Input'
import { FormSpacing, SubHeading } from './'
import { CONTRIBUTION_ROLE_OPTIONS, copyText } from '../../utility/Constants'
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
        <QuestionHeading>question 13</QuestionHeading>
        <SubHeading>
          Is this your first hackathon?
          <Required />
        </SubHeading>
        {errors?.firstTimeHacker && <ErrorMessage>{errors?.firstTimeHacker}</ErrorMessage>}
        <Select
          type="radio"
          label="Yes"
          checked={formInputs.firstTimeHacker}
          onChange={() => onChange({ firstTimeHacker: true })}
          customRef={refs['firstTimeHackerRef']}
        />
        <Select
          type="radio"
          label="No"
          checked={formInputs.firstTimeHacker === false}
          onChange={() => onChange({ firstTimeHacker: false })}
        />
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 14</QuestionHeading>
        <SubHeading>
          How do you want to contribute at {copyText.hackathonName}? Please select the category that
          you're strongest in.
          <Required />
        </SubHeading>
        {errors?.contributionRole && <ErrorMessage>{errors?.contributionRole}</ErrorMessage>}
        {formInputs &&
          Object.entries(formInputs?.contributionRole)
            .sort()
            .map(([key, val]) => (
              <Select
                key={key}
                type="checkbox"
                label={CONTRIBUTION_ROLE_OPTIONS[key]}
                checked={val}
                onChange={() =>
                  onChange({
                    contributionRole: { ...formInputs.contributionRole, [key]: !val },
                  })
                }
                customRef={key === 'vegetarian' ? refs['contributionRoleRef'] : null}
              />
            ))}
        {formInputs?.contributionRole?.other && (
          <TextInput
            placeholder="Please Specify"
            size="small"
            noOutline
            value={formInputs?.otherContributionRole}
            onChange={e =>
              onChange({
                otherContributionRole: e.target.value,
              })
            }
          />
        )}
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
          Why do you want to attend cmd-f 2023? (max 200 words)
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
        <SubHeading size="1.25em">
          How would you make tech a more welcoming space to underrepresented demographics?
          <Required />
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

      <FormSpacing>
        <QuestionHeading>question 18</QuestionHeading>
        <SubHeading size="1.25em">
          In the past, have there been reasons deterring you from attending hackathons or other tech
          events? (optional)
        </SubHeading>
        <StyledTextArea
          maxWords="200"
          width="100%"
          value={formInputs.longAnswers3}
          invalid={!!errors.longAnswers3}
          errorMsg={errors.longAnswers3}
          onChange={val =>
            onChange({
              longAnswers3: val,
            })
          }
          customRef={refs['longAnswers3Ref']}
        />
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 19</QuestionHeading>
        <SubHeading size="1.25em">
          Is there anything you want to let us know to ensure that we can help you feel comfortable
          throughout the event? (optional)
        </SubHeading>
        <StyledTextArea
          maxWords="200"
          width="100%"
          value={formInputs.longAnswers4}
          invalid={!!errors.longAnswers4}
          errorMsg={errors.longAnswers4}
          onChange={val =>
            onChange({
              longAnswers4: val,
            })
          }
          customRef={refs['longAnswers4Ref']}
        />
      </FormSpacing>
    </>
  )
}
