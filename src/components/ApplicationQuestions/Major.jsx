import { MAJOR_OPTIONS } from '../../utility/Constants'
import { applyCustomSort } from '../../utility/utilities'
import { TextInput, Select } from '../Input'

const Major = ({ refs, errors, formInputs, onChange }) => {
  return (
    <>
      {formInputs &&
        applyCustomSort(Object.entries(formInputs?.major), Object.keys(MAJOR_OPTIONS)).map(
          ([key, val]) => (
            <Select
              key={key}
              type="checkbox"
              label={MAJOR_OPTIONS[key]}
              checked={val}
              onChange={() =>
                onChange({
                  major: { ...formInputs.major, [key]: !val },
                })
              }
              customRef={refs['majorRef']}
            />
          )
        )}
      <br />
      {formInputs?.major?.other && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs?.otherMajor}
          onChange={e =>
            onChange({
              otherMajor: e.target.value,
            })
          }
        />
      )}
    </>
  )
}

export default Major
