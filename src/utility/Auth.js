import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserStatus } from './firebase'
import { applicantStatus } from './Constants'
import { Redirect } from 'wouter'
import Spinner from '../components/Loading'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async currUser => {
      if (!currUser) {
        setLoading(false)
        return
      }
      const status = await getUserStatus(currUser)
      currUser.status = status
      setUser(currUser)
      setLoading(false)
    })
  })

  return loading ? (
    <Spinner loading />
  ) : (
    <AuthContext.Provider value={{ isAuthed: !!user, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const handleUser = async (setUser, setLocation) => {
  const user = firebase.auth().currentUser
  const status = await getUserStatus(user)
  user.status = status
  setUser(user)
  setLocation(getRedirectUrl(status))
}

export const getRedirectUrl = status => {
  switch (status) {
    case applicantStatus.attending:
      return '/judging'
    case applicantStatus.applied || applicantStatus.accepted:
    case applicantStatus.inProgress || applicantStatus.new:
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

export const logout = async () => {
  return firebase.auth().signOut()
}
