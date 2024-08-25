import { Select } from '../Input'
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
    </>
  )
}

export default MultipleChoice
