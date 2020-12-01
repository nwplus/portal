import React, { useState } from 'react'
import { Dropdown, Select, TextInput } from '../../components/Input'
import { H1, QuestionHeading } from '../../components/Typography'

// form part 3
export default ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [otherOption, setOtherOption] = useState('')
  const [showOther, setShowOther] = useState('')
  const [selectStates, setSelectStates] = useState({
    multiselect: {
      option1: false, // LHD/Hack Camp
      option2: false, // nwHacks
      option3: false, // cmd-f
      option4: false, // cmd-f Phases
      option5: false, // nwPlus Workshop Series
      option6: false, // nwPlus Boothing
    },
  })

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

  const handleSelect = inputValue => {
    // Show other option if value is 8
    setSelectedOption(inputValue.label)

    if (inputValue.label === 'Other') {
      setShowOther(true)
    } else {
      setShowOther(false)
    }
  }

  return (
    <div>
      {children}
      <QuestionHeading>Question 14</QuestionHeading>
      <H1>How did you hear about nwHacks?</H1>
      <Dropdown
        options={options}
        placeholder={'Select an option'}
        isSearchable={false}
        onChange={inputValue => handleSelect(inputValue)}
        isValid
      />
      {showOther && (
        <div>
          <div>Please specify</div>
          <TextInput value={otherOption} onChange={e => setOtherOption(e.target.value)} />
        </div>
      )}

      <QuestionHeading>Question 15</QuestionHeading>
      <H1>Which nwPlus events have you been to? (Select all that apply)</H1>
      <Select
        type="checkbox"
        label="Local Hack Day / Hack Camp"
        checked={selectStates.multiselect.option1}
        onChange={() =>
          setSelectStates({
            ...selectStates,
            multiselect: {
              ...selectStates.multiselect,
              option1: !selectStates.multiselect.option1,
            },
          })
        }
      />
      <Select
        type="checkbox"
        label="nwHacks"
        checked={selectStates.multiselect.option2}
        onChange={() =>
          setSelectStates({
            ...selectStates,
            multiselect: {
              ...selectStates.multiselect,
              option2: !selectStates.multiselect.option2,
            },
          })
        }
      />
      <Select
        type="checkbox"
        label="cmd-f"
        checked={selectStates.multiselect.option3}
        onChange={() =>
          setSelectStates({
            ...selectStates,
            multiselect: {
              ...selectStates.multiselect,
              option3: !selectStates.multiselect.option3,
            },
          })
        }
      />
      <Select
        type="checkbox"
        label="cmd-f Phases"
        checked={selectStates.multiselect.option4}
        onChange={() =>
          setSelectStates({
            ...selectStates,
            multiselect: {
              ...selectStates.multiselect,
              option4: !selectStates.multiselect.option4,
            },
          })
        }
      />
      <Select
        type="checkbox"
        label="nwPlus Workshop Series"
        checked={selectStates.multiselect.option5}
        onChange={() =>
          setSelectStates({
            ...selectStates,
            multiselect: {
              ...selectStates.multiselect,
              option5: !selectStates.multiselect.option5,
            },
          })
        }
      />
      <Select
        type="checkbox"
        label="nwPlus Boothing"
        checked={selectStates.multiselect.option6}
        onChange={() =>
          setSelectStates({
            ...selectStates,
            multiselect: {
              ...selectStates.multiselect,
              option6: !selectStates.multiselect.option6,
            },
          })
        }
      />
    </div>
  )
}
