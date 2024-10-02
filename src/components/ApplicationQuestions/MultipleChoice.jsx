import { toOtherCamelCase } from '../../utility/utilities'
import { Select, TextInput } from '../Input'
import { ErrorMessage } from '../Typography'
import { SELF_DESCRIBE_FIELDS } from '../../utility/Constants'

const MultipleChoice = ({ refs, errors, formInputs, onChange, question }) => {
  const getOptions = () => {
    if (!question.other) return question.options

    const additionalOption = SELF_DESCRIBE_FIELDS.includes(question.formInput)
      ? 'Prefer to self-describe'
      : 'Other'

    return [...question.options, additionalOption]
  }

  const options = getOptions()

  return (
    <>
      {errors?.[question.formInput] && <ErrorMessage>{errors?.[question.formInput]}</ErrorMessage>}
      {options.map((option, optIndex) => (
        <Select
          key={optIndex}
          type="radio"
          label={option}
          checked={formInputs[question.formInput] === option}
          onChange={() => onChange({ [question.formInput]: option })}
          {...(refs ? { customRef: refs[`${question.formInput}Ref`] } : {})}
        />
      ))}
      {formInputs[question.formInput] === 'Other' && (
        <TextInput
          placeholder="Please Specify"
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

export default MultipleChoice
