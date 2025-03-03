import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../Input'
import SocialLinks from '../SocialLinks'
import Icon from '../Icon'
import veebs from '../../assets/profilePictures/veebs.svg'
import trash from '../../assets/delete.svg'
import trash_hover from '../../assets/delete_hover.svg'

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

const HeaderText = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-top: 1rem;

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 28px;
    align-self: flex-start;
    padding-left: 5%;
  }
`

const RecentlyViewedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  margin-top: -24px;

  ${p => p.theme.mediaQueries.mobile} {
    max-height: none;
    overflow-y: visible;
    justify-content: center;
    align-items: center;
    margin-top: -18px;
    width: 100%;
  }
`

const Username = styled.a`
  font-size: 18px;
  font-weight: 500;
  color: ${p => p.theme.colors.text};
`

const DateText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${p => p.theme.colors.text};
`

const TrashIcon = styled.div`
  width: 25px;
  height: 25px;
  background-image: url(${trash});
  background-size: contain;
  background-repeat: no-repeat;
`

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${p => p.theme.colors.sidebar.background};
  border-radius: 5px;
  padding: 0px 20px;
  color: ${p => p.theme.colors.text};

  &:hover {
    background-color: ${p => p.theme.colors.button.primary.background.default};
    border: 2px solid ${p => p.theme.colors.button.primary.background.default};
    cursor: pointer;
  }

  &:hover ${Username} {
    color: ${p => p.theme.colors.button.primary.text};
  }

  &:hover ${DateText} {
    color: ${p => p.theme.colors.button.primary.text};
  }

  &:hover ${TrashIcon} {
    background-image: url(${trash_hover});
  }

  ${p => p.theme.mediaQueries.mobile} {
    width: 80%;
  }
`

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${p => p.theme.colors.text};
  margin-top: -24px;
`

const IconSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  ${p => p.theme.mediaQueries.mobile} {
    gap: 8px;
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
  recentlyViewedProfiles,
}) => {
  const currentUserId = userId || user?.uid
  const isCurrentUser = user?.uid === currentUserId
  const [activeTab, setActiveTab] = useState('Profile')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 768

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
        {isCurrentUser && (isMobile ? activeTab === 'Recently Viewed' : true) && (
          <>
            <HeaderText>Recently Viewed Profiles</HeaderText>
            {recentlyViewedProfiles.length > 0 ? (
              <RecentlyViewedContainer>
                {recentlyViewedProfiles.map((profile, index) => (
                  <Profile key={index}>
                    <Username href={`/app/cmd-f/social/${profile.profileId}`}>
                      {profile.name}
                    </Username>
                    <IconSection>
                      <DateText>
                        {new Date(profile.viewedAt.seconds * 1000).toLocaleDateString()}
                      </DateText>
                      <TrashIcon />
                    </IconSection>
                  </Profile>
                ))}
              </RecentlyViewedContainer>
            ) : (
              <Text>No recently viewed profiles.</Text>
            )}
          </>
        )}
      </ContentContainer>
    </ViewSocialContainer>
  )
}

export default ViewSocial
