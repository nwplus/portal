// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, getUserApplication, getSubmission, submitGrade } from '../utility/firebase'
import ViewSubmission from '../components/Judging/Submission'
import HeroPage, { Loading } from '../components/HeroPage'
import { useAuth } from '../utility/Auth'
import LinkSubmission from '../containers/SubmissionLink'
import { formatProject } from '../utility/utilities'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState()
  const { user } = useAuth()
  const [submission, setSubmission] = useState()

  const reportGrade = async id => {
    const score = {
      ...submission.grades[id],
      reported: true,
    }
    await submitGrade(submission.id, score, { uid: id })
    window.location.reload()
  }

  const getProject = async () => {
    const d = await getUserApplication(user.uid)
    if (!d.submittedProject) {
      setSubmission(false)
      return
    }

    const submittedProjectRef = d.submittedProject
    const submission = await getSubmission(submittedProjectRef)
    if (!!submittedProjectRef && submission.exists) {
      Object.keys(submission.grades ?? {}).forEach(id => {
        if (submission.grades[id].removed) {
          delete submission.grades[id]
        }
      })

      setSubmission(!submission ? false : submission)
    } else {
      setSubmission(false)
    }
  }

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isSubmissionsOpen === undefined || submission === undefined) {
    return <Loading />
  }

  if (!isSubmissionsOpen) {
    return (
      <HeroPage>
        <h2>Submissions are not open</h2>
        Check back here later
      </HeroPage>
    )
  }

  return <LinkSubmission user={user} refreshCallback={getProject} />
}
