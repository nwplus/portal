import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './Auth'
import {
  analytics,
  storage,
  getUserApplication,
  updateUserApplication,
  getLivesiteDoc,
} from './firebase'
import firebase from 'firebase/app'
import Spinner from '../components/Loading'
import { ANALYTICS_EVENTS, HACKER_APPLICATION_TEMPLATE } from './Constants'
import Closed from '../pages/Application/Closed'
import { fillMissingProperties, useDebounce } from './utilities'

const HackerApplicationContext = createContext()

export function useHackerApplication() {
  return useContext(HackerApplicationContext)
}

export const uploadResumeToStorage = async (userId, file) => {
  try {
    const ref = storage.ref(`applicantResumes/${userId}`)
    const uploadData = await ref.put(file)
    return uploadData.ref.getDownloadURL()
  } catch (e) {
    return null
  }
}

export const uploadWaiverToStorage = async (userId, file) => {
  try {
    const ref = storage.ref(`hackerWaivers/${userId}`)
    const uploadData = await ref.put(file)
    return uploadData.ref.getDownloadURL()
  } catch (e) {
    return null
  }
}

export function HackerApplicationProvider({ children }) {
  const { user } = useAuth()
  const [application, setApplication] = useState(HACKER_APPLICATION_TEMPLATE)
  const [, setUpdated] = useState(false)
  const [applicationOpen, setApplicationOpen] = useState(null)
  const applicationRef = useRef()

  /**Initialize retrieval of hacker application */
  useEffect(() => {
    const retrieveApplication = async () => {
      if (!user) return
      const app = await getUserApplication(user.uid)
      fillMissingProperties(app, HACKER_APPLICATION_TEMPLATE)
      setApplication(app)
      setUpdated(false)
      analytics.logEvent(ANALYTICS_EVENTS.AccessApplication, { userId: user.uid })
    }
    retrieveApplication()
  }, [user])

  /**Saves the users application, can be called manually or through interval */
  /**Uses a reference to the application because I don't want all my useEffects triggering every time someone changes the application. */
  const forceSave = useCallback(async () => {
    if (!user || !applicationRef.current) return
    const updatedApp = {
      ...applicationRef.current,
      submission: {
        lastUpdated: firebase.firestore.Timestamp.now(),
        submitted: false,
      },
    }
    await updateUserApplication(user.uid, updatedApp)
    setApplication(updatedApp)
    applicationRef.current = updatedApp
    setUpdated(false)
  }, [user])

  /**Initialize retrieval of hacker application */
  useEffect(() => {
    const retrieveApplication = async () => {
      if (!user) return
      const app = await getUserApplication(user.uid)
      fillMissingProperties(app, HACKER_APPLICATION_TEMPLATE)
      setApplication(app)
      applicationRef.current = app
      setUpdated(false)
    }
    retrieveApplication()
    return async () => {
      await forceSave()
    }
  }, [forceSave, user])

  /**Checks whether the app has been updated and force saves it if it has */
  const syncAppToFirebase = useCallback(async () => {
    setUpdated(updated => {
      if (updated) {
        forceSave()
      }
      return updated
    })
  }, [forceSave])

  // Debounced update that's called whenever the application object is updated
  // Will only update the application on Firebase if 30 seconds have passed since last call
  const debounceUpdate = useDebounce(() => {
    syncAppToFirebase()
  }, 30000)

  /**Update the updated variable when making changes to the new app
     Keep the ref up to date with the latest application
     Handles merging of the current app with the new one */
  const updateApplication = ({
    basicInfo,
    skills,
    questionnaire,
    status,
    termsAndConditions,
    team,
  }) => {
    const mergedApp = {
      ...application,
      basicInfo: {
        ...application.basicInfo,
        ...basicInfo,
      },
      skills: {
        ...application.skills,
        ...skills,
      },
      questionnaire: {
        ...application.questionnaire,
        ...questionnaire,
      },
      status: {
        ...application.status,
        ...status,
      },
      termsAndConditions: {
        ...application.termsAndConditions,
        ...termsAndConditions,
      },
      team: team ? team : application.team,
    }
    setApplication(mergedApp)
    applicationRef.current = mergedApp
    setUpdated(true)
    debounceUpdate()
  }

  /**Check if the application is open */
  useEffect(() => {
    return getLivesiteDoc(data => {
      setApplicationOpen(data.applicationsOpen)
    })
  }, [])

  if (applicationOpen === null || application === undefined) {
    return null
  }

  if (!applicationOpen && window.location.pathname !== '/application') {
    return <Closed />
  }

  return (
    <HackerApplicationContext.Provider value={{ application, updateApplication, forceSave }}>
      {children}
    </HackerApplicationContext.Provider>
  )
}
