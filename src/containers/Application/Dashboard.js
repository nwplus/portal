import React, { useState, useEffect } from 'react'
import Dashboard from '../../components/ApplicationDashboard'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { useAuth } from '../../utility/Auth'
import { useLocation } from 'wouter'
import { getLivesiteDoc, livesiteDocRef, currentHackathonRef } from '../../utility/firebase'
import Page from '../../components/Page'

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

  const hackerStatusObject = application.status
  const hackerStatus =
    hackerStatusObject !== undefined &&
    (hackerStatusObject.applicationStatus === 'accepted'
      ? hackerStatusObject.responded
        ? hackerStatusObject.attending
          ? 'acceptedAndAttending'
          : 'acceptedNotAttending'
        : 'acceptedNoResponseYet'
      : hackerStatusObject.applicationStatus === 'scored'
      ? 'applied'
      : hackerStatusObject.applicationStatus)

  const canRSVP =
    hackerStatus === 'acceptedNoResponseYet' || hackerStatus === 'acceptedNotAttending'
  const setRSVP = rsvpStatus => {
    updateApplication({
      status: {
        responded: true,
        attending: rsvpStatus,
      },
    })
    forceSave()
  }

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [setLivesiteDoc])

  return (
    <Page
      hackerStatus={hackerStatus}
      isRsvpOpen={isRsvpOpen}
      isLoadingAppStatus={isLoadingAppStatus}
    >
      <Dashboard
        editApplication={() => setLocation('/application/part-1')}
        username={user.displayName}
        hackerStatus={hackerStatus}
        isApplicationOpen={livesiteDoc.applicationsOpen}
        setRSVP={rsvpStatus => setRSVP(rsvpStatus)}
        canRSVP={canRSVP}
        relevantDates={relevantDates}
        isRsvpOpen={isRsvpOpen}
        isLoadingAppStatus={isLoadingAppStatus}
      />
    </Page>
  )
}

export default ApplicationDashboardContainer
