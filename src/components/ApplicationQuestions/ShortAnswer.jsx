import { TextInput } from '../Input'
import styled from 'styled-components'

const StyledTextInput = styled(TextInput)`
  margin: 0.5em 1em 1em 0;
`

const ShortAnswer = ({ refs, errors, formInputs, onChange, question }) => {
  return (
    <>
      <StyledTextInput
        placeholder={question.title}
        value={formInputs[question.formInput]}
        errorMsg={errors?.[question.formInput]}
        invalid={!!errors?.[question.formInput]}
        onChange={e => onChange({ [question.formInput]: e.target.value })}
        {...(refs ? { customRef: refs[`${question.formInput}Ref`] } : {})}
      />
    </>
  )
}

export default ShortAnswer
