import React from 'react'
import styled from 'styled-components'
import { Dropdown, Select, TextInput } from '../../components/Input'
import { H1, QuestionHeading } from '../../components/Typography'

const StyledDropdown = styled(Dropdown)`
  .react-select__control {
    margin: 0 0 1em;
  }
`

const QuestionContainer = styled.div`
  margin-bottom: 6em;
`

// form part 3
export default ({ formInputs, onChange }) => {
  const options = [
    { value: '1', label: 'MLH' },
    { value: '2', label: 'Social media' },
    { value: '3', label: 'Website' },
    { value: '4', label: 'Word of mouth' },
    { value: '5', label: 'Club newsletter' },
    { value: '6', label: 'Faculty newsletter' },
    { value: '7', label: 'Professor/in class' },
    { value: '8', label: 'Other' },
  ]

  return (
    <>
      <QuestionContainer>
        <QuestionHeading>Question 14</QuestionHeading>
        <H1 size="1.5em">How did you hear about nwHacks?</H1>
        <StyledDropdown
          options={options}
          placeholder={'Select an option'}
          isSearchable={false}
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
            onChange={e =>
              onChange({
                ...formInputs,
                otherEngagementSource: e.target.value,
              })
            }
          />
        )}
      </QuestionContainer>

      <QuestionContainer>
        <QuestionHeading>Question 15</QuestionHeading>
        <H1 size="1.5em">Which nwPlus events have you been to? (Select all that apply)</H1>
        <Select
          type="checkbox"
          label="Local Hack Day / Hack Camp"
          checked={formInputs.eventsAttended.option1}
          onChange={() =>
            onChange({
              ...formInputs,
              multiselect: {
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
              multiselect: {
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
              multiselect: {
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
              multiselect: {
                ...formInputs.eventsAttended,
                option4: !formInputs.eventsAttended.option4,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwPlus Workshop Series"
          checked={formInputs.eventsAttended.option5}
          onChange={() =>
            onChange({
              ...formInputs,
              multiselect: {
                ...formInputs.eventsAttended,
                option5: !formInputs.eventsAttended.option5,
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
              multiselect: {
                ...formInputs.eventsAttended,
                option6: !formInputs.eventsAttended.option6,
              },
            })
          }
        />
      </QuestionContainer>
    </>
  )
}
