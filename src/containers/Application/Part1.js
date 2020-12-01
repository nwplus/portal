import React, { useState } from 'react'
import { H1, QuestionHeading, CenteredH1 } from '../../components/Typography'
import { TextInput } from '../../components/Input/TextInput'
import Dropdown from '../../components/Input/Dropdown'
import Select from '../../components/Input/Select'
import { FormSpacing } from '../../components/ApplicationForm'

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
]

const educationOptions = [
  { value: 'high school', label: 'High school' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate or Post-Graduate' },
  { value: 'other', label: 'Other' },
]

// check w logs
const graduationOptions = [
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025+' },
]

// check w logs
const hackathonOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10+' },
]

// form part 1
export default ({ children }) => {
  const [states, setStates] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    ethnicity: {
      asian: false,
      black: false,
      caucasian: false,
      hispanic: false,
      middleEastern: false,
      nativeHawaiian: false,
      northAmerica: false,
      other: false,
      preferNot: false,
    },
    isOfLegalAge: null,
    phoneNumber: 0,
    school: '',
    major: '',
    educationLevel: '',
    graduation: 0,
    hackathonsAttended: 0,
    contributionRole: '',
    location: '',
  })

  const schools = require('./data/schools.json')
  const majors = require('./data/majors.json')

  return (
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
        <H1 size="1.5em">What is your preferred name?</H1>
        <TextInput
          placeholder="First Name"
          onChange={e =>
            setStates({
              ...states,
              firstName: e.target.value,
            })
          }
        ></TextInput>
        <TextInput
          placeholder="Last Name"
          onChange={e =>
            setStates({
              ...states,
              lastName: e.target.value,
            })
          }
        ></TextInput>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 02</QuestionHeading>
        <H1 size="1.5em">Which gender do you identify as?</H1>
        <Dropdown
          options={genderOptions}
          placeholder={'Gender'}
          isSearchable={false}
          onChange={e =>
            setStates({
              ...states,
              gender: e.value,
            })
          }
          isValid
        ></Dropdown>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 03</QuestionHeading>
        <H1 size="1.5em">What is your race/ethnicity? (Select all that apply)</H1>
        <Select
          type="checkbox"
          label="Asian"
          checked={states.ethnicity.asian}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, asian: !states.ethnicity.asian },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Black or African American"
          checked={states.ethnicity.black}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, black: !states.ethnicity.black },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Caucasian or European"
          checked={states.ethnicity.caucasian}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, caucasian: !states.ethnicity.caucasian },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Hispanic or Latinx"
          checked={states.ethnicity.hispanic}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, hispanic: !states.ethnicity.hispanic },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Middle Eastern"
          checked={states.ethnicity.middleEastern}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, middleEastern: !states.ethnicity.middleEastern },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Native Hawaiian or Pacific Islander"
          checked={states.ethnicity.nativeHawaiian}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, nativeHawaiian: !states.ethnicity.nativeHawaiian },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="North American Indigenous"
          checked={states.ethnicity.northAmerica}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, northAmerica: !states.ethnicity.northAmerica },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Other"
          checked={states.ethnicity.other}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, other: !states.ethnicity.other },
            })
          }
        ></Select>
        <Select
          type="checkbox"
          label="Prefer not to say"
          checked={states.ethnicity.preferNot}
          onChange={() =>
            setStates({
              ...states,
              ethnicity: { ...states.ethnicity, preferNot: !states.ethnicity.preferNot },
            })
          }
        ></Select>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 04</QuestionHeading>
        <H1 size="1.5em">Will you be 19 years or older by January 9th, 2021?</H1>
        <Select
          type="radio"
          label="Yes"
          checked={states.isOfLegalAge === true}
          onChange={() => setStates({ ...states, isOfLegalAge: true })}
        ></Select>
        <Select
          type="radio"
          label="No"
          checked={states.isOfLegalAge === false}
          onChange={() => setStates({ ...states, isOfLegalAge: false })}
        ></Select>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 05</QuestionHeading>
        <H1 size="1.5em">What is your phone number?</H1>
        <TextInput
          placeholder="XXX-XXX-XXXX"
          onChange={e =>
            setStates({
              ...states,
              phoneNumber: e.target.value,
            })
          }
        ></TextInput>
        {/* validation check is num */}
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 06</QuestionHeading>
        <H1 size="1.5em">What school do you go to?</H1>
        <Dropdown
          options={schools}
          placeholder={'Enter your school'}
          isSearchable
          formatCreateLabel={inputValue => `My school is not listed, use "${inputValue}"`}
          onChange={e =>
            setStates({
              ...states,
              school: e.label,
            })
          }
          emptySearchDefaultOption={'Start typing to search'}
          canCreateNewOption
          isValid
        ></Dropdown>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 07</QuestionHeading>
        <H1 size="1.5em">What is your current or intended major?</H1>
        <Dropdown
          options={majors}
          placeholder={'Enter your major'}
          isSearchable
          formatCreateLabel={inputValue => `My major is not listed, use "${inputValue}"`}
          onChange={e =>
            setStates({
              ...states,
              major: e.label,
            })
          }
          emptySearchDefaultOption={'Start typing to search'}
          canCreateNewOption
          isValid
        ></Dropdown>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 08</QuestionHeading>
        <H1 size="1.5em">What is your current level of education?</H1>
        <Dropdown
          options={educationOptions}
          placeholder={'Level of Education'}
          isSearchable={false}
          onChange={inputValue =>
            setStates({
              ...states,
              educationLevel: inputValue.value,
            })
          }
          isValid
        ></Dropdown>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 09</QuestionHeading>
        <H1 size="1.5em">What is your graduation year?</H1>
        <Dropdown
          options={graduationOptions}
          placeholder={'Graduation Year'}
          isSearchable={false}
          onChange={inputValue =>
            setStates({
              ...states,
              graduation: inputValue.value,
            })
          }
          isValid
        ></Dropdown>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 10</QuestionHeading>
        <H1 size="1.5em">How many hackathons have you attended (both online and in-person)?</H1>
        <Dropdown
          options={hackathonOptions}
          placeholder={'Number of Hackathons'}
          isSearchable={false}
          onChange={inputValue =>
            setStates({
              ...states,
              hackathonsAttended: inputValue.value,
            })
          }
          isValid
        ></Dropdown>
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 11</QuestionHeading>
        <H1 size="1.5em">
          How do you want to contribute at nwHacks? Please select the category that you're strongest
          in.
        </H1>
        <Select
          type="radio"
          label="Developer"
          checked={states.contributionRole === 'Developer'}
          onChange={() => setStates({ ...states, contributionRole: 'Developer' })}
        ></Select>
        <Select
          type="radio"
          label="Designer"
          checked={states.contributionRole === 'Designer'}
          onChange={() => setStates({ ...states, contributionRole: 'Designer' })}
        ></Select>
        <Select
          type="radio"
          label="Hardware/Robotics"
          checked={states.contributionRole === 'Hardware/Robotics'}
          onChange={() => setStates({ ...states, contributionRole: 'Hardware/Robotics' })}
        ></Select>
        <Select
          type="radio"
          label="Product Manager"
          checked={states.contributionRole === 'Product Manager'}
          onChange={() => setStates({ ...states, contributionRole: 'Product Manager' })}
        ></Select>
        <Select
          type="radio"
          label="Data Scientist"
          checked={states.contributionRole === 'Data Scientist'}
          onChange={() => setStates({ ...states, contributionRole: 'Data Scientist' })}
        ></Select>
        <Select
          type="radio"
          label="Business Strategist"
          checked={states.contributionRole === 'Business Strategist'}
          onChange={() => setStates({ ...states, contributionRole: 'Business Strategist' })}
        ></Select>
        <Select
          type="radio"
          label="Other"
          checked={states.contributionRole === 'Other'}
          onChange={() => setStates({ ...states, contributionRole: 'Other' })}
        ></Select>
        {/* insert new input component for 'Please Specify' */}
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>question 12</QuestionHeading>
        <H1 size="1.5em">Where are you currently located?</H1>
        <TextInput
          placeholder="Enter your city and country"
          onChange={e =>
            setStates({
              ...states,
              location: e.target.value,
            })
          }
        ></TextInput>
      </FormSpacing>
    </>
  )
}
