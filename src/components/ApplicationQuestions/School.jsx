import { Dropdown } from '../Input'
import { ErrorMessage } from '../Typography'
import schools from '../../containers/Application/data/schools.json'
import { creatableDropdownValue } from '../../utility/utilities'

const School = ({ refs, errors, formInputs, onChange }) => {
  return (
    <>
      {errors?.school && <ErrorMessage>{errors?.school}</ErrorMessage>}
      <Dropdown
        options={schools}
        placeholder="Enter your school"
        isSearchable
        formatCreateLabel={inputValue => `${inputValue}`}
        label={formInputs.school}
        value={creatableDropdownValue(schools, 'label', formInputs.school)}
        onChange={e =>
          onChange({
            school: e.label,
          })
        }
        emptySearchDefaultOption="Start typing to search"
        canCreateNewOption
        debounceEnabled
        throttleTime={1000}
        isValid={!errors?.school}
        customRef={refs['schoolRef']}
      />
    </>
  )
}

export default School
