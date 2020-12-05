import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserStatus } from './firebase'
import { DB_HACKATHON, RedirectStatus } from './Constants'
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
        return
      }
      const { redirect, status } = await getUserStatus(currUser)
      currUser.status = status
      currUser.redirect = redirect
      const admin = await checkAdminClaim(currUser)
      currUser.admin = admin
      setUser(currUser)
      setLoading(false)
    })
  })

  const logout = async () => {
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
  setLocation(getRedirectUrl(redirect))
}

export const getRedirectUrl = redirect => {
  if (process.env.NODE_ENV === 'production') {
    if (DB_HACKATHON === 'LHD2021') return '/judging'
  }
  switch (redirect) {
    case RedirectStatus.AttendingEvent:
      return '/judging'
    case RedirectStatus.ApplicationNotSubmitted:
      return '/application/part-1'
    case RedirectStatus.ApplicationSubmitted:
    default:
      return '/application'
  }
}

export const googleSignIn = async (setUser, setLocation) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    await handleUser(setUser, setLocation)
    return null
  } catch (e) {
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
