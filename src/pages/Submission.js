import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, getUserApplication, getSubmission } from '../utility/firebase'
import ViewSubmission from '../components/Submission'
import HeroPage, { Loading } from '../components/HeroPage'
import { useAuth } from '../utility/Auth'
import LinkSubmission from '../containers/SubmissionLink'
import { formatProject } from '../utility/utilities'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState()
  const { user } = useAuth()
  const [submission, setSubmission] = useState()

  const getProject = async () => {
    const d = await getUserApplication(user.uid)
    const submittedProjectRef = d.submittedProject
    if (!!submittedProjectRef) {
      const submission = await getSubmission(submittedProjectRef)
      setSubmission(submission)
    }
  }

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
      } else {
        setSubmission(false)
      }
    })()
  }, [user])

  if (isSubmissionsOpen === undefined || submission === undefined) {
    return <Loading />
  }

  if (!isSubmissionsOpen) {
    return (
      <HeroPage>
        <h2>Submissions are not open</h2>
        <p>Check back here later</p>
      </HeroPage>
    )
  }

  return !!submission ? (
    <ViewSubmission project={formatProject(submission)} user={user} />
  ) : (
    <LinkSubmission user={user} refreshCallback={getProject} />
  )
}
