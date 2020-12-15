import React from 'react'
import { QuestionHeading, CenteredH1, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { TextInput } from '../Input/TextInput'
import Dropdown from '../Input/Dropdown'
import Select from '../Input/Select'
import { FormSpacing, SubHeading } from './'
import schools from '../../containers/Application/data/schools.json'
import majors from '../../containers/Application/data/majors.json'
import { findElement, creatableDropdownValue } from '../../utility/utilities'

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
]

const ethnicityOptions = {
  asian: 'Asian',
  black: 'Black or African American',
  caucasian: 'Caucasian or European',
  hispanic: 'Hispanic or Latinx',
  middleEastern: 'Middle Eastern',
  nativeHawaiian: 'Native Hawaiian or Pacific Islander',
  northAmerica: 'North American Indigenous',
  other: 'Other',
  preferNot: 'Prefer not to say',
}

const educationOptions = [
  { value: 'high school', label: 'High school' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate or Post-Graduate' },
  { value: 'other', label: 'Other' },
]

const graduationOptions = [
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025+' },
]

const hackathonOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4+' },
]

// form part 1
export default ({ errors, formInputs, onChange }) => (
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
        What is your preferred name?
        <Required />
      </SubHeading>
      <TextInput
        placeholder="First Name"
        inline
        value={formInputs.firstName}
        errorMsg={errors?.firstName}
        invalid={!!errors?.firstName}
        onChange={e =>
          onChange({
            firstName: e.target.value,
          })
        }
      />
      <TextInput
        placeholder="Last Name"
        inline
        value={formInputs.lastName}
        errorMsg={errors?.lastName}
        invalid={!!errors?.lastName}
        onChange={e =>
          onChange({
            lastName: e.target.value,
          })
        }
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 02</QuestionHeading>
      <SubHeading>
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
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 03</QuestionHeading>
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
            />
          ))}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 04</QuestionHeading>
      <SubHeading>
        Will you be 19 years or older by January 9th, 2021?
        <Required />
      </SubHeading>
      {errors?.isOfLegalAge && <ErrorMessage>{errors?.isOfLegalAge}</ErrorMessage>}
      <Select
        type="radio"
        label="Yes"
        checked={formInputs.isOfLegalAge}
        onChange={() => onChange({ isOfLegalAge: true })}
      ></Select>
      <Select
        type="radio"
        label="No"
        checked={formInputs.isOfLegalAge === false}
        onChange={() => onChange({ isOfLegalAge: false })}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 05</QuestionHeading>
      <SubHeading>
        What is your phone number?
        <Required />
      </SubHeading>
      <TextInput
        placeholder="+X XXX-XXX-XXXX"
        value={formInputs.phoneNumber}
        errorMsg={errors?.phoneNumber}
        invalid={!!errors?.phoneNumber}
        onChange={e =>
          onChange({
            phoneNumber: e.target.value,
          })
        }
        inline
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 06</QuestionHeading>
      <SubHeading>
        What school do you go to?
        <Required />
      </SubHeading>
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
        isValid={!errors?.school}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 07</QuestionHeading>
      <SubHeading>
        What is your current or intended major?
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
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 08</QuestionHeading>
      <SubHeading>
        What is your current level of education?
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
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 09</QuestionHeading>
      <SubHeading>
        What is your graduation year?
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
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 10</QuestionHeading>
      <SubHeading>
        How many hackathons have you attended (both online and in-person)?
        <Required />
      </SubHeading>
      {errors?.hackathonsAttended && <ErrorMessage>{errors?.hackathonsAttended}</ErrorMessage>}
      <Dropdown
        options={hackathonOptions}
        placeholder="Number of Hackathons"
        isSearchable={false}
        value={findElement(hackathonOptions, 'value', formInputs.hackathonsAttended)}
        onChange={inputValue =>
          onChange({
            hackathonsAttended: inputValue.value,
          })
        }
        isValid={!errors?.hackathonsAttended}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 11</QuestionHeading>
      <SubHeading>
        How do you want to contribute at nwHacks? Please select the category that you're strongest
        in.
        <Required />
      </SubHeading>
      {errors?.contributionRole && <ErrorMessage>{errors?.contributionRole}</ErrorMessage>}
      <Select
        type="radio"
        label="Developer"
        checked={formInputs.contributionRole === 'developer'}
        onChange={() => onChange({ contributionRole: 'developer' })}
      />
      <Select
        type="radio"
        label="Designer"
        checked={formInputs.contributionRole === 'designer'}
        onChange={() => onChange({ contributionRole: 'designer' })}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 12</QuestionHeading>
      <SubHeading>
        Where are you currently located?
        <Required />
      </SubHeading>
      <TextInput
        placeholder="Enter your city and country"
        value={formInputs.location}
        errorMsg={errors?.location}
        invalid={!!errors?.location}
        onChange={e =>
          onChange({
            location: e.target.value,
          })
        }
        inline
      />
    </FormSpacing>
  </>
)
