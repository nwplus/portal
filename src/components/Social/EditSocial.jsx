import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, TextArea, TextInput } from '../Input'
import veebs from '../../assets/profilePictures/veebs.svg'
import { ensureHttps } from '../../utility/utilities'

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: -120px;
`

const ProfilePicture = styled.div`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  background-color: ${p => p.theme.colors.background};
  overflow: hidden;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: -20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const EditProfileButton = styled(Button)`
  font-size: 1rem;
  box-shadow: none;
  margin-bottom: 2rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  margin: 0.3rem;
`

const InputPair = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
`

const Heading = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`

const SubHeading = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`

const Input = styled.div`
  max-width: 24rem;
  width: 100%;
`

const InputField = styled(TextInput)`
  width: 100%;
  font-size: 1rem;
  max-width: 24rem;
  margin-left: 0 !important;
`

const Bio = styled(TextArea)`
  font-size: 1rem;
  width: 100%;
  min-height: 8rem;
`

const BtnContainer = styled.div`
  display: flex;
`

const EditSocial = ({
  setIsEditing,
  user,
  userId,
  preferredName,
  pronouns,
  bio,
  role,
  school,
  year,
  areaOfStudy,
  socialLinks,
  hideRecentlyViewed,
  onSave,
}) => {
  const currentUserId = userId || user?.uid

  const [name, setName] = useState(preferredName)
  const [newPronouns, setNewPronouns] = useState(pronouns)
  const [newBio, setNewBio] = useState(bio)

  const [newRole, setNewRole] = useState(role)
  const [newSchool, setNewSchool] = useState(school)
  const [newYear, setNewYear] = useState(year)
  const [newAreaOfStudy, setNewAreaOfStudy] = useState(areaOfStudy)

  const [linkedin, setLinkedin] = useState(socialLinks?.linkedin ?? '')
  const [github, setGithub] = useState(socialLinks?.github ?? '')
  const [instagram, setInstagram] = useState(socialLinks?.instagram ?? '')
  const [website, setWebsite] = useState(socialLinks?.website ?? '')
  const [devpost, setDevpost] = useState(socialLinks?.devpost ?? '')

  const [newHideRecentlyViewed, setNewHideRecentlyViewed] = useState(hideRecentlyViewed)

  return (
    <>
      <TopRow>
        <ProfilePicture>
          <img src={veebs} alt="Profile Picture" />
        </ProfilePicture>
        {user?.uid === currentUserId && (
          <BtnContainer>
            <EditProfileButton
              onClick={() => {
                setIsEditing(false)
              }}
              color="primary"
              width="flex"
            >
              Discard Changes
            </EditProfileButton>
            <EditProfileButton
              onClick={() => {
                setIsEditing(false)
                const updatedData = {
                  preferredName: name,
                  pronouns: newPronouns,
                  bio: newBio,
                  role: newRole,
                  school: newSchool,
                  year: newYear,
                  areaOfStudy: newAreaOfStudy,
                  socialLinks: {
                    linkedin: ensureHttps(linkedin),
                    github: ensureHttps(github),
                    instagram: ensureHttps(instagram),
                    website: ensureHttps(website),
                    devpost: ensureHttps(devpost),
                  },
                  hideRecentlyViewed: newHideRecentlyViewed,
                }
                onSave(updatedData)
              }}
              color="secondary"
              width="flex"
            >
              Save
            </EditProfileButton>
          </BtnContainer>
        )}
      </TopRow>
      <InputContainer>
        <Heading>Personal</Heading>
        <InputPair>
          <Input>
            <SubHeading>Name</SubHeading>
            <InputField value={name} onChange={e => setName(e.target.value)} />
          </Input>
          <Input>
            <SubHeading>Pronouns</SubHeading>
            <InputField value={newPronouns} onChange={e => setNewPronouns(e.target.value)} />
          </Input>
        </InputPair>
        <div>
          <SubHeading>Bio</SubHeading>
          <Bio value={newBio} onChange={setNewBio} />
        </div>
      </InputContainer>
      <InputContainer>
        <Heading>About</Heading>
        <InputPair>
          <Input>
            <SubHeading>Role</SubHeading>
            <InputField value={newRole} onChange={e => setNewRole(e.target.value)} />
          </Input>
          <Input>
            <SubHeading>School</SubHeading>
            <InputField value={newSchool} onChange={e => setNewSchool(e.target.value)} />
          </Input>
        </InputPair>
        <InputPair>
          <Input>
            <SubHeading>Year Level</SubHeading>
            <InputField value={newYear} onChange={e => setNewYear(e.target.value)} />
          </Input>
          <Input>
            <SubHeading>Area of Study</SubHeading>
            <InputField value={newAreaOfStudy} onChange={e => setNewAreaOfStudy(e.target.value)} />
          </Input>
        </InputPair>
      </InputContainer>
      <InputContainer>
        <Heading>Socials</Heading>
        <InputPair>
          <Input>
            <SubHeading>Linkedin</SubHeading>
            <InputField value={linkedin} onChange={e => setLinkedin(e.target.value)} />
          </Input>
          <Input>
            <SubHeading>GitHub</SubHeading>
            <InputField value={github} onChange={e => setGithub(e.target.value)} />
          </Input>
        </InputPair>
        <InputPair>
          <Input>
            <SubHeading>Instagram</SubHeading>
            <InputField value={instagram} onChange={e => setInstagram(e.target.value)} />
          </Input>
          <Input>
            <SubHeading>Portfolio</SubHeading>
            <InputField value={website} onChange={e => setWebsite(e.target.value)} />
          </Input>
        </InputPair>
        <Input>
          <SubHeading>Devpost</SubHeading>
          <InputField value={devpost} onChange={e => setDevpost(e.target.value)} />
        </Input>
      </InputContainer>
      <InputContainer>
        <Heading>Recently Viewed</Heading>
        <Checkbox
          checked={newHideRecentlyViewed}
          onChange={e => setNewHideRecentlyViewed(e.target.checked)}
          label='I would like to opt out of appearing in "Recently Viewed Profiles" for those who have viewed my profile.'
        />
      </InputContainer>
    </>
  )
}

export default EditSocial
