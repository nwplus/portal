import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserStatus, analytics, livesiteDocRef } from './firebase'
import { REDIRECT_STATUS, ANALYTICS_EVENTS } from './Constants'
import Spinner from '../components/Loading'
import { useLocation } from 'wouter'
import { useHackathon } from './HackathonProvider'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const checkAdminClaim = async user => {
  const token = await user.getIdTokenResult()
  return Object.prototype.hasOwnProperty.call(token.claims, 'admin')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [, setLocation] = useLocation()
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async currUser => {
      if (!currUser) {
        setLoading(false)
        analytics.setUserId(null)
        return
      }
      const { redirect, status } = await getUserStatus(currUser, dbHackathonName)
      currUser.status = status
      currUser.redirect = redirect
      const admin = await checkAdminClaim(currUser)
      currUser.admin = admin
      setUser(currUser)
      setLoading(false)
      analytics.setUserId(currUser.uid)
    })
  }, [dbHackathonName])

  const logout = async () => {
    analytics.logEvent(ANALYTICS_EVENTS.Logout, { userId: user.uid })
    await firebase.auth().signOut()
    setUser(null)
    setLocation('/')
  }

  return loading ? (
    <Spinner loading />
  ) : (
    <AuthContext.Provider value={{ isAuthed: !!user, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const handleUser = async (setUser, setLocation, activeHackathon, dbHackathonName) => {
  const user = firebase.auth().currentUser
  const { redirect, status } = await getUserStatus(user, dbHackathonName)
  // alert(redirect, status)
  user.status = status
  user.redirect = redirect
  const admin = await checkAdminClaim(user)
  user.admin = admin
  setUser(user)
  analytics.setUserId(user.uid)
  analytics.logEvent(ANALYTICS_EVENTS.Login, { userId: user.uid })
  await handleRedirect(redirect, setLocation, activeHackathon)
}

export const getRedirectUrl = (redirect, activeHackathon) => {
  switch (redirect) {
    case REDIRECT_STATUS.AttendingEvent:
      return `/app/${activeHackathon}`
    case REDIRECT_STATUS.ApplicationAccepted:
      return `/app/${activeHackathon}`
    case REDIRECT_STATUS.ApplicationNotSubmitted:
      return `/app/${activeHackathon}/application/part-0`
    case REDIRECT_STATUS.ApplicationSubmitted:
      return `/app/${activeHackathon}/application`
    default:
      return `/app/${activeHackathon}/application`
  }
}

export const handleRedirect = async (redirect, setLocationCallback, activeHackathon) => {
  // alert(redirect, getRedirectUrl(redirect))
  const submissionOpen = (await livesiteDocRef.get()).data().submissionsOpen[activeHackathon]
  setLocationCallback(
    submissionOpen
      ? `/app/${activeHackathon}/submission`
      : getRedirectUrl(redirect, activeHackathon)
  )
}

export const googleSignIn = async (setUser, setLocation, activeHackathon, dbHackathonName) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    await handleUser(setUser, setLocation, activeHackathon, dbHackathonName)
    return null
  } catch (e) {
    console.error(e)
    return e
  }
}

export const githubSignIn = async (setUser, setLocation, activeHackathon, dbHackathonName) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GithubAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    await handleUser(setUser, setLocation, activeHackathon, dbHackathonName)
    return null
  } catch (e) {
    return e
  }
}
