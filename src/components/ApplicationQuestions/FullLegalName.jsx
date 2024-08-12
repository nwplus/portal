import { TextInput } from '../Input'
import styled from 'styled-components'

const StyledTextInput = styled(TextInput)`
  margin: 0.5em 1em 1em 0;
`

const FullLegalName = ({ refs, errors, formInputs, onChange }) => {
  return (
    <>
      <StyledTextInput
        placeholder="First Name"
        value={formInputs.legalFirstName}
        errorMsg={errors?.legalFirstName}
        invalid={!!errors?.legalFirstName}
        onChange={e =>
          onChange({
            legalFirstName: e.target.value,
          })
        }
        customRef={refs['legalFirstNameRef']}
      />
      <StyledTextInput
        placeholder="Middle Name"
        value={formInputs.legalMiddleName}
        errorMsg={errors?.legalMiddleName}
        onChange={e =>
          onChange({
            legalMiddleName: e.target.value,
          })
        }
      />
      <StyledTextInput
        placeholder="Last Name"
        value={formInputs.legalLastName}
        errorMsg={errors?.legalLastName}
        invalid={!!errors?.legalLastName}
        onChange={e =>
          onChange({
            legalLastName: e.target.value,
          })
        }
        customRef={refs['legalLastNameRef']}
      />
    </>
  )
}

export default FullLegalName
