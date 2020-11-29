import React, { useState } from 'react'
import { H1, QuestionHeading } from '../../components/Typography'
import { TextInput } from '../../components/TextInput'
import Dropdown from '../../components/Dropdown'
import Select from '../../components/Select'

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
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
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: '',
    hackathonsAttended: '',
    contributionRole: '',
    location: '',
  })

  return (
    <>
      <H1>
        Tell us about yourself!{' '}
        <span role="img" aria-label="smile">
          &#128578;
        </span>
      </H1>
      <QuestionHeading>question 01</QuestionHeading>
      <H1>What is your preferred name?</H1>
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

      <QuestionHeading>question 02</QuestionHeading>
      <H1>Which gender do you identify as?</H1>
      <Dropdown
        options={genderOptions}
        placeholder={'Gender'}
        isSearchable={false}
        onChange={inputValue =>
          setStates({
            ...states,
            gender: inputValue.value,
          })
        }
        isValid
      >
        {' '}
      </Dropdown>

      <QuestionHeading>question 03</QuestionHeading>
      <H1>What is your race/ethnicity? (Select all that apply)</H1>
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

      <QuestionHeading>question 04</QuestionHeading>
      <H1>Will you be 19 years or older by January 9th, 2021?</H1>
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

      <QuestionHeading>question 05</QuestionHeading>
      <H1>What is your phone number?</H1>
      <TextInput placeholder="XXX-XXX-XXXX"></TextInput>
      {/* validation check is num */}

      <QuestionHeading>question 06</QuestionHeading>
      <H1>What school do you go to?</H1>
      <Dropdown placeholder={'Enter your school'} isSearchable canCreateNewOption isValid>
        {' '}
      </Dropdown>

      <QuestionHeading>question 07</QuestionHeading>
      <H1>What is your current or intended major?</H1>

      <QuestionHeading>question 08</QuestionHeading>
      <H1>What is your current level of education?</H1>

      <QuestionHeading>question 09</QuestionHeading>
      <H1>What is your graduation year?</H1>

      <QuestionHeading>question 10</QuestionHeading>
      <H1>How many hackathons have you attended (both online and in-person)?</H1>

      <QuestionHeading>question 11</QuestionHeading>
      <H1>
        How do you want to contribute at nwHacks? Please select the category that you're strongest
        in.
      </H1>

      <QuestionHeading>question 12</QuestionHeading>
      <H1>Where are you currently located?</H1>
    </>
  )
}
