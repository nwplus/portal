import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Button, Select, TextArea, TextInput, Dropdown } from '../Input'
import { ErrorSpan as Required, ErrorMessage, H1, H3, P, Label } from '../Typography'
import ErrorBanner from '../ErrorBanner'
import { validateDiscord, validateEmail, validateURL } from '../../utility/Validation'
import { getSponsorPrizes } from '../../utility/firebase'

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

const MAX_CHARS = 240

export default ({ project, onSubmit, isSubmitting, error }) => {
  const [title, setTitle] = useState(project.title || '')
  const [description, setDescription] = useState(project.description || '')
  const [members, setMembers] = useState(project.teamMembers || defaultMembers)
  const [links, setLinks] = useState(project.links || {})
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [selectedPrizes, setSelectedPrizes] = useState(project.sponsorPrizes || [])
  const [mentorNominations, setMentorNominations] = useState(project.mentorNominations || '')
  const [draftStatus, setDraftStatus] = useState(project.draftStatus || 'draft')
  const [errors, setErrors] = useState({})

  // Fetch list of sponsor prizes from Firebase
  useEffect(() => {
    async function getPrizes() {
      const prizes = await getSponsorPrizes()
      setSponsorPrizes(prizes)
    }
    getPrizes()
  }, [])

  // Fill the rest of the members array with empty objects
  // Required so that updateMember function doesn't break
  useEffect(() => {
    setTitle(project.title || '')
    setDescription(project.description || '')
    setLinks(project.links || {})
    setSelectedPrizes(project.sponsorPrizes || [])
    setMentorNominations(project.mentorNominations || '')
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
    members.forEach((member, index) => {
      const isRequired = index === 0
      if (!member.name && (isRequired || member.email || member.discord)) {
        newErrors[`member${index + 1}Name`] = 'Please enter a name'
      }
      if (!member.email && (isRequired || member.name || member.discord)) {
        newErrors[`member${index + 1}Email`] = 'Please enter a valid email'
      }
      if (!member.discord && (isRequired || member.name || member.email)) {
        newErrors[`member${index + 1}Discord`] =
          'Please enter a valid Discord username (eg. username#1234)'
      }
      if (member.email && !validateEmail(member.email)) {
        newErrors[`member${index + 1}Email`] = 'Please enter a valid email'
      }
      if (member.discord && !validateDiscord(member.discord)) {
        newErrors[`member${index + 1}Discord`] =
          'Please enter a valid Discord username (eg. username#1234)'
      }
    })

    // Validate links
    if (!links.youtube) {
      newErrors.youtube = 'Please enter a URL'
    }
    if (!links.sourceCode) {
      newErrors.sourceCode = 'Please enter a URL'
    }
    Object.entries(links).forEach(entry => {
      const [source, link] = entry
      if (link && !validateURL(link)) {
        newErrors[source] = 'Please enter a valid URL'
      }
    })
    setErrors(newErrors)

    // Remove incomplete member objects
    const membersArray = [...members]
    const filteredMembers = membersArray.filter(member => {
      return member?.name && member?.email && member?.discord
    })

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        title,
        description,
        teamMembers: filteredMembers,
        links,
        sponsorPrizes: selectedPrizes,
        mentorNominations,
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
          <Label>Project title</Label>
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
          <Label>Project description</Label>
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
        <Label>Links</Label>
        <TextInputWithField
          fieldName="YouTube URL"
          value={links?.youtube}
          required
          invalid={errors?.youtube}
          errorMsg={errors?.youtube}
          onChange={e => setLinks({ ...links, youtube: e.target.value })}
        />
        <TextInputWithField
          fieldName="Source code (GitHub/BitBucket/GitLab)"
          value={links?.sourceCode}
          required
          invalid={errors?.sourceCode}
          errorMsg={errors?.sourceCode}
          onChange={e => setLinks({ ...links, sourceCode: e.target.value })}
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
        <Label>Sponsor Prizes</Label>
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
      <StyledHr />
      <FormSection>
        <Label>Add up to 4 team members</Label>
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
              <TextInputWithField
                fieldName="Discord username"
                value={member?.discord}
                placeholder="username#1234"
                required={index === 0}
                invalid={errors?.[`member${index + 1}Discord`]}
                errorMsg={errors?.[`member${index + 1}Discord`]}
                onChange={e => updateMember(index, 'discord', e.target.value)}
              />
            </TeamMember>
          ))}
        </MemberList>
      </FormSection>
      <StyledHr />
      <FormSection>
        <div>
          <Label>Mentor nominations</Label>
          <P>
            Nominate any mentors who helped make your hackathon experience better! Include their
            name and/or Discord username and how they helped.
          </P>
        </div>
        <TextArea value={mentorNominations} maxLength={MAX_CHARS} onChange={setMentorNominations} />
      </FormSection>
      {Object.keys(errors).length > 0 && (
        <ErrorMessage>Please address errors before submitting</ErrorMessage>
      )}
      {project.lastEditedBy && (
        <div>
          Last edited by {project.lastEditedBy.email} at {project.lastEditedBy.date.toString()}
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
          color="primary"
          onClick={!isSubmitting ? handleSubmit : undefined}
          disabled={isSubmitting}
        >
          Submit
        </Button>
        <Button
          no_margin
          color="secondary"
          width="flex"
          onClick={!isSubmitting ? handleSubmit : undefined}
          disabled={isSubmitting}
        >
          Leave Project
        </Button>
      </ButtonContainer>
      {error && <ErrorBanner>{error.message}</ErrorBanner>}
    </div>
  )
}
