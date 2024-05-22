import React from 'react'
import styled from 'styled-components'
import { CONTRIBUTION_ROLE_OPTIONS, copyText } from '../../utility/Constants'
import { applyCustomSort, findElement } from '../../utility/utilities'
import { Select, TextArea, TextInput } from '../Input'
import Dropdown from '../Input/Dropdown'
import ResumeUploadBtn from '../ResumeUploadBtn'
import { CenteredH1, ErrorMessage, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import { FormSpacing, SubHeading } from '.'

const hackathonsAttendedOptions = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '5+', label: '5+' },
]

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

const FormGroup = styled.div`
  padding-top: 1rem;
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

const Skills = ({ refs, errors, formInputs, onChange, role, handleResume }) => {
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
        <QuestionHeading>question 21</QuestionHeading>
        <SubHeading>
          How many hackathons have you previously attended?
          <Required />
        </SubHeading>
        {errors?.numHackathonsAttended && (
          <ErrorMessage>{errors?.numHackathonsAttended}</ErrorMessage>
        )}
        <Dropdown
          options={hackathonsAttendedOptions}
          placeholder="Number of Hackathons"
          isSearchable={false}
          value={findElement(hackathonsAttendedOptions, 'value', formInputs.numHackathonsAttended)}
          onChange={e =>
            onChange({
              numHackathonsAttended: e.value,
            })
          }
          isValid={!errors?.numHackathonsAttended}
          customRef={refs['numHackathonsAttendedRef']}
        />
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 22</QuestionHeading>
        <SubHeading>
          What is your intended role at {copyText.hackathonName}?
          <Required />
        </SubHeading>
        {errors?.contributionRole && <ErrorMessage>{errors?.contributionRole}</ErrorMessage>}
        {formInputs &&
          applyCustomSort(
            Object.entries(formInputs?.contributionRole),
            Object.keys(CONTRIBUTION_ROLE_OPTIONS)
          ).map(([key, val]) => (
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

      <SubHeading>Long Answer Questions</SubHeading>

      <FormSpacing>
        <FormGroup>
          <QuestionHeading>question 23</QuestionHeading>
          <SubHeading size="1.25em">
            Why do you want to attend cmd-f 2024? (150 words max)
            <Required />
          </SubHeading>
          <StyledTextArea
            maxWords="150"
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
        </FormGroup>
        <FormGroup>
          <QuestionHeading>question 24</QuestionHeading>
          <SubHeading size="1.25em">
            How would you make tech a more welcoming space for underrepresented demographics? (150
            words max)
            <Required />
          </SubHeading>
          <StyledTextArea
            maxWords="150"
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
        </FormGroup>
        <FormGroup>
          <QuestionHeading>question 25</QuestionHeading>
          <SubHeading size="1.25em">
            Tell us about a project you’re really proud of and what you learned from it. (200 words
            max)
            <Required />
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
        </FormGroup>

        <FormGroup>
          <QuestionHeading>question 26</QuestionHeading>
          <SubHeading size="1.25em">
            In the past, have there been reasons deterring you from attending hackathons or other
            tech events? (optional)
          </SubHeading>
          <StyledTextArea
            width="100%"
            value={formInputs.longAnswers4}
            onChange={val =>
              onChange({
                longAnswers4: val,
              })
            }
            customRef={refs['longAnswers4Ref']}
          />
        </FormGroup>

        <FormGroup>
          <QuestionHeading>question 27</QuestionHeading>
          <SubHeading size="1.25em">
            Is there anything you want to let us know to ensure that we can help you feel
            comfortable throughout the event? (optional)
          </SubHeading>
          <StyledTextArea
            width="100%"
            value={formInputs.longAnswers5}
            onChange={val =>
              onChange({
                longAnswers5: val,
              })
            }
            customRef={refs['longAnswers5']}
          />
        </FormGroup>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 28</QuestionHeading>
        <SubHeading>
          Help us get to know you better by providing as many links as you feel will support your
          application!
        </SubHeading>

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
          <P>Maximum file size of 2MB</P>
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
    </>
  )
}

export default Skills
