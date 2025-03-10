import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Redirect, useLocation } from 'wouter'
import Loading from '../components/Loading'
import { useAuth } from '../utility/Auth'
import { applicantsRef, socialsRef } from '../utility/firebase'
import firebase from 'firebase/app'
import { useHackathon } from '../utility/HackathonProvider'
import cmdfSocialsBanner from '../assets/cmdf_socials_banner.svg'
import EditSocial from '../components/Social/EditSocial'
import ViewSocial from '../components/Social/ViewSocial'

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 60px;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 0;
    margin-bottom: -8px;
  }
`

const Banner = styled.div`
  margin: -25px -115px 25px;
  height: 27vh;

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

  ${p => p.theme.mediaQueries.mobile} {
    margin: -110px -100px 0px;
    height: 32vh;
  }
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
  const [profilePicture, setProfilePicture] = useState('')
  const [hideRecentlyViewed, setHideRecentlyViewed] = useState(false)
  const [visitedProfileData, setVisitedProfileData] = useState(null)
  const [recentlyViewedProfiles, setRecentlyViewedProfiles] = useState([])

  const [isEditing, setIsEditing] = useState(false)

  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { dbHackathonName, activeHackathon } = useHackathon()
  const [, setLocation] = useLocation()

  const currentUserId = userId || user?.uid

  if (!userId && !user?.uid) {
    return <Redirect to="~/login" />
  }

  useEffect(() => {
    if (!userId && user?.uid) {
      setLocation(`/social/${user.uid}`, { replace: true })
    }
  }, [userId, user?.uid])

  useEffect(() => {
    if (user && user.uid && userId && user.uid !== userId) {
      const fetchVisitedProfileData = async () => {
        try {
          const visitedDoc = await socialsRef.doc(userId).get()
          if (visitedDoc.exists) {
            setVisitedProfileData(visitedDoc.data())
          }
        } catch (error) {
          console.error('Error fetching visited profile data:', error)
        }
      }
      fetchVisitedProfileData()
    }
  }, [user, userId])

  useEffect(() => {
    if (user && user.uid && userId && user.uid !== userId) {
      if (visitedProfileData === null) return

      const updateRecentlyViewedProfile = async () => {
        try {
          const docRef = socialsRef.doc(user.uid)
          const docSnapshot = await docRef.get()
          const socialsData = docSnapshot.data() || {}
          let currentRecentlyViewed = socialsData.recentlyViewedProfiles || []

          currentRecentlyViewed = currentRecentlyViewed.filter(item => item.profileId !== userId)

          if (visitedProfileData.hideRecentlyViewed) {
            // skip users who have checked hideRecentlyViewed
            await docRef.update({ recentlyViewedProfiles: currentRecentlyViewed })
            return
          }

          const profileName = visitedProfileData && visitedProfileData.preferredName

          const newItem = {
            profileId: userId,
            name: profileName,
            viewedAt: firebase.firestore.Timestamp.now(),
          }

          currentRecentlyViewed.unshift(newItem)

          await docRef.update({ recentlyViewedProfiles: currentRecentlyViewed })
        } catch (error) {
          console.error('Error updating recently viewed profiles: ', error)
        }
      }

      updateRecentlyViewedProfile()
    }
  }, [user, userId, visitedProfileData])

  const saveUserData = async updatedData => {
    try {
      await socialsRef.doc(currentUserId).set(updatedData, { merge: true })
      console.log('saved!')
    } catch (error) {
      console.error('error saving user data: ', error)
    }
  }

  const handleDeleteViewedProfile = async profileId => {
    try {
      if (!user || !user.uid) return

      const docRef = socialsRef.doc(user.uid)
      const docSnapshot = await docRef.get()

      if (!docSnapshot.exists) return

      const socialsData = docSnapshot.data() || {}
      let currentRecentlyViewed = socialsData.recentlyViewedProfiles || []

      // Filter out the profile to delete
      currentRecentlyViewed = currentRecentlyViewed.filter(item => item.profileId !== profileId)

      // Update Firestore
      await docRef.update({ recentlyViewedProfiles: currentRecentlyViewed })

      // Update local state
      setRecentlyViewedProfiles(currentRecentlyViewed)

      console.log(`Deleted viewed profile: ${profileId}`)
    } catch (error) {
      console.error('Error deleting viewed profile: ', error)
    }
  }

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
          profilePicture: socialsData?.profilePicture || '',
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
          await saveUserData(finalData)
        }

        setRecentlyViewedProfiles(socialsData.recentlyViewedProfiles || [])

        setPreferredName(finalData.preferredName)
        setPronouns(finalData.pronouns)
        setSocialLinks(finalData.socialLinks)
        setBio(finalData.bio)
        setRole(finalData.role)
        setSchool(finalData.school)
        setYear(finalData.year)
        setAreaOfStudy(finalData.areaOfStudy)
        setHideRecentlyViewed(finalData.hideRecentlyViewed)
        setProfilePicture(finalData.profilePicture)
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
    <>
      <Banner activeHackathon={activeHackathon} />
      <SocialContainer>
        {isEditing ? (
          <EditSocial
            setIsEditing={setIsEditing}
            user={user}
            userId={userId}
            preferredName={preferredName}
            pronouns={pronouns}
            bio={bio}
            role={role}
            school={school}
            year={year}
            areaOfStudy={areaOfStudy}
            socialLinks={socialLinks}
            profilePicture={profilePicture}
            hideRecentlyViewed={hideRecentlyViewed}
            onSave={async updatedData => {
              await saveUserData(updatedData)
              // after saving, update the parent's state
              setPreferredName(updatedData.preferredName)
              setPronouns(updatedData.pronouns)
              setSocialLinks(updatedData.socialLinks)
              setBio(updatedData.bio)
              setRole(updatedData.role)
              setSchool(updatedData.school)
              setYear(updatedData.year)
              setHideRecentlyViewed(updatedData.hideRecentlyViewed)
              setProfilePicture(updatedData.profilePicture)
              setAreaOfStudy(updatedData.areaOfStudy)
            }}
          />
        ) : (
          <ViewSocial
            setIsEditing={setIsEditing}
            user={user}
            userId={userId}
            preferredName={preferredName}
            pronouns={pronouns}
            bio={bio}
            role={role}
            school={school}
            year={year}
            areaOfStudy={areaOfStudy}
            profilePicture={profilePicture}
            socialLinks={socialLinks}
            recentlyViewedProfiles={recentlyViewedProfiles}
            handleDeleteViewedProfile={handleDeleteViewedProfile}
          />
        )}
      </SocialContainer>
    </>
  )
}

export default Social
