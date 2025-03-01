import React from 'react'
import styled from 'styled-components'
import { Button } from '../Input'
import SocialLinks from '../SocialLinks'
import veebs from '../../assets/profilePictures/veebs.svg'

const ViewSocialContainer = styled.div`
  margin-top: -120px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${p => p.theme.mediaQueries.mobile} {
    align-items: center;
    gap: 1rem;

    margin-top: min(-120px, -15vh);
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
  margin-bottom: 2rem;

  ${p => p.theme.mediaQueries.mobile} {
    display: none;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
  }
`

const NameAndPronounsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;

  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
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

  ${p => p.theme.mediaQueries.mobile} {
    padding-bottom: 0;
  }
`

const DesktopSocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;

  ${p => p.theme.mediaQueries.mobile} {
    display: none;
  }
`

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${p => p.theme.mediaQueries.mobile} {
    width: 90%;
  }
`

const BioText = styled.div`
  font-size: 1rem;
  color: ${p => p.theme.colors.text};
`

const LabelContainer = styled.div`
  display: flex;
  gap: 1rem;

  ${p => p.theme.mediaQueries.mobile} {
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`

const Label = styled.div`
  font-size: 1rem;
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.backgroundSecondary};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-align: center;

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }
`

const MobileSocialIconsContainer = styled.div`
  display: none;

  ${p => p.theme.mediaQueries.mobile} {
    display: flex;
    justify-content: center;
    width: 75%;
  }
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
    <ViewSocialContainer>
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
        <NameAndPronounsContainer>
          {preferredName && <Name>{preferredName}</Name>}
          {pronouns && <Pronouns>({pronouns})</Pronouns>}
        </NameAndPronounsContainer>
        <DesktopSocialIconsContainer>
          <SocialLinks socialLinks={socialLinks} />
        </DesktopSocialIconsContainer>
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
      <MobileSocialIconsContainer>
        <SocialLinks socialLinks={socialLinks} />
      </MobileSocialIconsContainer>
    </ViewSocialContainer>
  )
}

export default ViewSocial
