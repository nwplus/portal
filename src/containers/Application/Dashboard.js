import React, { useState, useEffect } from 'react'
import Dashboard from '../../components/ApplicationDashboard'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { useAuth } from '../../utility/Auth'
import { useLocation } from 'wouter'
import { getLivesiteDoc, livesiteDocRef, currentHackathonRef } from '../../utility/firebase'
import Page from '../../components/Page'
import Spinner from '../../components/Loading'

const ApplicationDashboardContainer = () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [livesiteDoc, setLivesiteDoc] = useState(false)
  const [relevantDates, setRelevantDates] = useState({})
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)
  const [isLoadingAppStatus, setIsLoadingAppStatus] = useState(true)
  const { user } = useAuth()
  const [, setLocation] = useLocation()

  useEffect(() => {
    const unsubscribe = currentHackathonRef.onSnapshot(doc => {
      setIsRsvpOpen(doc.data().featureFlags.rsvpOpenFlag)
      setIsLoadingAppStatus(false)
    })
    return unsubscribe
  }, [setIsRsvpOpen])

  useEffect(() => {
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const d = doc.data()
      if (d) {
        setRelevantDates({
          applicationDeadline: d.applicationDeadline,
          sendAcceptancesBy: d.sendAcceptancesBy,
          rsvpBy: d.rsvpBy,
          offWaitlistNotify: d.offWaitlistNotify,
          hackathonWeekend: d.hackathonWeekend,
        })
      }
    })
    return unsubscribe
  }, [setRelevantDates])

  const { applicationStatus, responded, attending } = application.status
  let hackerStatus

  if (applicationStatus === 'accepted') {
    if (responded) {
      if (attending) {
        hackerStatus = 'acceptedAndAttending'
      } else {
        hackerStatus = 'acceptedUnRSVP'
      }
    } else if (isRsvpOpen) {
      hackerStatus = 'acceptedNoResponseYet'
    } else {
      hackerStatus = 'acceptedNoRSVP'
    }
  } else if (applicationStatus === 'scored') {
    hackerStatus = 'applied'
  } else {
    hackerStatus = applicationStatus
  }

  const canRSVP =
    hackerStatus === 'acceptedNoResponseYet' ||
    hackerStatus === 'acceptedUnRSVP' ||
    hackerStatus === 'acceptedNoRSVP'
  const setRSVP = rsvpStatus => {
    updateApplication({
      status: {
        responded: true,
        attending: rsvpStatus,
        applicationStatus: rsvpStatus ? 'acceptedAndAttending' : 'acceptedUnRSVP',
      },
    })
    forceSave()
  }

  const setSafewalkInput = safewalkNote => {
    console.log(safewalkNote)
    updateApplication({
      basicInfo: {
        safewalkNote,
      },
    })
    forceSave()
  }

  const setDietaryRestriction = dietaryNote => {
    console.log(dietaryNote)
    updateApplication({
      basicInfo: {
        dietaryNote,
      },
    })
    forceSave()
  }

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [setLivesiteDoc])

  return isLoadingAppStatus ? (
    <Spinner />
  ) : (
    <Page hackerStatus={hackerStatus}>
      <Dashboard
        editApplication={() => setLocation('/application/part-0')}
        username={user.displayName}
        hackerStatus={hackerStatus}
        isApplicationOpen={livesiteDoc.applicationsOpen}
        setRSVP={rsvpStatus => setRSVP(rsvpStatus)}
        canRSVP={canRSVP}
        safewalkNote={application.basicInfo.safewalkNote || false}
        setSafewalkInput={safewalkNote => setSafewalkInput(safewalkNote)}
        dietaryNote={application.basicInfo.dietaryNote || ''}
        setDietaryRestrictions={dietaryNote => setDietaryRestriction(dietaryNote)}
        relevantDates={relevantDates}
        isRsvpOpen={isRsvpOpen}
      />
    </Page>
  )
}

export default ApplicationDashboardContainer
