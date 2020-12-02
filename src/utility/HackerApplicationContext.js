import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './Auth'
import { getUserApplication, updateUserApplication } from './firebase'
import firebase from 'firebase/app'

const HackerApplicationContext = createContext()

export function useHackerApplication() {
  return useContext(HackerApplicationContext)
}

export function HackerApplicationProvider({ children }) {
  const { user } = useAuth()
  const [application, setApplication] = useState({})
  const [updated, setUpdated] = useState(false)

  /**Initialize retrieval of hacker application */
  useEffect(() => {
    const retrieveApplication = async () => {
      const app = await getUserApplication(user.uuid)
      setApplication(app)
      setUpdated(false)
    }
    retrieveApplication()
  }, [user.uuid])

  /**Saves the users application, can be called manually or through interval */
  const forceSave = useCallback(async () => {
    const updatedApp = {
      ...application,
      submission: {
        lastUpdated: firebase.firestore.Timestamp.now(),
        submitted: false,
      },
    }
    await updateUserApplication(user.uuid, updatedApp)
    setApplication(updatedApp)
    setUpdated(false)
  }, [application, user.uuid])

  /**Checks whether the app has been updated and force saves it if it has */
  const syncAppToFirebase = useCallback(async () => {
    if (updated) {
      return forceSave()
    }
  }, [updated, forceSave])

  /**Setup auto-saving every 30 seconds */
  useEffect(() => {
    let interval = setInterval(syncAppToFirebase, 30000)
    return () => {
      clearInterval(interval)
    }
  }, [syncAppToFirebase, user.uuid])

  /**Update the updated variable when making changes to the new app */
  const updateApplication = newApp => {
    setApplication(newApp)
    setUpdated(true)
  }

  return (
    <HackerApplicationContext.Provider value={{ application, updateApplication, forceSave }}>
      {children}
    </HackerApplicationContext.Provider>
  )
}
