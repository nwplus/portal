import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, getUserApplication, getSubmission } from '../utility/firebase'
import ViewSubmission from '../components/Submission'
import { useAuth } from '../utility/Auth'
import LinkSubmission from '../containers/SubmissionLink'
import { formatProject } from '../utility/utilities'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const { user } = useAuth()
  const [submission, setSubmission] = useState()

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  useEffect(() => {
    ;(async () => {
      const d = await getUserApplication(user.uid)
      const submittedProjectRef = d.submittedProject
      if (!!submittedProjectRef) {
        const submission = await getSubmission(submittedProjectRef)
        setSubmission(submission)
      }
    })()
  }, [user])

  if (!isSubmissionsOpen) {
    return (
      <>
        <h2>Submissions are not open.</h2>
        <h2>Check back here later to submit your project!</h2>
      </>
    )
  }

  console.log(submission, !!submission)
  return !!submission ? (
    <ViewSubmission project={formatProject(submission)} user={user} />
  ) : (
    <LinkSubmission user={user} />
  )
}
