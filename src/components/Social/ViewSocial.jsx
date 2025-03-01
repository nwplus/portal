import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../Input'
import SocialLinks from '../SocialLinks'
import Icon from '../Icon'
import veebs from '../../assets/profilePictures/veebs.svg'

const ViewSocialContainer = styled.div`
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

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-left: -20px;

  width: 210px;
  height: 210px;
  border-radius: 50%;
  overflow: hidden;

  background-color: ${p => p.theme.colors.background};

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

const MobileEditProfileButton = styled.div`
  display: none;

  ${p => p.theme.mediaQueries.mobile} {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 10%;
    top: 15px;
  }
`

const MobileNavbar = styled.div`
  display: none;

  ${p => p.theme.mediaQueries.mobile} {
    ${p =>
      p.currentUser &&
      `
      display: flex;
      justify-content: space-between;
      width: 100vw;
      overflow: hidden;
    `}
  }
`

const NavbarItem = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;

  width: 49%;
  padding: 0.5rem 0;
  border-radius: 0.75rem 0.75rem 0 0;
  background-color: ${p => p.theme.colors.backgroundSecondary};
  opacity: ${p => (p.active ? 1 : 0.5)};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${p => p.theme.mediaQueries.mobile} {
    align-items: center;
    padding-bottom: 5vh;
    margin-top: -1rem;
    min-height: 50vh;

    ${p =>
      p.isCurrentUser &&
      `
      width: 100vw;
      background-color: ${p.theme.colors.backgroundSecondary};
      padding-top: 2vh;
    `}
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
  position: relative;
  display: flex;
  gap: 10px;
  align-items: flex-end;

  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100vw;
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
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.backgroundSecondary};

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;

    ${p =>
      p.isCurrentUser &&
      `
      background-color: ${p.theme.colors.scrollbar};
      color: ${p.theme.colors.text};
    `}
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
  const isCurrentUser = user?.uid === currentUserId
  const [activeTab, setActiveTab] = useState('Profile')

  return (
    <ViewSocialContainer>
      <TopRow>
        <ProfilePicture>
          <img src={veebs} alt="Profile Picture" />
        </ProfilePicture>
        {isCurrentUser && (
          <>
            <EditProfileButton
              onClick={() => {
                setIsEditing(true)
              }}
              color="secondary"
              width="flex"
            >
              Edit Profile
            </EditProfileButton>
          </>
        )}
      </TopRow>
      <MobileNavbar currentUser={isCurrentUser}>
        <NavbarItem active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')}>
          Profile
        </NavbarItem>
        <NavbarItem
          active={activeTab === 'Recently Viewed'}
          onClick={() => setActiveTab('Recently Viewed')}
        >
          Recently Viewed
        </NavbarItem>
      </MobileNavbar>
      <ContentContainer isCurrentUser={isCurrentUser}>
        {activeTab === 'Profile' && (
          <>
            <Header>
              <NameAndPronounsContainer>
                {preferredName && <Name>{preferredName}</Name>}
                {pronouns && <Pronouns>({pronouns})</Pronouns>}

                {isCurrentUser && (
                  <MobileEditProfileButton onClick={() => setIsEditing(true)}>
                    <Icon icon="pen" color={p => p.theme.colors.text} size="2x" />
                  </MobileEditProfileButton>
                )}
              </NameAndPronounsContainer>
              <DesktopSocialIconsContainer>
                <SocialLinks socialLinks={socialLinks} />
              </DesktopSocialIconsContainer>
            </Header>
            <Bio>
              <BioText>{bio}</BioText>
              <LabelContainer>
                {role && <Label isCurrentUser={isCurrentUser}>{role}</Label>}
                {school && <Label isCurrentUser={isCurrentUser}>{school}</Label>}
                {year && <Label isCurrentUser={isCurrentUser}>{year}</Label>}
                {areaOfStudy && <Label isCurrentUser={isCurrentUser}>{areaOfStudy}</Label>}
              </LabelContainer>
            </Bio>
            <MobileSocialIconsContainer>
              <SocialLinks socialLinks={socialLinks} />
            </MobileSocialIconsContainer>
          </>
        )}
        {activeTab === 'Recently Viewed' && (
          <p>Recently Viewed Profiles</p> // placeholder
        )}
      </ContentContainer>
    </ViewSocialContainer>
  )
}

export default ViewSocial
