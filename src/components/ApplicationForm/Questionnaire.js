import React from 'react'
import { Select, TextInput } from '../../components/Input'
import { ErrorMessage, QuestionHeading, ErrorSpan as Required } from '../../components/Typography'
import { copyText } from '../../utility/Constants'
import { CenteredH1 } from '../Typography'
import { FormSpacing, SubHeading } from './'

// const StyledDropdown = styled(Dropdown)`
//   .react-select__control {
//     margin: 0 0 1em;
//   }
// `

// const StyledTextInput = styled(TextInput)`
//   margin: 0.5em 1em 1em 0;
// `

export const options = [
  { value: '0', label: 'LinkedIn' },
  { value: '1', label: 'MLH' },
  { value: '2', label: 'Social media' },
  { value: '3', label: 'Website' },
  { value: '4', label: 'Word of mouth' },
  { value: '5', label: 'Club newsletter' },
  { value: '6', label: 'Faculty newsletter' },
  { value: '7', label: 'Professors/In Class' },
  { value: '8', label: 'Other' },
]

// form part 3
export default ({ errors, formInputs, onChange }) => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Almost there...{' '}
          <span role="img" aria-label="Grinning face with star eyes emoji">
            🤩
          </span>
        </CenteredH1>
      </FormSpacing>
      <FormSpacing>
        <QuestionHeading>Question 29</QuestionHeading>
        <SubHeading>
          How did you hear about {copyText.hackathonName}?
          <Required />
        </SubHeading>
        {errors?.engagementSource && <ErrorMessage>{errors?.resume}</ErrorMessage>}

        {/* <StyledDropdown
          options={options}
          placeholder="Select an option"
          isSearchable={false}
          value={findElement(options, 'label', formInputs.engagementSource)}
          onChange={inputValue =>
            onChange({
              ...formInputs,
              engagementSource: inputValue.label,
            })
          }
          isValid
        /> */}

        <Select
          type="checkbox"
          label="Attended Previously"
          checked={formInputs.engagementSource.attendedPreviously}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                attendedPreviously: !formInputs.engagementSource.attendedPreviously,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="MLH"
          checked={formInputs.engagementSource.MLH}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                MLH: !formInputs.engagementSource.MLH,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Instagram"
          checked={formInputs.engagementSource.instagram}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                instagram: !formInputs.engagementSource.instagram,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Facebook"
          checked={formInputs.engagementSource.facebook}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                facebook: !formInputs.engagementSource.facebook,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="LinkedIn"
          checked={formInputs.engagementSource.linkedIn}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                linkedIn: !formInputs.engagementSource.linkedIn,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Website"
          checked={formInputs.engagementSource.website}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                website: !formInputs.engagementSource.website,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Word-of-mouth"
          checked={formInputs.engagementSource.wordOfMouth}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                wordOfMouth: !formInputs.engagementSource.wordOfMouth,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwPlus Newsletter"
          checked={formInputs.engagementSource.nwPlusNewsletter}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                nwPlusNewsletter: !formInputs.engagementSource.nwPlusNewsletter,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Faculty Newsletter"
          checked={formInputs.engagementSource.facultyNewsletter}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                facultyNewsletter: !formInputs.engagementSource.facultyNewsletter,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Professors/In Class"
          checked={formInputs.engagementSource.professorInClass}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                professorInClass: !formInputs.engagementSource.professorInClass,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="Other (Please Specify)"
          checked={formInputs.engagementSource.other}
          onChange={() =>
            onChange({
              ...formInputs,
              engagementSource: {
                ...formInputs.engagementSource,
                other: !formInputs.engagementSource.other,
              },
            })
          }
        />

        {formInputs.engagementSource.other && (
          <TextInput
            placeholder="Please Specify"
            size="small"
            noOutline
            value={formInputs.otherEngagementSource}
            onChange={e =>
              onChange({
                ...formInputs,
                otherEngagementSource: e.target.value,
              })
            }
          />
        )}
      </FormSpacing>

      <FormSpacing>
        <QuestionHeading>Question 30</QuestionHeading>
        <SubHeading>
          Have you previously attended any nwPlus organized events? (select all that apply)
          <Required />
        </SubHeading>
        <Select
          type="checkbox"
          label="HackCamp 2021"
          checked={formInputs.eventsAttended.hackCamp2021}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                hackCamp2021: !formInputs.eventsAttended.hackCamp2021,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="HackCamp 2022"
          checked={formInputs.eventsAttended.hackCamp2022}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                hackCamp2022: !formInputs.eventsAttended.hackCamp2022,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="HackCamp 2023"
          checked={formInputs.eventsAttended.hackCamp2023}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                hackCamp2023: !formInputs.eventsAttended.hackCamp2023,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2021"
          checked={formInputs.eventsAttended.nwHacks2021}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2021: !formInputs.eventsAttended.nwHacks2021,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2022"
          checked={formInputs.eventsAttended.nwHacks2022}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2022: !formInputs.eventsAttended.nwHacks2022,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2023"
          checked={formInputs.eventsAttended.nwHacks2023}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2023: !formInputs.eventsAttended.nwHacks2023,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="nwHacks 2024"
          checked={formInputs.eventsAttended.nwHacks2024}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                nwHacks2024: !formInputs.eventsAttended.nwHacks2024,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2020"
          checked={formInputs.eventsAttended.cmdf2020}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2020: !formInputs.eventsAttended.cmdf2020,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2021"
          checked={formInputs.eventsAttended.cmdf2021}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2021: !formInputs.eventsAttended.cmdf2021,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2022"
          checked={formInputs.eventsAttended.cmdf2022}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2022: !formInputs.eventsAttended.cmdf2022,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="cmd-f 2023"
          checked={formInputs.eventsAttended.cmdf2023}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                cmdf2023: !formInputs.eventsAttended.cmdf2023,
              },
            })
          }
        />
        <Select
          type="checkbox"
          label="None"
          checked={formInputs.eventsAttended.none}
          onChange={() =>
            onChange({
              ...formInputs,
              eventsAttended: {
                ...formInputs.eventsAttended,
                none: !formInputs.eventsAttended.none,
              },
            })
          }
        />
      </FormSpacing>

      {/* <FormSpacing>
        <QuestionHeading>question 19</QuestionHeading>
        <SubHeading>
          Are you registering with a friend? If so, insert their email here for a chance to win a
          small prize!
        </SubHeading>
        <P>
          Please ensure this email is the same one your friend is using to apply with. Including an
          email here does not register you as a team.
        </P>
        <StyledTextInput
          placeholder="hacker@nwplus.io"
          value={formInputs.friendEmail}
          errorMsg={errors?.friendEmail}
          invalid={!!errors?.friendEmail}
          onChange={e =>
            onChange({
              friendEmail: e.target.value,
            })
          }
        />
      </FormSpacing> */}
    </>
  )
}
