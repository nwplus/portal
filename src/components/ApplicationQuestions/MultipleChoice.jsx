import { toOtherCamelCase } from '../../utility/utilities'
import { Select, TextInput } from '../Input'
import { ErrorMessage } from '../Typography'

const MultipleChoice = ({ refs, errors, formInputs, onChange, question }) => {
  const options = question.other ? [...question.options, 'Other'] : question.options

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

export default MultipleChoice
