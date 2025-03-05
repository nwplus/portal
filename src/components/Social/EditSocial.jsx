import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Dropdown, TextArea, TextInput } from '../Input'
import veebs from '../../assets/profilePictures/veebs.svg'
import { ensureHttps } from '../../utility/utilities'
import schoolOptions from '../../containers/Application/data/schools.json'
import majors from '../../containers/Application/data/majors.json'
import roles from '../../containers/Application/data/roles.json'
import years from '../../containers/Application/data/years.json'

const EditSocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: -120px;

  ${p => p.theme.mediaQueries.mobile} {
    align-items: center;
    gap: 1rem;
    margin-top: min(-120px, -15vh);
  }
`

const DesktopContainer = styled.div`
  ${p => p.theme.mediaQueries.mobile} {
    display: none;
  }
`

const MobileContainer = styled.div`
  display: none;

  ${p => p.theme.mediaQueries.mobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

  ${p => p.theme.mediaQueries.mobile} {
    margin-left: 0;
    width: clamp(160px, 50vw, 210px);
    height: clamp(160px, 50vw, 210px);
  }
`

const EditProfileButton = styled(Button)`
  font-size: 1rem;
  box-shadow: none;
  align-content: center;
  margin-bottom: 2rem;
`

const BtnContainer = styled.div`
  display: flex;
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
  font-weight: 600;
  color: ${p => p.theme.colors.text};
  ${p => p.theme.mediaQueries.mobile} {
    font-size: 1.3rem;
  }
`

const SubHeading = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`

const Input = styled.div`
  width: 100%;
  max-width: 24rem;

  ${p => p.theme.mediaQueries.mobile} {
    max-width: 100%;
  }
`

const InputField = styled(TextInput)`
  width: 100%;
  font-size: 1rem;
  max-width: 24rem;
  margin-left: 0;
  margin-right: 0;

  ${p => p.theme.mediaQueries.mobile} {
    max-width: 100%;
    input {
      width: 100%;
      box-sizing: border-box;
    }
  }
`

const Bio = styled(TextArea)`
  font-size: 1rem;
  ${p => p.theme.mediaQueries.tablet} {
    width: 400px;
  }
  ${p => p.theme.mediaQueries.mobile} {
    width: 100%;
  }

  min-height: 8rem;
`

const InputDropdown = styled(Dropdown)`
  .react-select__control {
    height: 2.9rem;
    max-width: 20.3rem;
    min-height: 2.5rem;
  }
`

const TabHeader = styled.div`
  display: flex;
  padding: 0em 3rem;
  align-self: center;
  justify-content: center;
  gap: 0.3rem;
  width: 106%;
  margin-bottom: 1rem;
`

const TabButton = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;

  width: 49%;
  padding: 0.5rem 0;
  border-radius: 0.75rem 0.75rem 0 0;
  background-color: ${p => p.theme.colors.backgroundSecondary};
  opacity: ${p => (p.active ? 1 : 0.5)};
`

const MobileTabsContent = styled.div`
  margin-top: -1.3em;
  align-self: center;
  padding: 3em 3rem;
  width: 100%;
  background-color: ${p => p.theme.colors.backgroundSecondary};
  overflow-y: auto;
`

const MobileButtonContainer = styled.div`
  display: none;

  ${p => p.theme.mediaQueries.mobile} {
    padding: 0em 3rem;
    align-self: center;
    display: flex;
    width: 100%;
    background-color: ${p => p.theme.colors.backgroundSecondary};
  }
`

const MobileEditProfileButton = styled(Button)`
  font-size: 1.1em;
  font-weight: 400;
  box-shadow: none;
  border-radius: 0.3em;
  align-content: center;
  flex: 1;
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
  const isCurrentUser = user?.uid === currentUserId

  const [activeTab, setActiveTab] = useState('personal')

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

  const handleSave = () => {
    if (name.trim() && newPronouns.trim()) {
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
    }
  }

  return (
    <EditSocialContainer>
      <TopRow>
        <ProfilePicture>
          <img src={veebs} alt="Profile" />
        </ProfilePicture>
        <DesktopContainer>
          {isCurrentUser && (
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
                disabled={!name.trim() || !newPronouns.trim()}
                onClick={handleSave}
                color="secondary"
                width="flex"
              >
                Save
              </EditProfileButton>
            </BtnContainer>
          )}
        </DesktopContainer>
      </TopRow>

      <DesktopContainer>
        <InputContainer>
          <Heading>Personal</Heading>
          <InputPair>
            <Input>
              <SubHeading>
                Name <span style={{ color: 'red' }}>*</span>
              </SubHeading>
              <InputField value={name} onChange={e => setName(e.target.value)} />
            </Input>
            <Input>
              <SubHeading>
                Pronouns <span style={{ color: 'red' }}>*</span>
              </SubHeading>
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
              <InputDropdown
                isSearchable={false}
                options={roles}
                isValid
                placeholder="Select a role"
                value={roles.find(opt => opt.label === newRole)}
                onChange={opt => setNewRole(opt.label)}
              />
            </Input>
            <Input>
              <SubHeading>School</SubHeading>
              <InputDropdown
                options={schoolOptions}
                placeholder="Select a school"
                isValid
                value={schoolOptions.find(opt => opt.label === newSchool)}
                onChange={opt => setNewSchool(opt.label)}
              />
            </Input>
          </InputPair>
          <InputPair>
            <Input>
              <SubHeading>Year Level</SubHeading>
              <InputDropdown
                isSearchable={false}
                options={years}
                placeholder="Select a year level"
                isValid
                value={years.find(opt => opt.label === newYear)}
                onChange={opt => setNewYear(opt.label)}
              />
            </Input>
            <Input>
              <SubHeading>Area of Study</SubHeading>
              <InputDropdown
                options={majors}
                placeholder="Select an area of study"
                isValid
                value={majors.find(opt => opt.label === newAreaOfStudy)}
                onChange={opt => setNewAreaOfStudy(opt.label)}
              />
            </Input>
          </InputPair>
        </InputContainer>

        <InputContainer>
          <Heading>Socials</Heading>
          <InputPair>
            <Input>
              <SubHeading>LinkedIn</SubHeading>
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
      </DesktopContainer>

      <MobileContainer>
        <TabHeader>
          <TabButton active={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>
            Personal
          </TabButton>
          <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')}>
            About
          </TabButton>
          <TabButton active={activeTab === 'socials'} onClick={() => setActiveTab('socials')}>
            Socials
          </TabButton>
        </TabHeader>

        <MobileTabsContent>
          {activeTab === 'personal' && (
            <>
              <Input>
                <SubHeading>
                  Name <span style={{ color: 'red' }}>*</span>
                </SubHeading>
                <InputField value={name} onChange={e => setName(e.target.value)} />
              </Input>
              <Input>
                <SubHeading>
                  Pronouns <span style={{ color: 'red' }}>*</span>
                </SubHeading>
                <InputField value={newPronouns} onChange={e => setNewPronouns(e.target.value)} />
              </Input>
              <div>
                <SubHeading>Bio</SubHeading>
                <Bio value={newBio} onChange={setNewBio} />
              </div>
            </>
          )}

          {activeTab === 'about' && (
            <>
              <Input>
                <SubHeading>Role</SubHeading>
                <InputDropdown
                  isSearchable={false}
                  options={roles}
                  isValid
                  placeholder="Select a role"
                  value={roles.find(opt => opt.label === newRole)}
                  onChange={opt => setNewRole(opt.label)}
                />
              </Input>
              <Input>
                <SubHeading>School</SubHeading>
                <InputDropdown
                  options={schoolOptions}
                  placeholder="Select a school"
                  isValid
                  value={schoolOptions.find(opt => opt.label === newSchool)}
                  onChange={opt => setNewSchool(opt.label)}
                />
              </Input>
              <Input>
                <SubHeading>Year Level</SubHeading>
                <InputDropdown
                  isSearchable={false}
                  options={years}
                  placeholder="Select a year level"
                  isValid
                  value={years.find(opt => opt.label === newYear)}
                  onChange={opt => setNewYear(opt.label)}
                />
              </Input>
              <Input>
                <SubHeading>Area of Study</SubHeading>
                <InputDropdown
                  options={majors}
                  placeholder="Select an area of study"
                  isValid
                  value={majors.find(opt => opt.label === newAreaOfStudy)}
                  onChange={opt => setNewAreaOfStudy(opt.label)}
                />
              </Input>
            </>
          )}

          {activeTab === 'socials' && (
            <>
              <InputPair>
                <Input>
                  <SubHeading>LinkedIn</SubHeading>
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
              <Heading>Recently Viewed</Heading>
              <Checkbox
                checked={newHideRecentlyViewed}
                onChange={e => setNewHideRecentlyViewed(e.target.checked)}
                label='I would like to opt out of appearing in "Recently Viewed Profiles" for those who have viewed my profile.'
              />
            </>
          )}
        </MobileTabsContent>
        <MobileButtonContainer>
          <MobileEditProfileButton
            onClick={() => {
              setIsEditing(false)
            }}
            color="primary"
          >
            Discard Changes
          </MobileEditProfileButton>
          <MobileEditProfileButton
            disabled={!name.trim() || !newPronouns.trim()}
            onClick={handleSave}
            color="secondary"
          >
            Save
          </MobileEditProfileButton>
        </MobileButtonContainer>
      </MobileContainer>
    </EditSocialContainer>
  )
}

export default EditSocial
