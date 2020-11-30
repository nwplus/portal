import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async currUser => {
      setUser(currUser)
    })
  })

  return (
    <AuthContext.Provider value={{ isAuthed: !!user, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const googleSignIn = async (setUser, setLocation) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    const user = firebase.auth().currentUser
    setUser(user)
    setLocation('/application')
  } catch (e) {
    // Not sure what to do here.
  }
}

export const githubSignIn = async (setUser, setLocation) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const provider = new firebase.auth.GithubAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    const user = firebase.auth().currentUser
    setUser(user)
    setLocation('/application')
  } catch (e) {
    console.log(e)
  }
}
