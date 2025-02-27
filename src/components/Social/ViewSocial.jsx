import React from 'react'
import styled from 'styled-components'
import { Button } from '../Input'
import SocialIcons from '../SocialIcons'
import veebs from '../../assets/profilePictures/veebs.svg'

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`

const Name = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`

const Pronouns = styled.div`
  font-size: 1rem;
  color: ${p => p.theme.colors.text};
  font-weight: 600;
  padding-bottom: 0.6rem;
`

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
`

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BioText = styled.div`
  font-size: 1rem;
  color: ${p => p.theme.colors.text};
`

const LabelContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const Label = styled.div`
  font-size: 1rem;
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.backgroundSecondary};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-align: center;
`

const ViewSocial = ({
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
}) => {
  const currentUserId = userId || user?.uid
  return (
    <>
      <TopRow>
        <ProfilePicture>
          <img src={veebs} alt="Profile Picture" />
        </ProfilePicture>
        {user?.uid === currentUserId && (
          <EditProfileButton
            onClick={() => {
              setIsEditing(true)
            }}
            color="secondary"
            width="flex"
          >
            Edit Profile
          </EditProfileButton>
        )}
      </TopRow>
      <Header>
        <HeaderLeft>
          {preferredName && <Name>{preferredName}</Name>}
          {pronouns && <Pronouns>({pronouns})</Pronouns>}
        </HeaderLeft>
        <HeaderRight>
          <SocialIcons socialLinks={socialLinks} />
        </HeaderRight>
      </Header>
      <Bio>
        <BioText>{bio}</BioText>
        <LabelContainer>
          {role && <Label>{role}</Label>}
          {school && <Label>{school}</Label>}
          {year && <Label>{year}</Label>}
          {areaOfStudy && <Label>{areaOfStudy}</Label>}
        </LabelContainer>
      </Bio>
    </>
  )
}

export default ViewSocial
