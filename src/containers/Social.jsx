import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Redirect, useLocation } from 'wouter'
import Loading from '../components/Loading'
import { useAuth } from '../utility/Auth'
import { applicantsRef, publicInfoRef } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'

const SocialContainer = styled.div``

const Social = ({ userId }) => {
  const [preferredName, setPreferredName] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { dbHackathonName } = useHackathon()
  const [, setLocation] = useLocation()

  const currentUserId = userId || user?.uid

  if (!currentUserId) {
    return <Redirect to="~/login" />
  }

  useEffect(() => {
    if (!userId && user?.uid) {
      setLocation(`/social/${user.uid}`, { replace: true })
    }
  }, [userId, user?.uid])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const publicInfoDoc = await publicInfoRef.doc(currentUserId).get()

        if (publicInfoDoc.exists && publicInfoDoc.data().preferredName) {
          setPreferredName(publicInfoDoc.data().preferredName)
          setLoading(false)
          return
        }

        // if user is logged in and PublicInfo doesn't exist/have preferredName
        if (user?.uid === currentUserId) {
          const userDoc = await applicantsRef(dbHackathonName).doc(currentUserId).get()
          if (userDoc.exists) {
            const data = userDoc.data()
            const name =
              user.displayName ||
              data.basicInfo?.displayName ||
              data.basicInfo?.preferredName ||
              data.basicInfo?.legalFirstName ||
              'Your name'
            setPreferredName(name)

            await publicInfoRef.doc(currentUserId).set(
              {
                preferredName: name,
              },
              { merge: true }
            )
          }
        }

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
      <p>{preferredName}</p>
    </SocialContainer>
  )
}

export default Social
