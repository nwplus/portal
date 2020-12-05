import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './Auth'
import { getUserApplication, updateUserApplication, getLivesiteDoc } from './firebase'
import firebase from 'firebase/app'
import Spinner from '../components/Loading'
import Page from '../components/Page'
const HackerApplicationContext = createContext()

export function useHackerApplication() {
  return useContext(HackerApplicationContext)
}

export function HackerApplicationProvider({ children }) {
  const { user } = useAuth()
  const [application, setApplication] = useState({})
  const [, setUpdated] = useState(false)
  const [applicationOpen, setApplicationOpen] = useState(null)
  const applicationRef = useRef()

  /**Saves the users application, can be called manually or through interval */
  /**Uses a reference to the application because I don't want all my useEffects triggering every time someone changes the application. */
  const forceSave = useCallback(async () => {
    if (!user) return
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

  /**Setup auto-saving every 30 seconds */
  useEffect(() => {
    let interval = setInterval(syncAppToFirebase, 30000)
    return () => {
      clearInterval(interval)
    }
  }, [syncAppToFirebase, user])

  /**Update the updated variable when making changes to the new app
     Keep the ref up to date with the latest application
     Handles merging of the current app with the new one */
  const updateApplication = ({ basicInfo, skills, questionnaire, status, team }) => {
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
      team: team ? team : application.team,
    }
    setApplication(mergedApp)
    applicationRef.current = mergedApp
    setUpdated(true)
  }

  /**Check if the application is open */
  useEffect(() => {
    return getLivesiteDoc(data => {
      setApplicationOpen(data.applicationsOpen)
    })
  }, [])

  /**applicationOpen hasn't loaded ? show a spinner
   * Applications are closed ? show message
   * Applications are open ? Show application
   */
  return applicationOpen === null ? (
    <Spinner />
  ) : !applicationOpen ? (
    <Page>Applications are closed.</Page>
  ) : (
    <HackerApplicationContext.Provider value={{ application, updateApplication, forceSave }}>
      {children}
    </HackerApplicationContext.Provider>
  )
}
