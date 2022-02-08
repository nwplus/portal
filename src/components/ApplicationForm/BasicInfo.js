import React from 'react'
import styled from 'styled-components'
import { QuestionHeading, CenteredH1, P, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput } from '../Input/TextInput'
import Dropdown from '../Input/Dropdown'
import Select from '../Input/Select'
import { FormSpacing, SubHeading } from './'
import schools from '../../containers/Application/data/schools.json'
import majors from '../../containers/Application/data/majors.json'
import { findElement, creatableDropdownValue } from '../../utility/utilities'
import { copyText } from '../../utility/Constants'

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
]

const pronounOptions = [
  { value: 'she/her', label: 'she/her' },
  { value: 'they/them', label: 'they/them' },
  { value: 'ze/zir', label: 'ze/zir' },
  { value: 'he/him', label: 'he/him' },
  { value: 'other', label: 'Other' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
]

const ethnicityOptions = {
  africanAmerican: 'African American or Black',
  americanIndian: 'American Indian or Alaskan Native',
  asian: 'Asian or Pacific Islander',
  caucasian: 'Caucasian or White',
  hispanic: 'Hispanic or Latinx',
  other: 'Multiple ethnicity/Other',
  preferNot: 'Prefer not to say',
}

const educationOptions = [
  { value: 'high school', label: 'High school' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate or Post-Graduate' },
  { value: 'recent-graduate', label: 'Recently graduated' },
  { value: 'other', label: 'Other' },
]

const graduationOptions = [
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
  { value: 2026, label: '2026+' },
]

const StyledTextInput = styled(TextInput)`
  margin: 0.5em 1em 1em 0;
`

// form part 1
export default ({ refs, errors, formInputs, onChange }) => (
  <>
    <FormSpacing>
      <CenteredH1>
        Tell us about yourself!{' '}
        <span role="img" aria-label="smile">
          &#128578;
        </span>
      </CenteredH1>
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 01</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Pencil emoji">
          ✏️
        </span>{' '}
        What is your full legal name?
        <Required />
      </SubHeading>
      <StyledTextInput
        placeholder="First Name"
        value={formInputs.firstName}
        errorMsg={errors?.firstName}
        invalid={!!errors?.firstName}
        onChange={e =>
          onChange({
            firstName: e.target.value,
          })
        }
        customRef={refs['firstNameRef']}
      />
      <StyledTextInput
        placeholder="Middle Name"
        value={formInputs.middleName}
        errorMsg={errors?.middleName}
        onChange={e =>
          onChange({
            middleName: e.target.value,
          })
        }
      />
      <StyledTextInput
        placeholder="Last Name"
        value={formInputs.lastName}
        errorMsg={errors?.lastName}
        invalid={!!errors?.lastName}
        onChange={e =>
          onChange({
            lastName: e.target.value,
          })
        }
        customRef={refs['lastNameRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 02</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Telephone emoji">
          ☎️
        </span>{' '}
        What is your phone number?
        <Required />
      </SubHeading>
      <StyledTextInput
        placeholder="XXX-XXX-XXXX"
        value={formInputs.phoneNumber}
        errorMsg={errors?.phoneNumber}
        invalid={!!errors?.phoneNumber}
        onChange={e =>
          onChange({
            phoneNumber: e.target.value,
          })
        }
        customRef={refs['phoneNumberRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 03</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Person raising one hand emoji">
          🙋
        </span>{' '}
        Which gender do you identify as?
        <Required />
      </SubHeading>
      {errors?.gender && <ErrorMessage>{errors?.gender}</ErrorMessage>}
      <Dropdown
        options={genderOptions}
        placeholder="Gender"
        isSearchable={false}
        value={findElement(genderOptions, 'value', formInputs.gender)}
        onChange={e =>
          onChange({
            gender: e.value,
          })
        }
        isValid={!errors?.gender}
        customRef={refs['genderRef']}
      />
      {formInputs.gender === 'other' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.otherGender}
          onChange={e =>
            onChange({
              otherGender: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 04</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Mushroom emoji">
          🍄
        </span>{' '}
        What are your pronouns?
        <Required />
      </SubHeading>
      {errors?.pronouns && <ErrorMessage>{errors?.pronouns}</ErrorMessage>}
      <Dropdown
        options={pronounOptions}
        placeholder="Pronouns"
        isSearchable={false}
        value={findElement(pronounOptions, 'value', formInputs.pronouns)}
        onChange={e =>
          onChange({
            pronouns: e.value,
          })
        }
        isValid={!errors?.pronouns}
        customRef={refs['pronounsRef']}
      />
      {formInputs.pronouns === 'other' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.otherPronoun}
          onChange={e =>
            onChange({
              otherPronoun: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 05</QuestionHeading>
      <SubHeading>
        What is your race/ethnicity? (Select all that apply)
        <Required />
      </SubHeading>
      {errors?.ethnicity && <ErrorMessage>{errors?.ethnicity}</ErrorMessage>}
      {formInputs &&
        Object.entries(formInputs?.ethnicity)
          .sort()
          .map(([key, val]) => (
            <Select
              key={key}
              type="checkbox"
              label={ethnicityOptions[key]}
              checked={val}
              onChange={() =>
                onChange({
                  ethnicity: { ...formInputs.ethnicity, [key]: !val },
                })
              }
              customRef={key === 'africanAmerican' ? refs['ethnicityRef'] : null}
            />
          ))}
      <br />
      {formInputs.ethnicity.other && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.otherEthnicity}
          onChange={e =>
            onChange({
              otherEthnicity: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 06</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Baby chick emoji">
          🐥
        </span>{' '}
        Will you be 19 years of age or older by March 5th, 2022?
        <Required />
      </SubHeading>
      <P>We accept hackers currently in high school but require this for consent purposes.</P>
      {errors?.isOfLegalAge && <ErrorMessage>{errors?.isOfLegalAge}</ErrorMessage>}
      <Select
        type="radio"
        label="Yes"
        checked={formInputs.isOfLegalAge}
        onChange={() => onChange({ isOfLegalAge: true })}
        customRef={refs['isOfLegalAgeRef']}
      ></Select>
      <Select
        type="radio"
        label="No"
        checked={formInputs.isOfLegalAge === false}
        onChange={() => onChange({ isOfLegalAge: false })}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 07</QuestionHeading>
      <SubHeading>
        What level of education are you currently studying at?
        <Required />
      </SubHeading>
      {errors?.educationLevel && <ErrorMessage>{errors?.educationLevel}</ErrorMessage>}
      <Dropdown
        options={educationOptions}
        placeholder="Level of Education"
        isSearchable={false}
        value={findElement(educationOptions, 'value', formInputs.educationLevel)}
        onChange={inputValue =>
          onChange({
            educationLevel: inputValue.value,
          })
        }
        isValid={!errors?.educationLevel}
        customRef={refs['educationLevelRef']}
      />
      {formInputs.educationLevel === 'other' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.otherEducationLevel}
          errorMsg={errors?.otherEducationLevel}
          invalid={!!errors?.otherEducationLevel}
          onChange={e =>
            onChange({
              otherEducationLevel: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 08</QuestionHeading>
      <SubHeading>
        What school do you currently attend?
        <Required />
      </SubHeading>
      <P>If you have graduated, please specify the school you most recently attended.</P>
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
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 09</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Book emoji">
          📖
        </span>{' '}
        {formInputs.educationLevel === 'high school'
          ? 'What do you plan on studying?'
          : 'What is your current or intended major?'}
        <Required />
      </SubHeading>
      {errors?.major && <ErrorMessage>{errors?.major}</ErrorMessage>}
      <Dropdown
        options={majors}
        placeholder="Enter your major"
        isSearchable
        formatCreateLabel={inputValue => `${inputValue}`}
        label={formInputs.major}
        value={creatableDropdownValue(majors, 'label', formInputs.major)}
        onChange={e =>
          onChange({
            major: e.label,
          })
        }
        emptySearchDefaultOption="Start typing to search"
        canCreateNewOption
        isValid={!errors?.major}
        customRef={refs['majorRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 10</QuestionHeading>
      <SubHeading>
        What is your expected graduation year?
        <Required />
      </SubHeading>
      {errors?.graduation && <ErrorMessage>{errors?.graduation}</ErrorMessage>}
      <Dropdown
        options={graduationOptions}
        placeholder="Graduation Year"
        isSearchable={false}
        value={findElement(graduationOptions, 'value', formInputs.graduation)}
        onChange={inputValue =>
          onChange({
            graduation: inputValue.value,
          })
        }
        isValid={!errors?.graduation}
        customRef={refs['graduationRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 11</QuestionHeading>
      <SubHeading>
        How do you want to contribute at {copyText.hackathonName}? Please select the category that
        you're strongest in.
        <Required />
      </SubHeading>
      {errors?.contributionRole && <ErrorMessage>{errors?.contributionRole}</ErrorMessage>}
      <Select
        type="radio"
        label="Developer"
        checked={formInputs.contributionRole === 'developer'}
        onChange={() => onChange({ contributionRole: 'developer' })}
        customRef={refs['contributionRoleRef']}
      />
      <Select
        type="radio"
        label="Designer"
        checked={formInputs.contributionRole === 'designer'}
        onChange={() => onChange({ contributionRole: 'designer' })}
      />
    </FormSpacing>
  </>
)
