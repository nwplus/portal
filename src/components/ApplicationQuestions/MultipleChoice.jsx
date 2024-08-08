import { Select } from '../Input'
import { ErrorMessage } from '../Typography'

const MultipleChoice = ({ refs, errors, formInputs, onChange, question }) => {
  return question.options.map((option, optIndex) => (
    <>
      {errors?.[question.formInput] && <ErrorMessage>{errors?.[question.formInput]}</ErrorMessage>}
      <Select
        key={optIndex}
        type="radio"
        label={option}
        checked={formInputs[question.formInput] === option}
        onChange={() => onChange({ [question.formInput]: option })}
        customRef={refs[`${question.formInput}Ref`]}
      />
    </>
  ))
}

export default MultipleChoice
