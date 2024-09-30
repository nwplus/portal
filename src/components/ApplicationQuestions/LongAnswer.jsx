import { TextArea } from '../Input'
import { ErrorMessage } from '../Typography'
import styled from 'styled-components'

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

const LongAnswer = ({ refs, errors, formInputs, onChange, question }) => {
  return (
    <>
      <StyledTextArea
        maxWords={question.maxWords || '150'}
        width="100%"
        value={formInputs[question.formInput]}
        invalid={!!errors[question.formInput]}
        errorMsg={errors[question.formInput]}
        onChange={val =>
          onChange({
            [question.formInput]: val,
          })
        }
        {...(refs ? { customRef: refs[`${question.formInput}Ref`] } : {})}
      />
    </>
  )
}

export default LongAnswer
