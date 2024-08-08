import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  CULTURAL_BG_OPTIONS,
  DIETARY_RESTRICTION_OPTIONS,
  MAJOR_OPTIONS,
  PRONOUN_OPTIONS,
  RACE_OPTIONS,
} from '../../utility/Constants'
import { TextArea } from '../Input'
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
import { useHackathon } from '../../utility/HackathonProvider'
import { getHackerAppQuestions } from '../../utility/firebase'
import {
  Country,
  School,
  SelectAll,
  AppDropdown,
  MultipleChoice,
  ShortAnswer,
  LongAnswer,
} from '../ApplicationQuestions'

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

const StyledTextInput = styled(TextInput)`
  margin: 0.5em 1em 1em 0;
`

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

// form part 1
const BasicInfo = ({ refs, errors, formInputs, onChange }) => {
  const { dbHackathonName } = useHackathon()
  const [questions, setQuestions] = useState([
    { title: '', description: '', type: '', options: [''], other: false, required: false },
  ])

  useEffect(() => {
    const fetchQuestions = async () => {
      const appQuestions = await getHackerAppQuestions(dbHackathonName, 'BasicInfo')
      setQuestions(appQuestions)
    }
    fetchQuestions()
  }, [dbHackathonName])

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'Multiple Choice':
        return (
          <MultipleChoice
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Dropdown':
        return (
          <AppDropdown
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Select All':
        return (
          <SelectAll
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Short Answer':
        return (
          <ShortAnswer
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Long Answer':
        return (
          <LongAnswer
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'School':
        return <School refs={refs} errors={errors} formInputs={formInputs} onChange={onChange} />

      case 'Country':
        return <Country refs={refs} errors={errors} formInputs={formInputs} onChange={onChange} />

      default:
        return null
    }
  }

  return (
    <>
      <FormSpacing>
        <CenteredH1>General Questions</CenteredH1>
        <H2>
          First, we’d like to ask a few general questions about you. The information entered here
          does not affect your application as a hacker.
        </H2>
      </FormSpacing>

      {questions.map((question, index) => (
        <FormSpacing key={index}>
          <QuestionHeading>{`question ${index + 1}`}</QuestionHeading>
          <SubHeading>
            {question.title}
            {question.required && <Required />}
          </SubHeading>
          {question.description && <P>{question.description}</P>}
          {renderQuestion(question, index)}
        </FormSpacing>
      ))}

      {/* <FormSpacing>
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
      </FormSpacing> */}

      {/*

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

      {/* <FormSpacing>
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
      </FormSpacing> */}

      {/* <FormSpacing>
        <CenteredH1>Optional Questions</CenteredH1>
        <H2>
          The following questions are completely optional and do not affect your application as a
          hacker.
        </H2>
      </FormSpacing> */}

      {/* <FormSpacing>
        <QuestionHeading>question 12</QuestionHeading>
        <SubHeading>What are your pronouns?</SubHeading>
        {errors?.pronouns && <ErrorMessage>{errors?.pronouns}</ErrorMessage>}
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
      </FormSpacing> */}

      {/* <FormSpacing>
        <QuestionHeading>question 13</QuestionHeading>
        <SubHeading>What is your gender identity?</SubHeading>
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
      </FormSpacing> */}

      {/* <FormSpacing>
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
      </FormSpacing> */}

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

      {/* <FormSpacing>
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
      </FormSpacing> */}

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

      {/* <FormSpacing>
        <QuestionHeading>question 19</QuestionHeading>
        <SubHeading>What is your Canadian status?</SubHeading>
        <P>
          Note: this does not affect your application and is only collected for potential employers
          at the event.{' '}
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
      </FormSpacing> */}
    </>
  )
}

export default BasicInfo
