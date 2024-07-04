import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Dashboard from '../../components/ApplicationDashboard'
import Page from '../../components/Page'
import { useAuth } from '../../utility/Auth'
import { uploadWaiverToStorage, useHackerApplication } from '../../utility/HackerApplicationContext'
import { MAX_WAIVER_FILE_SIZE_MB } from '../../utility/Validation'
import { currentHackathonRef, getLivesiteDoc, livesiteDocRef } from '../../utility/firebase'

const ApplicationDashboardContainer = () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [livesiteDoc, setLivesiteDoc] = useState(false)
  const [relevantDates, setRelevantDates] = useState({})
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)
  const [isLoadingAppStatus, setIsLoadingAppStatus] = useState(true)
  const [isLoadingWaiverUpload, setIsLoadingWaiverUpload] = useState(false)
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

  const shareQRCode = (hackerEmail, hackerName) => {
    // alert("rsvp")
    // Display QR code
  }

  const canRSVP = hackerStatus === 'acceptedNoResponseYet'
  const setRSVP = rsvpStatus => {
    updateApplication({
      status: {
        responded: true,
        attending: rsvpStatus,
        applicationStatus: rsvpStatus ? 'acceptedAndAttending' : 'acceptedUnRSVP',
      },
    })
    forceSave()

    if (rsvpStatus) {
      // hacker RSVP'd for the hackathon -> send email
      shareQRCode(user.email, user.displayName)
    }
  }

  // const setSafewalkInput = safewalkNote => {
  //   updateApplication({
  //     basicInfo: {
  //       safewalkNote,
  //     },
  //   })
  //   forceSave()
  // }

  const setCovidWaiverCheck = covidWaiverCheck => {
    updateApplication({
      basicInfo: {
        covidWaiverCheck,
      },
    })
    forceSave()
  }

  const setReleaseLiabilityCheck = releaseLiabilityCheck => {
    updateApplication({
      basicInfo: {
        releaseLiabilityCheck,
      },
    })
    forceSave()
  }

  const setMediaConsentCheck = mediaConsentCheck => {
    updateApplication({
      basicInfo: {
        mediaConsentCheck,
      },
    })
    forceSave()
  }

  const setAgeOfMajoritySelect = ageOfMajoritySelect => {
    updateApplication({
      basicInfo: {
        ageOfMajoritySelect,
      },
    })
    forceSave()
  }

  const setWillBeAttendingSelect = willBeAttendingSelect => {
    updateApplication({
      basicInfo: {
        willBeAttendingSelect,
      },
    })
    forceSave()
  }

  const setSafewalkSelect = safewalkSelect => {
    updateApplication({
      basicInfo: {
        safewalkSelect,
      },
    })
    forceSave()
  }

  const setNwMentorshipSelect = nwMentorshipSelect => {
    updateApplication({
      basicInfo: {
        nwMentorshipSelect,
      },
    })
    forceSave()
  }

  const handleWaiver = async waiver => {
    // check to make sure its under 2mb
    const size = (waiver.size / 1024 / 1024).toFixed(2)
    if (size > MAX_WAIVER_FILE_SIZE_MB) return

    // upload the waiver and update the application on success.
    setIsLoadingWaiverUpload(true)
    await uploadWaiverToStorage(application._id, waiver)
    setIsLoadingWaiverUpload(false)
    updateApplication({
      basicInfo: {
        waiver: waiver.name,
      },
    })
    forceSave()
  }

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [setLivesiteDoc])

  return isLoadingAppStatus ? null : (
    <Page hackerStatus={hackerStatus}>
      <Dashboard
        editApplication={() => setLocation('/application/part-0')}
        username={user.displayName}
        hackerStatus={hackerStatus}
        isApplicationOpen={livesiteDoc.applicationsOpen}
        setRSVP={rsvpStatus => setRSVP(rsvpStatus)}
        canRSVP={canRSVP}
        // safewalkNote={application.basicInfo.safewalkNote || false}
        // setSafewalkInput={safewalkNote => setSafewalkInput(safewalkNote)}
        covidWaiverCheck={application.basicInfo.covidWaiverCheck || undefined}
        setCovidWaiverCheck={covidWaiverCheck => setCovidWaiverCheck(covidWaiverCheck)}
        releaseLiabilityCheck={application.basicInfo.releaseLiabilityCheck || undefined}
        setReleaseLiabilityCheck={releaseLiabilityCheck =>
          setReleaseLiabilityCheck(releaseLiabilityCheck)
        }
        mediaConsentCheck={application.basicInfo.mediaConsentCheck || false}
        setMediaConsentCheck={mediaConsentCheck => setMediaConsentCheck(mediaConsentCheck)}
        ageOfMajoritySelect={application.basicInfo.ageOfMajoritySelect || undefined}
        setAgeOfMajoritySelect={ageOfMajoritySelect => setAgeOfMajoritySelect(ageOfMajoritySelect)}
        willBeAttendingSelect={application.basicInfo.willBeAttendingSelect || undefined}
        setWillBeAttendingSelect={willBeAttendingSelect =>
          setWillBeAttendingSelect(willBeAttendingSelect)
        }
        safewalkSelect={application.basicInfo.safewalkSelect || undefined}
        setSafewalkSelect={safewalkSelect => setSafewalkSelect(safewalkSelect)}
        nwMentorshipSelect={application.basicInfo.nwMentorshipSelect || undefined}
        setNwMentorshipSelect={nwMentorshipSelect => setNwMentorshipSelect(nwMentorshipSelect)}
        relevantDates={relevantDates}
        isRsvpOpen={isRsvpOpen}
        handleWaiver={handleWaiver}
        waiverName={application.basicInfo.waiver}
        waiverLoading={isLoadingWaiverUpload}
      />
    </Page>
  )
}

export default ApplicationDashboardContainer
