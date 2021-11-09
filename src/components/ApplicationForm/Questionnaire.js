import React from 'react'
import styled from 'styled-components'
import { Dropdown, Select, TextInput } from '../../components/Input'
import { QuestionHeading } from '../../components/Typography'
import { FormSpacing, SubHeading } from './'
import { CenteredH1 } from '../Typography'
import { findElement } from '../../utility/utilities'

const StyledDropdown = styled(Dropdown)`
  .react-select__control {
    margin: 0 0 1em;
  }
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
export default ({ formInputs, onChange }) => {
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
        <QuestionHeading>Question 14</QuestionHeading>
        <SubHeading>How did you hear about nwHacks?</SubHeading>
        <StyledDropdown
          options={options}
          placeholder={'Select an option'}
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
        <QuestionHeading>Question 15</QuestionHeading>
        <SubHeading>Which nwPlus events have you been to? (Select all that apply)</SubHeading>
        <Select
          type="checkbox"
          label="Local Hack Day / Hack Camp"
          checked={formInputs.eventsAttended.option1}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                option1: !formInputs.eventsAttended.option1,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks"
          checked={formInputs.eventsAttended.option2}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                option2: !formInputs.eventsAttended.option2,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f"
          checked={formInputs.eventsAttended.option3}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                option3: !formInputs.eventsAttended.option3,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f Phases"
          checked={formInputs.eventsAttended.option4}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                option4: !formInputs.eventsAttended.option4,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwPlus Boothing"
          checked={formInputs.eventsAttended.option6}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                option6: !formInputs.eventsAttended.option6,
              },
            })
          }
        />
      </FormSpacing>
    </>
  )
}
