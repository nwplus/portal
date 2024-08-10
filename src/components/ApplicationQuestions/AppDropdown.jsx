import { Dropdown, TextInput } from '../Input'
import { ErrorMessage } from '../Typography'
import { findElement } from '../../utility/utilities'

const AppDropdown = ({ refs, errors, formInputs, onChange, question }) => {
  const transformOptions = (options, includeOther) => {
    const transformedOptions = options.map(option => {
      const intValue = parseInt(option, 10)
      const value = Number.isNaN(intValue) ? option : intValue

      return {
        value: value,
        label: option.toString(),
      }
    })

    if (includeOther) {
      transformedOptions.push({ value: 'other', label: 'Other' })
    }

    return transformedOptions
  }

  const toOtherCamelCase = str => {
    const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
    return `other${capitalizedStr}`
  }

  const dropdownOptions = transformOptions(question.options, question.other)

  return (
    <>
      {errors?.[question.formInput] && <ErrorMessage>{errors?.[question.formInput]}</ErrorMessage>}
      <Dropdown
        options={dropdownOptions}
        placeholder="Select"
        isSearchable={false}
        value={findElement(dropdownOptions, 'value', formInputs[question.formInput])}
        onChange={e => onChange({ [question.formInput]: e.value })}
        isValid={!errors?.[question.formInput]}
        customRef={refs[`${question.formInput}Ref`]}
      />
      {formInputs[question.formInput] === 'other' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs[toOtherCamelCase(question.formInput)]}
          onChange={e =>
            onChange({
              [toOtherCamelCase(question.formInput)]: e.target.value,
            })
          }
        />
      )}
    </>
  )
}

export default AppDropdown
