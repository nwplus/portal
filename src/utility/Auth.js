import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserStatus, analytics, livesiteDocRef } from './firebase'
import { REDIRECT_STATUS, ANALYTICS_EVENTS } from './Constants'
import Spinner from '../components/Loading'
import { useLocation } from 'wouter'

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

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async currUser => {
      if (!currUser) {
        setLoading(false)
        analytics.setUserId(null)
        return
      }
      const { redirect, status } = await getUserStatus(currUser)
      currUser.status = status
      currUser.redirect = redirect
      const admin = await checkAdminClaim(currUser)
      currUser.admin = admin
      setUser(currUser)
      setLoading(false)
      analytics.setUserId(currUser.uid)
    })
  })

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

const handleUser = async (setUser, setLocation) => {
  const user = firebase.auth().currentUser
  const { redirect, status } = await getUserStatus(user)
  user.status = status
  user.redirect = redirect
  const admin = await checkAdminClaim(user)
  user.admin = admin
  setUser(user)
  analytics.setUserId(user.uid)
  analytics.logEvent(ANALYTICS_EVENTS.Login, { userId: user.uid })
  // await handleRedirect(redirect, setLocation)
}

export const getRedirectUrl = redirect => {
  switch (redirect) {
    case REDIRECT_STATUS.AttendingEvent:
      return '/'
    case REDIRECT_STATUS.ApplicationAccepted:
      return '/'
    case REDIRECT_STATUS.ApplicationNotSubmitted:
      return '/application/part-0'
    case REDIRECT_STATUS.ApplicationSubmitted:
    default:
      return '/application'
  }
}

export const handleRedirect = async (redirect, setLocationCallback) => {
  const submissionOpen = (await livesiteDocRef.get()).data().submissionsOpen
  setLocationCallback(submissionOpen ? '/submission' : getRedirectUrl(redirect))
}

export const googleSignIn = async (setUser, setLocation) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    await handleUser(setUser, setLocation)
    return null
  } catch (e) {
    console.error(e)
    return e
  }
}

export const githubSignIn = async (setUser, setLocation) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GithubAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    await handleUser(setUser, setLocation)
    return null
  } catch (e) {
    return e
  }
}
