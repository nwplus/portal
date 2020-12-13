import React, { useState, useEffect } from 'react'
import Dashboard from '../../components/ApplicationDashboard'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { useAuth } from '../../utility/Auth'
import { useLocation } from 'wouter'
import { livesiteDocRef, getLivesiteDoc } from '../../utility/firebase'
import Page from '../../components/Page'

const ApplicationDashboardContainer = () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [livesiteDoc, setLivesiteDoc] = useState(false)
  const [relevantDates, setRelevantDates] = useState({})
  const { user } = useAuth()
  const [, setLocation] = useLocation()

  useEffect(() => {
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const d = doc.data()
      if (d) {
        setRelevantDates({
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
      : hackerStatusObject.applicationStatus)

  const canRSVP =
    hackerStatus === 'acceptedNoResponseYet' || hackerStatus === 'acceptedNotAttending'
  const setRSVP = canRSVP => {
    updateApplication({
      status: {
        responded: true,
        attending: canRSVP,
      },
    })
    forceSave()
  }

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [setLivesiteDoc])

  return (
    <Page hackerStatus={hackerStatus}>
      <Dashboard
        editApplication={() => setLocation('/application/part-1')}
        username={user.displayName}
        hackerStatus={hackerStatus}
        isApplicationOpen={livesiteDoc.applicationsOpen}
        setRSVP={() => setRSVP(canRSVP)}
        canRSVP={canRSVP}
        relevantDates={relevantDates}
      />
    </Page>
  )
}

export default ApplicationDashboardContainer
