import React, { useEffect, useState } from 'react'
import { getLivesiteDoc } from '../utility/firebase'
import ViewSubmission from '../containers/Submission'
import { useAuth } from '../utility/Auth'
import LinkSubmission from '../containers/SubmissionLink'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  if (!isSubmissionsOpen) {
    return (
      <>
        <h2>Submissions are not open.</h2>
        <h2>Check back here later to submit your project!</h2>
      </>
    )
  }

  return !!user.submitted_project ? <ViewSubmission user={user} /> : <LinkSubmission />
}
