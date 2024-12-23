import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  validateDevpostURL,
  validateDiscord,
  validateEmail,
  validateURL,
  validateYoutubeURL,
} from '../../utility/Validation'
import { getSponsorPrizes } from '../../utility/firebase'
import { findElement } from '../../utility/utilities'
import { Button, Dropdown, Select, TextArea, TextInput } from '../Input'
import Toast from '../Toast'
import { A, ErrorMessage, H1, H3, Label, P, ErrorSpan as Required } from '../Typography'
import { useHackathon } from '../../utility/HackathonProvider'

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`

const StyledHr = styled.hr`
  margin: 40px 0;
  border-color: ${p => p.theme.colors.border};
`

const HeadingLabel = styled(Label)`
  color: ${p => p.theme.colors.text};
`

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledH3 = styled(H3)`
  margin: 0;
  text-transform: uppercase;
`

const StyledA = styled(A)`
  font-weight: bold;
  &:hover {
    color: ${p => p.theme.colors.tertiaryHover};
  }
`

const FieldName = styled.div`
  margin-bottom: 4px;
`

const StyledTextInput = styled(TextInput)`
  margin: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const charities = [
  {
    value: 'BC Children’s Hospital',
    label: 'BC Children’s Hospital',
  },
  {
    value: 'Alzheimer Society of Canada',
    label: 'Alzheimer Society of Canada',
  },
  {
    value: 'Nature Trust of British Columbia',
    label: 'Nature Trust of British Columbia',
  },
]

const TextInputWithField = ({
  fieldName,
  value,
  placeholder,
  autocomplete,
  required,
  invalid,
  errorMsg,
  onChange,
}) => {
  return (
    <div>
      <FieldName>
        {fieldName}
        {required && <Required />}
      </FieldName>
      <StyledTextInput
        value={value}
        placeholder={placeholder}
        autoComplete={autocomplete}
        invalid={invalid}
        errorMsg={errorMsg}
        onChange={onChange}
      />
    </div>
  )
}

// Need to be explicit with object declaration (otherwise they'll all reference the same object)
const defaultMembers = [{}, {}, {}, {}]

const MAX_CHARS = 10000

const SubmissionForm = ({
  project,
  onSubmit,
  isSubmitting,
  onLeave,
  isLeaving,
  error,
  successMsg,
  userData,
}) => {
  const [title, setTitle] = useState(project.title || '')
  const [description, setDescription] = useState(project.description || '')
  const [members, setMembers] = useState(project.teamMembers || defaultMembers)
  const [links, setLinks] = useState(project.links || {})
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [mentorNomination, setMentorNomination] = useState(project.mentorNomination || '')
  const [charityChoice, setCharityChoice] = useState(project.charityChoice || '')
  const [selectedPrizes, setSelectedPrizes] = useState(project.sponsorPrizes || [])
  const [draftStatus, setDraftStatus] = useState(project.draftStatus || 'draft')
  const [errors, setErrors] = useState({})
  const { dbHackathonName } = useHackathon()

  // Fetch list of sponsor prizes from Firebase
  useEffect(() => {
    async function getPrizes() {
      const prizes = await getSponsorPrizes(dbHackathonName)
      setSponsorPrizes(prizes)
    }
    getPrizes()
  }, [dbHackathonName])

  // Fill the rest of the members array with empty objects
  // Required so that updateMember function doesn't break
  useEffect(() => {
    setTitle(project.title || '')
    setDescription(project.description || '')
    setLinks(project.links || {})
    setMentorNomination(project.mentorNomination || '')
    setCharityChoice(project.charityChoice || '')
    setSelectedPrizes(project.sponsorPrizes || [])
    setDraftStatus(project.draftStatus || 'draft')

    const newArray = project.teamMembers ? [...project.teamMembers] : []
    if (newArray.length < 4) {
      // Do with for loop, since Array.fill will fill with references to same object
      for (let i = newArray.length; i < 4; i++) {
        newArray.push({})
      }
    }
    setMembers(newArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project])

  const updateMember = (index, field, value) => {
    const newMembers = [...members]
    newMembers[index][field] = value
    setMembers(newMembers)
  }

  const handleCheck = prize => {
    const newArray = [...selectedPrizes]
    if (selectedPrizes.includes(prize)) {
      setSelectedPrizes(newArray.filter(item => item !== prize))
    } else {
      newArray.push(prize)
      setSelectedPrizes(newArray)
    }
  }

  const handleSubmit = () => {
    const newErrors = {}

    // Validate title and description
    if (!title) {
      newErrors.title = 'Please include a title'
    }
    if (!description) {
      newErrors.description = 'Please include a description'
    }
    if (description.length > MAX_CHARS) {
      newErrors.description = `Please keep your description under ${MAX_CHARS} characters`
    }

    // Validate member fields
    let containsSelf = false
    members.forEach((member, index) => {
      const isRequired = index === 0
      if (member.email === userData.basicInfo.email) {
        containsSelf = true
      }
      if (!member.name && (isRequired || member.email || member.discord)) {
        newErrors[`member${index + 1}Name`] = 'Please enter a name'
      }
      if (!member.email && (isRequired || member.name || member.discord)) {
        newErrors[`member${index + 1}Email`] = 'Please enter a valid email'
      }
      // if (!member.discord && (isRequired || member.name || member.email)) {
      //   newErrors[`member${index + 1}Discord`] =
      //     'Please enter a valid Discord username (eg. username#1234)'
      // }
      if (member.email && !validateEmail(member.email)) {
        newErrors[`member${index + 1}Email`] = 'Please enter a valid email'
      }
      if (member.discord && !validateDiscord(member.discord)) {
        newErrors[`member${index + 1}Discord`] =
          'Please enter a valid Discord username (eg. username#1234)'
      }
    })

    // Validate that currently auth'd user has included themself in submission
    if (!containsSelf) {
      newErrors.self = 'You must include yourself in the submission'
    }

    // Validate Devpost
    if (!links.devpost) {
      newErrors.devpost = 'Please enter a URL'
    } else if (!validateDevpostURL(links.devpost)) {
      newErrors.devpost = 'Please enter a valid Devpost URL'
    }

    // Validate YouTube link
    if (!links.youtube) {
      newErrors.youtube = 'Please enter a URL'
    } else if (!validateYoutubeURL(links.youtube)) {
      newErrors.youtube = 'Please enter a valid YouTube URL'
    }

    // Validate source code link
    if (!links.sourceCode) {
      newErrors.sourceCode = 'Please enter a URL'
    } else if (!validateURL(links.sourceCode)) {
      newErrors.sourceCode = 'Please enter a valid source code URL'
    }

    // Validate charity selection
    if (!charityChoice) {
      newErrors.charity = 'Please select a charity'
    }

    setErrors(newErrors)

    // Remove incomplete member objects
    const membersArray = [...members]
    const filteredMembers = membersArray.filter(member => {
      return member?.name && member?.email // && member?.discord
    })

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        title,
        description,
        teamMembers: filteredMembers,
        links,
        sponsorPrizes: selectedPrizes,
        charityChoice,
        mentorNomination,
        uid: project.uid,
        draftStatus,
      })
    }
  }

  return (
    <div>
      <H1>Project Submission</H1>
      <FormSection>
        <div>
          <HeadingLabel>Project title</HeadingLabel>
          <Required />
        </div>
        <StyledTextInput
          value={title}
          invalid={errors?.title}
          errorMsg={errors?.title}
          onChange={e => setTitle(e.target.value)}
        />
      </FormSection>
      <FormSection>
        <div>
          <HeadingLabel>Project description</HeadingLabel>
          <Required />
        </div>
        <TextArea
          value={description}
          maxLength={MAX_CHARS}
          invalid={errors?.description}
          errorMsg={errors?.description}
          onChange={setDescription}
        />
      </FormSection>
      <FormSection>
        <HeadingLabel>Links</HeadingLabel>
        <TextInputWithField
          fieldName="Source code (GitHub/BitBucket/GitLab)"
          value={links?.sourceCode}
          required
          invalid={errors?.sourceCode}
          errorMsg={errors?.sourceCode}
          onChange={e => setLinks({ ...links, sourceCode: e.target.value })}
        />
        {/* <P>
          <b>Please note</b>: only code projects can be eligible for prizes. If you built a no-code
          project, please enter your prototype link.
        </P> */}
        <TextInputWithField
          fieldName="Devpost URL"
          value={links?.devpost}
          required
          invalid={errors?.devpost}
          errorMsg={errors?.devpost}
          onChange={e => setLinks({ ...links, devpost: e.target.value })}
        />
        <TextInputWithField
          fieldName="YouTube URL"
          value={links?.youtube}
          required
          invalid={errors?.youtube}
          errorMsg={errors?.youtube}
          onChange={e => setLinks({ ...links, youtube: e.target.value })}
        />
        <TextInputWithField
          fieldName="Other"
          value={links?.other}
          invalid={errors?.other}
          errorMsg={errors?.other}
          onChange={e => setLinks({ ...links, other: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <HeadingLabel>Mentor Nomination</HeadingLabel>
        <TextInputWithField
          fieldName="Nominate the most helpful mentor that assisted you or your team"
          value={mentorNomination}
          onChange={e => setMentorNomination(e.target.value)}
        />
      </FormSection>
      <FormSection>
        <div>
          <HeadingLabel>Charity Choice</HeadingLabel>
          <Required />
        </div>
        <div>
          <P>
            Every project submitted at HackCamp 2024, regardless of completion, will be eligible for
            a $5 donation to the charity of your choice from a curated list by the HackCamp team!
            This is done so as to emphasize HackCamp's mission of focusing on the learning and
            growth aspect of hackathons!
          </P>
          <P style={{ marginTop: '8px' }}>
            Click &#8202;
            <StyledA
              target="_blank"
              rel="noreferrer noopener"
              href="https://nwplus.notion.site/PUBLIC-Charities-4ec11b0a63e843d7bf7d681576caecd1"
            >
              here
            </StyledA>
            &#8202; to learn more about each charity.
          </P>
          <Dropdown
            options={charities}
            placeholder={
              charityChoice ? 'Pick a charity' : findElement(charities, 'value', charityChoice)
            }
            value={findElement(charities, 'value', charityChoice)}
            isSearchable={false}
            onChange={inputValue => setCharityChoice(inputValue.value)}
            isValid={!errors?.charity}
            errorMessage={errors?.charity}
          />
        </div>
      </FormSection>
      {sponsorPrizes && (
        <FormSection>
          <HeadingLabel>Sponsor Prizes</HeadingLabel>
          <div>
            {sponsorPrizes.map(prize => {
              return (
                <Select
                  key={prize}
                  type="checkbox"
                  checked={selectedPrizes.includes(prize)}
                  label={prize}
                  onChange={() => handleCheck(prize)}
                />
              )
            })}
          </div>
        </FormSection>
      )}
      <StyledHr />
      <FormSection>
        <HeadingLabel>Add up to 4 team members</HeadingLabel>
        <MemberList>
          {members.map((member, index) => (
            <TeamMember>
              <StyledH3>Member {index + 1}</StyledH3>
              <TextInputWithField
                fieldName="Name"
                value={member?.name}
                placeholder="FirstName LastName"
                autocomplete="name"
                required={index === 0}
                invalid={errors?.[`member${index + 1}Name`]}
                errorMsg={errors?.[`member${index + 1}Name`]}
                onChange={e => updateMember(index, 'name', e.target.value)}
              />
              <TextInputWithField
                fieldName="Email"
                value={member?.email}
                placeholder="name@nwplus.io"
                autocomplete="email"
                required={index === 0}
                invalid={errors?.[`member${index + 1}Email`]}
                errorMsg={errors?.[`member${index + 1}Email`]}
                onChange={e => updateMember(index, 'email', e.target.value)}
              />
              {/* HackCamp 2022 uses slack */}
              {/* <TextInputWithField
                fieldName="Discord username"
                value={member?.discord}
                placeholder="username#1234"
                required={index === 0}
                invalid={errors?.[`member${index + 1}Discord`]}
                errorMsg={errors?.[`member${index + 1}Discord`]}
                onChange={e => updateMember(index, 'discord', e.target.value)}
              /> */}
            </TeamMember>
          ))}
        </MemberList>
        {errors.self && <ErrorMessage>{errors.self}</ErrorMessage>}
      </FormSection>
      {Object.keys(errors).length > 0 && (
        <ErrorMessage>Please address errors before submitting</ErrorMessage>
      )}
      {project.lastEditedBy && (
        <div>
          Last edited by {project.lastEditedBy.email} at{' '}
          {project.lastEditedBy.date.toDate().toLocaleString()}
        </div>
      )}
      <StyledHr />
      <Dropdown
        options={[
          { value: 'draft', label: 'Save as draft' },
          { value: 'public', label: 'Publish project' },
        ]}
        placeholder={draftStatus === 'draft' ? 'Save as draft' : 'Publish project'}
        isSearchable={false}
        onChange={inputValue => setDraftStatus(inputValue.value)}
        isValid
      />
      <ButtonContainer>
        <Button
          no_margin
          color="secondary"
          onClick={!isSubmitting ? handleSubmit : undefined}
          disabled={isSubmitting}
        >
          Save
        </Button>
        <Button
          no_margin
          color="secondary"
          width="flex"
          onClick={!isLeaving ? onLeave : undefined}
          disabled={isLeaving}
        >
          Leave Project
        </Button>
      </ButtonContainer>
      {error && <Toast>{error.message}</Toast>}
      {successMsg && <Toast type="success">{successMsg}</Toast>}
    </div>
  )
}

export default SubmissionForm
