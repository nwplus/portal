import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, TextArea, TextInput } from '../Input'
import { ErrorSpan, H1, Label } from '../Typography'
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

const TextInputWithField = ({ fieldName, value, placeholder, required, onChange }) => {
  return (
    <div>
      {fieldName}
      {required && <ErrorSpan />}
      <StyledTextInput value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}

// Need to be explicit with object declaration (otherwise they'll all reference the same object)
const defaultMembers = [{}, {}, {}, {}]

export default ({ msg, project, onSubmit }) => {
  const [title, setTitle] = useState(project.title || '')
  const [description, setDescription] = useState(project.description || '')
  const [members, setMembers] = useState(project.teamMembers || defaultMembers)
  const [links, setLinks] = useState(project.links || {})
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [selectedPrizes, setSelectedPrizes] = useState(project.sponsorPrizes || [])

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
    // Remove incomplete member objects
    const membersArray = [...members]
    console.log(membersArray)
    const filteredMembers = membersArray.filter(member => {
      return member?.name && member?.email && member?.discord
    })
    onSubmit({
      title,
      description,
      teamMembers: filteredMembers,
      links,
      sponsorPrizes: selectedPrizes,
    })
  }

  return (
    <div>
      <H1>Project Submission</H1>
      <FormSection>
        <div>
          <Label>Project title</Label>
          <ErrorSpan />
        </div>
        <StyledTextInput value={title} onChange={e => setTitle(e.target.value)} />
      </FormSection>
      <FormSection>
        <div>
          <Label>Project description</Label>
          <ErrorSpan />
        </div>
        <TextArea value={description} maxLength={240} onChange={setDescription} />
      </FormSection>
      <FormSection>
        <Label>Team members</Label>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 1 Name"
            value={members[0]?.name}
            placeholder="FirstName LastName"
            required
            onChange={e => updateMember(0, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 1 Email"
            value={members[0]?.email}
            placeholder="name@nwplus.io"
            required
            onChange={e => updateMember(0, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 1 Discord"
            value={members[0]?.discord}
            placeholder="username#1234"
            required
            onChange={e => updateMember(0, 'discord', e.target.value)}
          />
        </TeamMemberRow>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 2 Name"
            value={members[1]?.name}
            onChange={e => updateMember(1, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 2 Email"
            value={members[1]?.email}
            onChange={e => updateMember(1, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 2 Discord"
            value={members[1]?.discord}
            onChange={e => updateMember(1, 'discord', e.target.value)}
          />
        </TeamMemberRow>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 3 Name"
            value={members[2]?.name}
            onChange={e => updateMember(2, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 3 Email"
            value={members[2]?.email}
            onChange={e => updateMember(2, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 3 Discord"
            value={members[2]?.discord}
            onChange={e => updateMember(2, 'discord', e.target.value)}
          />
        </TeamMemberRow>
        <TeamMemberRow>
          <TextInputWithField
            fieldName="Member 4 Name"
            value={members[3]?.name}
            onChange={e => updateMember(3, 'name', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 4 Email"
            value={members[3]?.email}
            onChange={e => updateMember(3, 'email', e.target.value)}
          />
          <TextInputWithField
            fieldName="Member 4 Discord"
            value={members[3]?.discord}
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
          onChange={e => setLinks({ ...links, youtube: e.target.value })}
        />
        <TextInputWithField
          fieldName="Source code"
          value={links?.sourceCode}
          required
          onChange={e => setLinks({ ...links, sourceCode: e.target.value })}
        />
        <TextInputWithField
          fieldName="Other"
          value={links?.other}
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
