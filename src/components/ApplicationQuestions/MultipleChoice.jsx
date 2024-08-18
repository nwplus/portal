import { Select } from '../Input'
import { ErrorMessage } from '../Typography'

const MultipleChoice = ({ refs, errors, formInputs, onChange, question }) => {
  return (
    <>
      {errors?.[question.formInput] && <ErrorMessage>{errors?.[question.formInput]}</ErrorMessage>}
      {question.options.map((option, optIndex) => (
        <Select
          key={optIndex}
          type="radio"
          label={option}
          checked={formInputs[question.formInput] === option}
          onChange={() => onChange({ [question.formInput]: option })}
          customRef={refs[`${question.formInput}Ref`]}
        />
      ))}
    </>
  )
}

export default MultipleChoice
