import { TextArea } from '../Input'
import { ErrorMessage } from '../Typography'
import styled from 'styled-components'

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

const LongAnswer = ({ refs, errors, formInputs, onChange, question }) => {
  return (
    <>
      {errors?.[question.formInput] && <ErrorMessage>{errors?.[question.formInput]}</ErrorMessage>}
      <StyledTextArea
        maxWidth={question.maxWidth}
        width="100%"
        value={formInputs[question.formInput]}
        invalid={!!errors[question.formInput]}
        errorMsg={errors[question.formInput]}
        onChange={val =>
          onChange({
            [question.formInput]: val,
          })
        }
        customRef={refs[`${question.formInput}Ref`]}
      />
    </>
  )
}

export default LongAnswer
