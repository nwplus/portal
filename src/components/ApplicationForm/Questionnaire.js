import React from 'react'
import styled from 'styled-components'
import { Dropdown, Select, TextInput } from '../../components/Input'
import { QuestionHeading } from '../../components/Typography'
import { FormSpacing, SubHeading } from './'
import { CenteredH1, P } from '../Typography'
import { findElement } from '../../utility/utilities'
import { copyText } from '../../utility/Constants'

const StyledDropdown = styled(Dropdown)`
  .react-select__control {
    margin: 0 0 1em;
  }
`

const StyledTextInput = styled(TextInput)`
  margin: 0.5em 1em 1em 0;
`

export const options = [
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
export default ({ errors, formInputs, onChange }) => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Almost there...{' '}
          <span role="img" aria-label="Ghost emoji">
            👻
          </span>
        </CenteredH1>
      </FormSpacing>
      <FormSpacing>
        <QuestionHeading>Question 15</QuestionHeading>
        <SubHeading>How did you hear about {copyText.hackathonName}?</SubHeading>
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
        <QuestionHeading>Question 16</QuestionHeading>
        <SubHeading>
          <span role="img" aria-label="Grinning face with star eyes emoji">
            🤩
          </span>{' '}
          Have you previously attended any cmd-f organized events? (select all that apply)
        </SubHeading>
        <Select
          type="checkbox"
          label="connect-f Mentorship Program"
          checked={formInputs.eventsAttended.mentorship}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                mentorship: !formInputs.eventsAttended.mentorship,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f Phase 1: Resume Review &amp; Networking"
          checked={formInputs.eventsAttended.phase1}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                phase1: !formInputs.eventsAttended.phase1,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f Phase 2: Intro to LinkedIn &amp; Networking Workshop"
          checked={formInputs.eventsAttended.phase2}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                phase2: !formInputs.eventsAttended.phase2,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2019"
          checked={formInputs.eventsAttended.cmdf2019}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2019: !formInputs.eventsAttended.cmdf2019,
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
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 17</QuestionHeading>
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
      </FormSpacing>
    </>
  )
}
