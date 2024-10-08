import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, getUserApplication, getSubmission, submitGrade } from '../utility/firebase'
import ViewSubmission from '../components/Judging/Submission'
import HeroPage, { Loading } from '../components/HeroPage'
import { useAuth } from '../utility/Auth'
import SubmissionLink from '../containers/SubmissionLink'
import { formatProject } from '../utility/utilities'
import { useHackathon } from '../utility/HackathonProvider'

const Submissions = () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState()
  const [isJudgingReleased, setIsJudgingReleased] = useState()
  const { user } = useAuth()
  const [submission, setSubmission] = useState()
  const { activeHackathon, dbHackathonName } = useHackathon()

  const reportGrade = async id => {
    const score = {
      ...submission.grades[id],
      reported: true,
    }
    await submitGrade(submission.id, score, { uid: id }, dbHackathonName)
    window.location.reload()
  }

  const getProject = async () => {
    const d = await getUserApplication(user.uid, dbHackathonName)

    if (!d.submittedProject) {
      setSubmission(false)
      return
    }

    const submittedProjectRef = d.submittedProject
    const submission = await getSubmission(submittedProjectRef, dbHackathonName)
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
    const unsubscribe = getLivesiteDoc(livesiteDoc => {
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen[activeHackathon])
      setIsJudgingReleased(livesiteDoc.judgingReleased[activeHackathon])
    })
    return unsubscribe
  }, [setIsSubmissionsOpen])

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isSubmissionsOpen === undefined || submission === undefined) {
    return <Loading />
  }

  if (isJudgingReleased) {
    return (
      <ViewSubmission
        project={formatProject(submission)}
        user={user}
        reportCallback={reportGrade}
      />
    )
  }

  if (!isSubmissionsOpen) {
    return (
      <HeroPage>
        <h2>Submissions are not open</h2>
        Check back here later
      </HeroPage>
    )
  }

  return <SubmissionLink user={user} refreshCallback={getProject} />
}

export default Submissions
