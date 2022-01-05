import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, TextArea, TextInput } from '../Input'
import { ErrorSpan as Required, ErrorMessage, H1, Label } from '../Typography'
import { validateDiscord, validateEmail, validateURL } from '../../utility/Validation'
import { getSponsorPrizes } from '../../utility/firebase'

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`

const TeamMemberRow = styled.div`
  display: flex;
  gap: 16px;
`

const StyledTextInput = styled(TextInput)`
  margin: 0;
`

const TextInputWithField = ({
  fieldName,
  value,
  placeholder,
  required,
  invalid,
  errorMsg,
  onChange,
}) => {
  return (
    <div>
      {fieldName}
      {required && <Required />}
      <StyledTextInput
        value={value}
        placeholder={placeholder}
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

export default ({ project, onSubmit }) => {
  const [title, setTitle] = useState(project.title || '')
  const [description, setDescription] = useState(project.description || '')
  const [members, setMembers] = useState(project.teamMembers || defaultMembers)
  const [links, setLinks] = useState(project.links || {})
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [selectedPrizes, setSelectedPrizes] = useState(project.sponsorPrizes || [])
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
    const newArray = [...members]
    if (newArray.length < 4) {
      // Do with for loop, since Array.fill will fill with references to same object
      for (let i = newArray.length; i < 4; i++) {
        newArray.push({})
      }
    }
    setMembers(newArray)
  }, [])

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
      if (!member.name && (member.email || member.discord)) {
        console.log('name missing')
        newErrors[`member${index + 1}Name`] = 'Please enter a name'
      }
      if (!member.email && (member.name || member.discord)) {
        console.log('email missing')
        newErrors[`member${index + 1}Email`] = 'Please enter a valid email'
      }
      if (!member.discord && (member.name || member.email)) {
        console.log('discord missing')
        newErrors[`member${index + 1}Discord`] = 'Please enter a valid Discord username'
      }
      if (member.email && !validateEmail(member.email)) {
        newErrors[`member${index + 1}Email`] = 'Please enter a valid email'
      }
      if (member.discord && !validateDiscord(member.discord)) {
        newErrors[`member${index + 1}Discord`] = 'Please enter a valid Discord username'
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
        console.log('not a valid URL')
        newErrors[source] = 'Please enter a valid URL'
      }
    })
    setErrors(newErrors)

    // Remove incomplete member objects
    const membersArray = [...members]
    console.log(membersArray)
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
        <Label>Team members</Label>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 1 Name"
            value={members[0]?.name}
            placeholder="FirstName LastName"
            required
            invalid={errors?.member1Name}
            errorMsg={errors?.member1Name}
            onChange={e => updateMember(0, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 1 Email"
            value={members[0]?.email}
            placeholder="name@nwplus.io"
            required
            invalid={errors?.member1Email}
            errorMsg={errors?.member1Email}
            onChange={e => updateMember(0, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 1 Discord"
            value={members[0]?.discord}
            placeholder="username#1234"
            required
            invalid={errors?.member1Discord}
            errorMsg={errors?.member1Discord}
            onChange={e => updateMember(0, 'discord', e.target.value)}
          />
        </TeamMemberRow>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 2 Name"
            value={members[1]?.name}
            invalid={errors?.member2Name}
            errorMsg={errors?.member2Name}
            onChange={e => updateMember(1, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 2 Email"
            value={members[1]?.email}
            invalid={errors?.member2Email}
            errorMsg={errors?.member2Email}
            onChange={e => updateMember(1, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 2 Discord"
            value={members[1]?.discord}
            invalid={errors?.member2Discord}
            errorMsg={errors?.member2Discord}
            onChange={e => updateMember(1, 'discord', e.target.value)}
          />
        </TeamMemberRow>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 3 Name"
            value={members[2]?.name}
            invalid={errors?.member3Name}
            errorMsg={errors?.member3Name}
            onChange={e => updateMember(2, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 3 Email"
            value={members[2]?.email}
            invalid={errors?.member3Email}
            errorMsg={errors?.member3Email}
            onChange={e => updateMember(2, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 3 Discord"
            value={members[2]?.discord}
            invalid={errors?.member3Discord}
            errorMsg={errors?.member3Discord}
            onChange={e => updateMember(2, 'discord', e.target.value)}
          />
        </TeamMemberRow>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 4 Name"
            value={members[3]?.name}
            invalid={errors?.member4Name}
            errorMsg={errors?.member4Name}
            onChange={e => updateMember(3, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 4 Email"
            value={members[3]?.email}
            invalid={errors?.member4Email}
            errorMsg={errors?.member4Email}
            onChange={e => updateMember(3, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 4 Discord"
            value={members[3]?.discord}
            invalid={errors?.member4Discord}
            errorMsg={errors?.member4Discord}
            onChange={e => updateMember(3, 'discord', e.target.value)}
          />
        </TeamMemberRow>
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
          fieldName="Source code"
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
        {sponsorPrizes.map(prize => {
          return (
            <Checkbox
              key={prize}
              checked={selectedPrizes.includes(prize)}
              label={prize}
              onChange={() => handleCheck(prize)}
            />
          )
        })}
      </FormSection>
      {Object.keys(errors).length > 0 && (
        <ErrorMessage>Please address errors before submitting.</ErrorMessage>
      )}
      <Button no_margin onClick={handleSubmit}>
        Submit
      </Button>
      {project.lastEditedBy && (
        <div>
          Last edited by {project.lastEditedBy.email} at {project.lastEditedBy.date.toString()}
        </div>
      )}
    </div>
  )
}
