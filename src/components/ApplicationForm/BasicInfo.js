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
import { copyText, ETHNICITY_OPTIONS } from '../../utility/Constants'

const genderOptions = [
  { value: 'female', label: 'Woman' },
  { value: 'male', label: 'Man' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Prefer to self-describe' },
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

const educationOptions = [
  { value: 'high school', label: 'Secondary/High school' },
  {
    value: 'undergraduate college',
    label: 'Undergraduate University (2 year - community college or similar)',
  },
  { value: 'undergraduate full', label: 'Undergraduate University (3+ year)' },
  { value: 'graduate', label: 'Graduate University (Masters, Professional, Doctoral, etc)' },
  { value: 'not-a-student', label: `I'm not currently a student` },
  { value: 'other', label: 'Other' },
]

const graduationOptions = [
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
  { value: 2026, label: '2026' },
  { value: 2027, label: '2027+' },
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
          ✨
        </span>{' '}
        What is your preferred name?
        <Required />
      </SubHeading>

      <StyledTextInput
        placeholder="Preferred Name"
        value={formInputs.preferredName}
        errorMsg={errors?.preferredName}
        invalid={!!errors?.preferredName}
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
      <QuestionHeading>question 04</QuestionHeading>
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
      <QuestionHeading>question 05</QuestionHeading>
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
      <QuestionHeading>question 06</QuestionHeading>
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
              label={ETHNICITY_OPTIONS[key]}
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
      <QuestionHeading>question 07</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Baby chick emoji">
          🐥
        </span>{' '}
        Will you be 19 years of age or older by Jan 14th, 2023?
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
      <QuestionHeading>question 08</QuestionHeading>
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
      <QuestionHeading>question 09</QuestionHeading>
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
      <QuestionHeading>question 10</QuestionHeading>
      <SubHeading>
        <span role="img" aria-label="Book emoji">
          📖
        </span>{' '}
        {formInputs.educationLevel === 'high school'
          ? 'What do you plan on studying?'
          : 'What is your current or intended major?'}
        <Required />
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
        isValid={!errors?.major}
        customRef={refs['majorRef']}
      />
    </FormSpacing>

    <FormSpacing>
      <QuestionHeading>question 11</QuestionHeading>
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
      <QuestionHeading>question 12</QuestionHeading>
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

    <FormSpacing>
      <QuestionHeading>question 13</QuestionHeading>
      <SubHeading>
        What is your country of residence?
        <Required />
      </SubHeading>
      {errors?.countryOfResidence && <ErrorMessage>{errors?.countryOfResidence}</ErrorMessage>}
      <Dropdown
        options={countryOptions}
        placeholder="country..."
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
  </>
)
