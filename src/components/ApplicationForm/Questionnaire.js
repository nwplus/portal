import React from 'react'
import styled from 'styled-components'
import { Dropdown, Select, TextInput } from '../../components/Input'
import { ErrorMessage, QuestionHeading, ErrorSpan as Required } from '../../components/Typography'
import { copyText } from '../../utility/Constants'
import { findElement } from '../../utility/utilities'
import { CenteredH1 } from '../Typography'
import { FormSpacing, SubHeading } from './'

const StyledDropdown = styled(Dropdown)`
  .react-select__control {
    margin: 0 0 1em;
  }
`

// const StyledTextInput = styled(TextInput)`
//   margin: 0.5em 1em 1em 0;
// `

export const options = [
  { value: '0', label: 'LinkedIn' },
  { value: '1', label: 'MLH' },
  { value: '2', label: 'Social media' },
  { value: '3', label: 'Website' },
  { value: '4', label: 'Word of mouth' },
  { value: '5', label: 'Club newsletter' },
  { value: '6', label: 'Faculty newsletter' },
  { value: '7', label: 'Professor/in class' },
  { value: '8', label: 'Other' },
]

// form part 3
const Questionnaire = ({ errors, formInputs, onChange }) => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Almost there...{' '}
          <span role="img" aria-label="Grinning face with star eyes emoji">
            🤩
          </span>
        </CenteredH1>
      </FormSpacing>
      <FormSpacing>
        <QuestionHeading>Question 23</QuestionHeading>
        <SubHeading>
          How did you hear about {copyText.hackathonName}?
          <Required />
        </SubHeading>
        {errors?.engagementSource && <ErrorMessage>{errors?.resume}</ErrorMessage>}
        <StyledDropdown
          options={options}
          placeholder="Select an option"
          isSearchable={false}
          value={findElement(options, 'label', formInputs.engagementSource)}
          onChange={inputValue =>
            onChange({
              ...formInputs,
              engagementSource: inputValue.label,
            })
          }
          isValid
        />
        {formInputs.engagementSource === 'Other' && (
          <TextInput
            placeholder="Please Specify"
            size="small"
            noOutline
            inline
            value={formInputs.otherEngagementSource}
            onChange={e =>
              onChange({
                ...formInputs,
                otherEngagementSource: e.target.value,
              })
            }
          />
        )}
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>Question 24</QuestionHeading>
        <SubHeading>
          Have you previously attended any nwPlus organized events? (select all that apply)
          <Required />
        </SubHeading>
        <Select
          type="checkbox"
          label="HackCamp 2021"
          checked={formInputs.eventsAttended.hackCamp2021}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                hackCamp2021: !formInputs.eventsAttended.hackCamp2021,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="HackCamp 2022"
          checked={formInputs.eventsAttended.hackCamp2022}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                hackCamp2022: !formInputs.eventsAttended.hackCamp2022,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="HackCamp 2023"
          checked={formInputs.eventsAttended.hackCamp2023}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                hackCamp2023: !formInputs.eventsAttended.hackCamp2023,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2021"
          checked={formInputs.eventsAttended.nwHacks2021}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2021: !formInputs.eventsAttended.nwHacks2021,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2022"
          checked={formInputs.eventsAttended.nwHacks2022}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2022: !formInputs.eventsAttended.nwHacks2022,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2023"
          checked={formInputs.eventsAttended.nwHacks2023}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2023: !formInputs.eventsAttended.nwHacks2023,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2020"
          checked={formInputs.eventsAttended.cmdf2020}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2020: !formInputs.eventsAttended.cmdf2020,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2021"
          checked={formInputs.eventsAttended.cmdf2021}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2021: !formInputs.eventsAttended.cmdf2021,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2022"
          checked={formInputs.eventsAttended.cmdf2022}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2022: !formInputs.eventsAttended.cmdf2022,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2023"
          checked={formInputs.eventsAttended.cmdf2023}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2023: !formInputs.eventsAttended.cmdf2023,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="None"
          checked={formInputs.eventsAttended.none}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                none: !formInputs.eventsAttended.none,
              },
            })
          }
        />
      </FormSpacing>

      {/* <FormSpacing>
        <QuestionHeading>question 19</QuestionHeading>
        <SubHeading>
          Are you registering with a friend? If so, insert their email here for a chance to win a
          small prize!
        </SubHeading>
        <P>
          Please ensure this email is the same one your friend is using to apply with. Including an
          email here does not register you as a team.
        </P>
        <StyledTextInput
          placeholder="hacker@nwplus.io"
          value={formInputs.friendEmail}
          errorMsg={errors?.friendEmail}
          invalid={!!errors?.friendEmail}
          onChange={e =>
            onChange({
              friendEmail: e.target.value,
            })
          }
        />
      </FormSpacing> */}
    </>
  )
}

export default Questionnaire
