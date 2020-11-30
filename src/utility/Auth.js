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

