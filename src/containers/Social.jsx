import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Redirect, useLocation } from 'wouter'
import Loading from '../components/Loading'
import { useAuth } from '../utility/Auth'
import { applicantsRef, socialsRef } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'
import cmdfSocialsBanner from '../assets/cmdf_socials_banner.svg'
import veebs from '../assets/profilePictures/veebs.svg'
import { Button } from '../components/Input'
import SocialIcons from '../components/SocialIcons'

const SocialContainer = styled.div`
  padding: 0 60px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Banner = styled.div`
  color: #fff;
  margin: -25px -115px 25px;
  background-image: url(${props => {
    switch (props.activeHackathon) {
      case 'hackcamp':
        return cmdfSocialsBanner
      case 'nwhacks':
        return cmdfSocialsBanner
      case 'cmd-f':
        return cmdfSocialsBanner
      default:
        return cmdfSocialsBanner
    }
  }});
  background-size: cover;
  background-position: center;
  height: 27vh;
  @media (max-width: 768px) {
    margin: -8px -20px 8px;
  }
`

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

const parsePronouns = pronouns => {
  if (!pronouns) return ''

  const trueCount = Object.entries(pronouns).filter(
    ([key, value]) => value === true && key !== 'other' && key !== 'unsure/PreferNotToAnswer'
  ).length

  if (trueCount > 1) return ''

  const pronounMap = {
    'any/AllPronouns': 'any/all pronouns',
    'he/Him': 'he/him',
    'he/They': 'he/they',
    'she/Her': 'she/her',
    'she/They': 'she/they',
    'they/Them': 'they/them',
  }

  for (const [key, value] of Object.entries(pronounMap)) {
    if (pronouns[key] === true) {
      return value
    }
  }

  return ''
}

const Social = ({ userId }) => {
  const [preferredName, setPreferredName] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    github: '',
    devpost: '',
    instagram: '',
    website: '',
  })
  const [bio, setBio] = useState('')
  const [role, setRole] = useState('')
  const [school, setSchool] = useState('')
  const [year, setYear] = useState('')
  const [areaOfStudy, setAreaOfStudy] = useState('')
  const [hideRecentlyViewed, setHideRecentlyViewed] = useState(false)

  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { dbHackathonName, activeHackathon } = useHackathon()
  const [, setLocation] = useLocation()

  const currentUserId = userId || user?.uid

  if (!userId && !user?.uid) {
    return <Redirect to="/login" />
  }

  useEffect(() => {
    if (!userId && user?.uid) {
      setLocation(`/social/${user.uid}`, { replace: true })
    }
  }, [userId, user?.uid])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const socialsDoc = await socialsRef.doc(currentUserId).get()
        const socialsData = socialsDoc.exists ? socialsDoc.data() : {}

        let finalData = {
          preferredName: socialsData?.preferredName || '',
          pronouns: socialsData?.pronouns || '',
          socialLinks: socialsData?.socialLinks || {
            linkedin: '',
            github: '',
            devpost: '',
            instagram: '',
            website: '',
          },
          bio: socialsData?.bio || '',
          role: socialsData?.role || '',
          school: socialsData?.school || '',
          year: socialsData?.year || '',
          areaOfStudy: socialsData?.areaOfStudy || '',
          hideRecentlyViewed: socialsData?.hideRecentlyViewed || false,
        }

        if (user?.uid === currentUserId && !(socialsData?.preferredName && socialsData?.pronouns)) {
          console.log('fetching user data')
          const userDoc = await applicantsRef(dbHackathonName).doc(currentUserId).get()

          if (userDoc.exists) {
            const applicantData = userDoc.data()
            const applicantPreferredName =
              socialsData.preferredName ||
              user.displayName ||
              applicantData.basicInfo?.preferredName ||
              applicantData.basicInfo?.legalFirstName ||
              ''

            console.log(applicantData.basicInfo)
            const applicantPronouns =
              socialsData.pronouns ||
              applicantData.basicInfo.otherPronouns ||
              parsePronouns(applicantData.basicInfo?.pronouns) ||
              ''

            finalData.preferredName = applicantPreferredName
            finalData.pronouns = applicantPronouns
          }
        }

        if (user?.uid === currentUserId) {
          await socialsRef.doc(currentUserId).set(finalData, { merge: true })
        }

        setPreferredName(finalData.preferredName)
        setPronouns(finalData.pronouns)
        setSocialLinks(finalData.socialLinks)
        setBio(finalData.bio)
        setRole(finalData.role)
        setSchool(finalData.school)
        setYear(finalData.year)
        setAreaOfStudy(finalData.areaOfStudy)
        setHideRecentlyViewed(finalData.hideRecentlyViewed)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [currentUserId, user?.uid, dbHackathonName])

  if (loading) {
    return <Loading />
  }

  return (
    <SocialContainer>
      <Banner activeHackathon={activeHackathon} />

      <TopRow>
        <ProfilePicture>
          <img src={veebs} alt="Profile Picture" />
        </ProfilePicture>
        {user?.uid === currentUserId && (
          <EditProfileButton color="secondary" width="flex">
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
    </SocialContainer>
  )
}

export default Social
