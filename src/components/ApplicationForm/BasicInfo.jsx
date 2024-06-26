import React from 'react'
import styled from 'styled-components'
import schools from '../../containers/Application/data/schools.json'
import {
  CULTURAL_BG_OPTIONS,
  DIETARY_RESTRICTION_OPTIONS,
  MAJOR_OPTIONS,
  PRONOUN_OPTIONS,
  RACE_OPTIONS,
} from '../../utility/Constants'
import { applyCustomSort, creatableDropdownValue, findElement } from '../../utility/utilities'
import { TextArea } from '../Input'
import Dropdown from '../Input/Dropdown'
import Select from '../Input/Select'
import { TextInput } from '../Input/TextInput'
import {
  CenteredH1,
  ErrorMessage,
  H2,
  P,
  QuestionHeading,
  ErrorSpan as Required,
} from '../Typography'
import { FormSpacing, SubHeading } from './index'

const genderOptions = [
  { value: 'female', label: 'Woman' },
  { value: 'male', label: 'Man' },
  { value: 'non-binary', label: 'Non-binary/Genderqueer/Gender non-conforming' },
  { value: 'two-spirit', label: 'Two-Spirit' },
  { value: 'other', label: 'Prefer to self-describe' },
  { value: 'prefer not to answer', label: 'Prefer not to answer' },
]

const indigenousIdentificationOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'prefer not to answer', label: 'Prefer not to answer' },
]

const canadianStatusOptions = [
  { value: 'international student', label: 'International Student' },
  { value: 'canadian/on PR student', label: 'Canadian/on PR Student' },
  { value: 'other', label: 'Other (Please Describe)' },
]

const educationOptions = [
  { value: 'less than high school', label: 'Less than Secondary / High School' },
  { value: 'high school', label: 'Secondary/High school' },
  {
    value: 'undergraduate college',
    label: 'Undergraduate University (2 year - community college or similar)',
  },
  { value: 'undergraduate full', label: 'Undergraduate University (3+ year)' },
  { value: 'graduate', label: 'Graduate University (Masters, Professional, Doctoral, etc)' },
  { value: 'code school or bootcamp', label: `Code School / Bootcamp` },
  {
    value: 'vocational or trade program or apprenticeship',
    label: `Other Vocational / Trade Program or Apprenticeship`,
  },
  {
    value: 'post doctorate',
    label: `Post Doctorate`,
  },
  { value: 'other', label: 'Other' },
  { value: 'not-a-student', label: `I'm not currently a student` },
  { value: 'prefer not to answer', label: 'Prefer not to answer' },
]

const identifyAsUnderrepresentedOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'preferNotToAnswer', label: 'Prefer not to answer' },
]

const academicYearOptions = [
  { value: 'Secondary/High School', label: 'Secondary/High School' },
  { value: '1st year', label: '1st year' },
  { value: '2nd year', label: '2nd year' },
  { value: '3rd year', label: '3rd year' },
  { value: '4th year', label: '4th year' },
  { value: '5th year+', label: '5th year+' },
  { value: 'New Grad', label: 'New Grad (<= 1 year)' },
  { value: 'Graduate school', label: 'Graduate school' },
]

const graduationOptions = [
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
  { value: 2026, label: '2026' },
  { value: 2027, label: '2027+' },
]

const ageOptions = [
  { value: 13, label: '13' },
  { value: 14, label: '14' },
  { value: 15, label: '15' },
  { value: 16, label: '16' },
  { value: 17, label: '17' },
  { value: 18, label: '18' },
  { value: 19, label: '19' },
  { value: 20, label: '20' },
  { value: 21, label: '21' },
  { value: 22, label: '22' },
  { value: 23, label: '23' },
  { value: 24, label: '24' },
  { value: 'other', label: 'Other' },
]

const countryOptions = [
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Åland Islands', label: 'Åland Islands' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'American Samoa', label: 'American Samoa' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Armenia', label: 'Armenia' },
  { value: 'Aruba', label: 'Aruba' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belarus', label: 'Belarus' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Belize', label: 'Belize' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Bermuda', label: 'Bermuda' },
  { value: 'Bhutan', label: 'Bhutan' },
  { value: 'Bolivia (Plurinational State of)', label: 'Bolivia (Plurinational State of)' },
  { value: 'Bonaire, Sint Eustatius and Saba', label: 'Bonaire, Sint Eustatius and Saba' },
  { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Bouvet Island', label: 'Bouvet Island' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'British Indian Ocean Territory', label: 'British Indian Ocean Territory' },
  { value: 'Brunei Darussalam', label: 'Brunei Darussalam' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Cabo Verde', label: 'Cabo Verde' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Cameroon', label: 'Cameroon' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Cayman Islands', label: 'Cayman Islands' },
  { value: 'Central African Republic', label: 'Central African Republic' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Chile', label: 'Chile' },
  { value: 'China', label: 'China' },
  { value: 'Christmas Island', label: 'Christmas Island' },
  { value: 'Cocos (Keeling) Islands', label: 'Cocos (Keeling) Islands' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Comoros', label: 'Comoros' },
  { value: 'Congo', label: 'Congo' },
  { value: 'Congo, Democratic Republic of the', label: 'Congo, Democratic Republic of the' },
  { value: 'Cook Islands', label: 'Cook Islands' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: "Côte d'Ivoire", label: "Côte d'Ivoire" },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Cuba', label: 'Cuba' },
  { value: 'Curaçao', label: 'Curaçao' },
  { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Czechia', label: 'Czechia' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'Dominica', label: 'Dominica' },
  { value: 'Dominican Republic', label: 'Dominican Republic' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
  { value: 'Eritrea', label: 'Eritrea' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Eswatini', label: 'Eswatini' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'Falkland Islands (Malvinas)', label: 'Falkland Islands (Malvinas)' },
  { value: 'Faroe Islands', label: 'Faroe Islands' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' },
  { value: 'French Guiana', label: 'French Guiana' },
  { value: 'French Polynesia', label: 'French Polynesia' },
  { value: 'French Southern Territories', label: 'French Southern Territories' },
  { value: 'Gabon', label: 'Gabon' },
  { value: 'Gambia', label: 'Gambia' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Gibraltar', label: 'Gibraltar' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Greenland', label: 'Greenland' },
  { value: 'Grenada', label: 'Grenada' },
  { value: 'Guadeloupe', label: 'Guadeloupe' },
  { value: 'Guam', label: 'Guam' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Guernsey', label: 'Guernsey' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
  { value: 'Guyana', label: 'Guyana' },
  { value: 'Haiti', label: 'Haiti' },
  { value: 'Heard Island and McDonald Islands', label: 'Heard Island and McDonald Islands' },
  { value: 'Holy See', label: 'Holy See' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Iceland', label: 'Iceland' },
  { value: 'India', label: 'India' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Iran (Islamic Republic of)', label: 'Iran (Islamic Republic of)' },
  { value: 'Iraq', label: 'Iraq' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Isle of Man', label: 'Isle of Man' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Jersey', label: 'Jersey' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Kazakhstan', label: 'Kazakhstan' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Kiribati', label: 'Kiribati' },
  {
    value: "Korea (Democratic People's Republic of)",
    label: "Korea (Democratic People's Republic of)",
  },
  { value: 'Korea, Republic of', label: 'Korea, Republic of' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
  { value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic" },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Lesotho', label: 'Lesotho' },
  { value: 'Liberia', label: 'Liberia' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Macao', label: 'Macao' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malawi', label: 'Malawi' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Marshall Islands', label: 'Marshall Islands' },
  { value: 'Martinique', label: 'Martinique' },
  { value: 'Mauritania', label: 'Mauritania' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'Mayotte', label: 'Mayotte' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Micronesia (Federated States of)', label: 'Micronesia (Federated States of)' },
  { value: 'Moldova, Republic of', label: 'Moldova, Republic of' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mozambique', label: 'Mozambique' },
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Namibia', label: 'Namibia' },
  { value: 'Nauru', label: 'Nauru' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'New Caledonia', label: 'New Caledonia' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Nicaragua', label: 'Nicaragua' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Niue', label: 'Niue' },
  { value: 'Norfolk Island', label: 'Norfolk Island' },
  { value: 'North Macedonia', label: 'North Macedonia' },
  { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Palau', label: 'Palau' },
  { value: 'Palestine, State of', label: 'Palestine, State of' },
  { value: 'Panama', label: 'Panama' },
  { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  { value: 'Paraguay', label: 'Paraguay' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Pitcairn', label: 'Pitcairn' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Puerto Rico', label: 'Puerto Rico' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'Romania', label: 'Romania' },
  { value: 'Russian Federation', label: 'Russian Federation' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Saint Barthélemy', label: 'Saint Barthélemy' },
  {
    value: 'Saint Helena, Ascension and Tristan da Cunha',
    label: 'Saint Helena, Ascension and Tristan da Cunha',
  },
  { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia', label: 'Saint Lucia' },
  { value: 'Saint Martin (French part)', label: 'Saint Martin (French part)' },
  { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
  { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
  { value: 'Samoa', label: 'Samoa' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Serbia', label: 'Serbia' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Sierra Leone', label: 'Sierra Leone' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Sint Maarten (Dutch part)', label: 'Sint Maarten (Dutch part)' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Solomon Islands', label: 'Solomon Islands' },
  { value: 'Somalia', label: 'Somalia' },
  { value: 'South Africa', label: 'South Africa' },
  {
    value: 'South Georgia and the South Sandwich Islands',
    label: 'South Georgia and the South Sandwich Islands',
  },
  { value: 'South Sudan', label: 'South Sudan' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Svalbard and Jan Mayen', label: 'Svalbard and Jan Mayen' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Syrian Arab Republic', label: 'Syrian Arab Republic' },
  { value: 'Taiwan', label: 'Taiwan' },
  { value: 'Tajikistan', label: 'Tajikistan' },
  { value: 'Tanzania, United Republic of', label: 'Tanzania, United Republic of' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Timor-Leste', label: 'Timor-Leste' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Tokelau', label: 'Tokelau' },
  { value: 'Tonga', label: 'Tonga' },
  { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
  { value: 'Tunisia', label: 'Tunisia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Turkmenistan', label: 'Turkmenistan' },
  { value: 'Turks and Caicos Islands', label: 'Turks and Caicos Islands' },
  { value: 'Tuvalu', label: 'Tuvalu' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  {
    value: 'United Kingdom of Great Britain and Northern Ireland',
    label: 'United Kingdom of Great Britain and Northern Ireland',
  },
  { value: 'United States of America', label: 'United States of America' },
  { value: 'United States Minor Outlying Islands', label: 'United States Minor Outlying Islands' },
  { value: 'Uruguay', label: 'Uruguay' },
  { value: 'Uzbekistan', label: 'Uzbekistan' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  { value: 'Venezuela (Bolivarian Republic of)', label: 'Venezuela (Bolivarian Republic of)' },
  { value: 'Viet Nam', label: 'Viet Nam' },
  { value: 'Virgin Islands (British)', label: 'Virgin Islands (British)' },
  { value: 'Virgin Islands (U.S.)', label: 'Virgin Islands (U.S.)' },
  { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
  { value: 'Western Sahara', label: 'Western Sahara' },
  { value: 'Yemen', label: 'Yemen' },
  { value: 'Zambia', label: 'Zambia' },
  { value: 'Zimbabwe', label: 'Zimbabwe' },
]

const StyledTextInput = styled(TextInput)`
  margin: 0.5em 1em 1em 0;
`

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

// form part 1
const BasicInfo = ({ refs, errors, formInputs, onChange }) => (
  <>
    <FormSpacing>
      <CenteredH1>General Questions</CenteredH1>
      <H2>
        First, we’d like to ask a few general questions about you. The information entered here does
        not affect your application as a hacker.
      </H2>
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 01</QuestionHeading>
      <SubHeading>
        What is your full legal name?
        <Required />
      </SubHeading>
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
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 02</QuestionHeading>
      <SubHeading>What is your preferred name?</SubHeading>

      <StyledTextInput
        placeholder="Preferred Name"
        value={formInputs.preferredName}
        onChange={e =>
          onChange({
            preferredName: e.target.value,
          })
        }
        customRef={refs['preferredNameRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 03</QuestionHeading>
      <SubHeading>
        What is your current age?
        <Required />
      </SubHeading>
      <P>
        We accept hackers currently in high school but require this information for consent
        purposes.
      </P>
      {errors?.ageByHackathon && <ErrorMessage>{errors?.ageByHackathon}</ErrorMessage>}
      <Dropdown
        options={ageOptions}
        placeholder="Age"
        isSearchable={false}
        value={findElement(ageOptions, 'value', formInputs.ageByHackathon)}
        onChange={e =>
          onChange({
            ageByHackathon: e.value,
            otherAgeByHackathon: null,
          })
        }
        isValid={!errors?.ageByHackathon}
        customRef={refs['ageByHackathonRef']}
      />
      {formInputs.ageByHackathon === 'other' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.otherAgeByHackathon}
          onChange={e =>
            onChange({
              otherAgeByHackathon: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 04</QuestionHeading>
      <SubHeading>
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
      <QuestionHeading>question 05</QuestionHeading>
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
      <QuestionHeading>question 06</QuestionHeading>
      <SubHeading>
        What is your level of study?
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
      <QuestionHeading>question 07</QuestionHeading>
      <SubHeading>
        What is your current academic year?
        <Required />
      </SubHeading>
      {errors?.academicYear && <ErrorMessage>{errors?.academicYear}</ErrorMessage>}
      <Dropdown
        options={academicYearOptions}
        placeholder="Academic Year"
        isSearchable={false}
        value={findElement(academicYearOptions, 'value', formInputs.academicYear)}
        onChange={inputValue =>
          onChange({
            academicYear: inputValue.value,
          })
        }
        isValid={!errors?.academicYear}
        customRef={refs['academicYearRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 08</QuestionHeading>
      <SubHeading>
        What is your (expected) graduation year?
        <Required />
      </SubHeading>
      {errors?.graduation && <ErrorMessage>{errors?.graduation}</ErrorMessage>}
      <Dropdown
        options={graduationOptions}
        placeholder="Grad Year"
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
      <QuestionHeading>question 09</QuestionHeading>
      <SubHeading>
        What is your country of residence?
        <Required />
      </SubHeading>
      {errors?.countryOfResidence && <ErrorMessage>{errors?.countryOfResidence}</ErrorMessage>}
      <Dropdown
        options={countryOptions}
        placeholder="Country..."
        isSearchable
        value={findElement(countryOptions, 'value', formInputs.countryOfResidence)}
        onChange={inputValue =>
          onChange({
            countryOfResidence: inputValue.value,
          })
        }
        isValid={!errors?.countryOfResidence}
        customRef={refs['countryOfResidenceRef']}
        emptySearchDefaultOption="Start typing to search"
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 10</QuestionHeading>
      <SubHeading>
        Dietary restrictions
        <Required />
      </SubHeading>
      <P>
        Please answer to the best of your abilities so we are able to accommodate your needs! Note
        that we may be unable to provide accommodations if you do not answer this accurately.
      </P>
      {errors?.dietaryRestriction && <ErrorMessage>{errors?.dietaryRestriction}</ErrorMessage>}
      {formInputs &&
        applyCustomSort(
          Object.entries(formInputs?.dietaryRestriction),
          Object.keys(DIETARY_RESTRICTION_OPTIONS)
        ).map(([key, val]) => (
          <Select
            key={key}
            type="checkbox"
            label={DIETARY_RESTRICTION_OPTIONS[key]}
            checked={val}
            onChange={() =>
              onChange({
                dietaryRestriction: { ...formInputs.dietaryRestriction, [key]: !val },
              })
            }
            customRef={key === 'vegetarian' ? refs['dietaryRestrictionRef'] : null}
          />
        ))}
      <br />
      {formInputs?.dietaryRestriction?.other && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs?.otherDietaryRestriction}
          onChange={e =>
            onChange({
              otherDietaryRestriction: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    {/* <FormSpacing>
      <QuestionHeading>question 12</QuestionHeading>
      <SubHeading>
        Will you be 19 years of age or older by January 20th, 2024?
        <Required />
      </SubHeading>
      {errors?.willBeAgeOfMajority && <ErrorMessage>{errors?.willBeAgeOfMajority}</ErrorMessage>}
      <Select
        type="radio"
        label="Yes"
        checked={formInputs.willBeAgeOfMajority}
        onChange={() => onChange({ willBeAgeOfMajority: true })}
        customRef={refs['willBeAgeOfMajorityRef']}
      />
      <Select
        type="radio"
        label="No"
        checked={formInputs.willBeAgeOfMajority === false}
        onChange={() => onChange({ willBeAgeOfMajority: false })}
      />
    </FormSpacing> */}

    <FormSpacing>
      <QuestionHeading>question 11</QuestionHeading>
      <SubHeading>
        Do you identify as part of an underrepresented gender in the technology industry?
        <Required />
      </SubHeading>
      {errors?.identifyAsUnderrepresented && (
        <ErrorMessage>{errors?.identifyAsUnderrepresented}</ErrorMessage>
      )}
      <Dropdown
        options={identifyAsUnderrepresentedOptions}
        placeholder="Answer"
        isSearchable={false}
        value={findElement(
          identifyAsUnderrepresentedOptions,
          'value',
          formInputs.identifyAsUnderrepresented
        )}
        onChange={inputValue =>
          onChange({
            identifyAsUnderrepresented: inputValue.value,
          })
        }
        isValid={!errors?.identifyAsUnderrepresented}
        customRef={refs['identifyAsUnderrepresentedRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <CenteredH1>Optional Questions</CenteredH1>
      <H2>
        The following questions are completely optional and do not affect your application as a
        hacker.
      </H2>
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 12</QuestionHeading>
      <SubHeading>What are your pronouns?</SubHeading>
      {/* {errors?.pronouns && <ErrorMessage>{errors?.pronouns}</ErrorMessage>} */}
      {formInputs &&
        applyCustomSort(Object.entries(formInputs?.pronouns), Object.keys(PRONOUN_OPTIONS)).map(
          ([key, val]) => (
            <Select
              key={key}
              type="checkbox"
              label={PRONOUN_OPTIONS[key]}
              checked={val}
              onChange={() =>
                onChange({
                  pronouns: { ...formInputs.pronouns, [key]: !val },
                })
              }
              customRef={key === 'vegetarian' ? refs['pronounsRef'] : null}
            />
          )
        )}
      <br />
      {formInputs?.pronouns?.other && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs?.otherPronoun}
          onChange={e =>
            onChange({
              otherPronoun: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 13</QuestionHeading>
      <SubHeading>What is your gender identity?</SubHeading>
      {/* {errors?.gender && <ErrorMessage>{errors?.gender}</ErrorMessage>} */}
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
      <QuestionHeading>question 14</QuestionHeading>
      <SubHeading>Do you have trans experience?</SubHeading>
      <Select
        type="radio"
        label="Yes"
        checked={formInputs.haveTransExperience}
        onChange={() => onChange({ haveTransExperience: true })}
        customRef={refs['haveTransExperienceRef']}
      />
      <Select
        type="radio"
        label="No"
        checked={formInputs.haveTransExperience === false}
        onChange={() => onChange({ haveTransExperience: false })}
      />
    </FormSpacing>

    {/* <FormSpacing>
      <QuestionHeading>question 14</QuestionHeading>
      <SubHeading>
        {formInputs.educationLevel === 'high school'
          ? 'What do you plan on studying?'
          : 'What is your current or intended major?'}
      </SubHeading>
      <P>Enter your intended/current major, or unknown</P>
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
        isValid={true}
        customRef={refs['majorRef']}
      />
    </FormSpacing> */}

    <FormSpacing>
      <QuestionHeading>question 15</QuestionHeading>
      <SubHeading>
        {formInputs.educationLevel === 'high school'
          ? 'What do you plan on studying?'
          : 'What is your current or intended major?'}
      </SubHeading>
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
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 16</QuestionHeading>
      <SubHeading>Which race(s) best describes you?</SubHeading>
      {formInputs &&
        applyCustomSort(Object.entries(formInputs?.race), Object.keys(RACE_OPTIONS)).map(
          ([key, val]) => (
            <Select
              key={key}
              type="checkbox"
              label={RACE_OPTIONS[key]}
              checked={val}
              onChange={() =>
                onChange({
                  race: { ...formInputs.race, [key]: !val },
                })
              }
              customRef={refs['raceRef']}
            />
          )
        )}
      <br />
      {formInputs?.race?.other && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs?.otherRace}
          onChange={e =>
            onChange({
              otherRace: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 17</QuestionHeading>
      <SubHeading>Do you identify as Indigenous/First Nations?</SubHeading>
      <Dropdown
        options={indigenousIdentificationOptions}
        placeholder="Identification"
        isSearchable={false}
        value={findElement(
          indigenousIdentificationOptions,
          'value',
          formInputs.indigenousIdentification
        )}
        onChange={e =>
          onChange({
            indigenousIdentification: e.value,
          })
        }
        isValid={true}
        customRef={refs['indigenousIdentificationRef']}
      />
      {formInputs.indigenousIdentification === 'yes' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.specifiedIndigenousIdentification}
          onChange={e =>
            onChange({
              specifiedIndigenousIdentification: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 18</QuestionHeading>
      <SubHeading>What is your cultural background?</SubHeading>
      {formInputs &&
        applyCustomSort(
          Object.entries(formInputs?.culturalBackground),
          Object.keys(CULTURAL_BG_OPTIONS)
        ).map(([key, val]) => (
          <Select
            key={key}
            type="checkbox"
            label={CULTURAL_BG_OPTIONS[key]}
            checked={val}
            onChange={() =>
              onChange({
                culturalBackground: { ...formInputs.culturalBackground, [key]: !val },
              })
            }
            customRef={refs['culturalBackgroundRef']}
          />
        ))}
      <br />
      {formInputs?.culturalBackground?.other && (
        <TextInput
          placeholder="Please Specify Other Cultural Background"
          size="small"
          noLeftOutline
          value={formInputs?.otherCulturalBackground}
          onChange={e =>
            onChange({
              otherCulturalBackground: e.target.value,
            })
          }
        />
      )}
      {formInputs?.culturalBackground?.firstNationsOrIndigenous && (
        <TextInput
          placeholder="Please Specify First Nations/Indigenous Background"
          size="small"
          noLeftOutline
          value={formInputs?.otherFirstNationsOrIndigenous}
          onChange={e =>
            onChange({
              otherFirstNationsOrIndigenous: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    {/* <FormSpacing>
      <QuestionHeading>question 16</QuestionHeading>
      <SubHeading>Are you legally authorized to work in Canada?</SubHeading>
      <Select
        type="radio"
        label="Yes"
        checked={formInputs.isAuthorizedToWorkInCanada}
        onChange={() => onChange({ isAuthorizedToWorkInCanada: true })}
        customRef={refs['isAuthorizedToWorkInCanadaRef']}
      />
      <Select
        type="radio"
        label="No"
        checked={formInputs.isAuthorizedToWorkInCanada === false}
        onChange={() => onChange({ isAuthorizedToWorkInCanada: false })}
      />
    </FormSpacing> */}

    <FormSpacing>
      <QuestionHeading>question 19</QuestionHeading>
      <SubHeading>What is your Canadian status?</SubHeading>
      <P>
        Note: this does not affect your application and is only collected for potential employers at
        the event.{' '}
      </P>
      <Dropdown
        options={canadianStatusOptions}
        placeholder="Canadian Status"
        isSearchable={false}
        value={findElement(canadianStatusOptions, 'value', formInputs.canadianStatus)}
        onChange={inputValue =>
          onChange({
            canadianStatus: inputValue.value,
          })
        }
        isValid={true}
        customRef={refs['canadianStatusRef']}
      />
      {formInputs.canadianStatus === 'other' && (
        <TextInput
          placeholder="Please Specify"
          size="small"
          noOutline
          value={formInputs.otherCanadianStatus}
          errorMsg={errors?.otherCanadianStatus}
          invalid={!!errors?.otherCanadianStatus}
          onChange={e =>
            onChange({
              otherCanadianStatus: e.target.value,
            })
          }
        />
      )}
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 20</QuestionHeading>
      <SubHeading>Do you have any visible or invisible disabilities?</SubHeading>
      <StyledTextArea
        maxWords="200"
        width="100%"
        value={formInputs.disability}
        invalid={!!errors.disability}
        errorMsg={errors.disability}
        onChange={val =>
          onChange({
            disability: val,
          })
        }
        customRef={refs['disabilityRef']}
      />
    </FormSpacing>
  </>
)

export default BasicInfo
