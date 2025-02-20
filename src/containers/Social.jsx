import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Redirect, useLocation } from 'wouter'
import Loading from '../components/Loading'
import { useAuth } from '../utility/Auth'
import { applicantsRef } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'

const SocialContainer = styled.div``

const Social = ({ userId }) => {
  const { user } = useAuth()
  const { dbHackathonName } = useHackathon()
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(true)
  const [, setLocation] = useLocation()
  const currentUserId = userId || user?.uid

  // if no user id in params and user is not logged in
  if (!currentUserId) {
    return <Redirect to="~/login" />
  }

  // update URL if using logged-in user's ID
  useEffect(() => {
    if (!userId && user?.uid) {
      setLocation(`/social/${user.uid}`, { replace: true })
    }
  }, [userId, user?.uid])

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await applicantsRef(dbHackathonName).doc(currentUserId).get()
      if (userDoc.exists) {
        const data = userDoc.data()
        setFirstName(data.basicInfo?.legalFirstName)
      }
      setLoading(false)
    }

    fetchUserData()
  }, [currentUserId])

  if (loading) {
    return <Loading />
  }

  return (
    <SocialContainer>
      {/* placeholder */}
      <p>{firstName}</p>
    </SocialContainer>
  )
}

export default Social
