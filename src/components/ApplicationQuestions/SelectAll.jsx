import { ErrorMessage } from '../Typography'
import { applyCustomSort, toCamelCase, toOtherCamelCase } from '../../utility/utilities'
import { TextInput, Select } from '../Input'

const SelectAll = ({ refs, errors, formInputs, onChange, question }) => {
  const transformSelectAllOptions = (options, includeOther) => {
    const transformedOptions = options.reduce((acc, option) => {
      acc[toCamelCase(option)] = option.toString()
      return acc
    }, {})

    if (includeOther) {
      transformedOptions.other = 'Other (Please specify)'
    }

    return transformedOptions
  }

  const selectAllOptions = transformSelectAllOptions(question.options, question.other)

  return (
    <>
      {errors?.[question.formInput] && <ErrorMessage>{errors?.[question.formInput]}</ErrorMessage>}
      {formInputs &&
        applyCustomSort(
          Object.entries(formInputs?.[question.formInput]),
          Object.keys(selectAllOptions)
        ).map(([key, val]) => (
          <Select
            key={key}
            type="checkbox"
            label={selectAllOptions[key]}
            checked={val}
            onChange={() => {
              onChange({
                [question.formInput]: { ...formInputs[question.formInput], [key]: !val },
              })
            }}
            {...(refs ? { customRef: refs[`${question.formInput}Ref`] } : {})}
          />
        ))}
      <br />
      {formInputs?.[question.formInput]?.other && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs?.[toOtherCamelCase(question.formInput)]}
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

export default SelectAll