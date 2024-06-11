import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'wouter'
import HeroPage, { Loading, JudgingNotOpen } from '../../components/HeroPage'
import ViewProject from '../../components/Judging/ViewProject'
import { A } from '../../components/Typography'
import Toast from '../../components/Toast'
import { getLivesiteDoc, projectsRef, applicantsRef, submitGrade } from '../../utility/firebase'
import { useAuth } from '../../utility/Auth'
import { defaultScoreFromRubric, isUngraded } from '../../utility/Constants'

const REDIRECT_TIMEOUT = 3000

const View = ({ id }) => {
  const [, setLocation] = useLocation()
  const { user } = useAuth()
  const [pageBlocked, setPageBlocked] = useState()
  const [showError, setShowError] = useState(false)
  const [isJudgingOpen, setIsJudgingOpen] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [score, setScore] = useState(defaultScoreFromRubric())
  const [project, setProject] = useState()

  useEffect(() => {
    ;(async () => {
      const applicantDoc = await applicantsRef.doc(user.uid).get()
      const { projectsAssigned } = applicantDoc.data()
      if (!projectsAssigned.includes(id)) {
        setPageBlocked('Project not found')
        return
      }
      const projectDoc = await projectsRef.doc(id).get()
      const data = projectDoc.data()
      if (data.grades && data.grades[user.uid]) {
        setPageBlocked('You already graded this project')
        return
      }
      setProject(data)
    })()
  }, [id, user.uid])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  const submit = async () => {
    if (isUngraded(score)) {
      setFormError(true)
    } else if (!isSubmitting) {
      setFormError(false)
      setIsSubmitting(true)
      await submitGrade(id, score, user, setShowError)
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => setLocation('/judging'), REDIRECT_TIMEOUT)
    }
  }

  if (pageBlocked) {
    return (
      <HeroPage>
        <h2>{pageBlocked}</h2>
        Back to{' '}
        <Link href="/judging">
          <A>judging</A>
        </Link>
      </HeroPage>
    )
  }

  if (!project || isJudgingOpen === undefined) {
    return <Loading />
  }

  if (!isJudgingOpen) {
    return <JudgingNotOpen />
  }

  return (
    <>
      <ViewProject
        project={project}
        score={score}
        onChange={setScore}
        onSubmit={submit}
        isSubmitting={isSubmitting}
        error={formError}
        success={success}
      />

      <Toast>
        {showError
          ? 'There was an issue submitting. If this persists, please contact us on discord.'
          : null}
      </Toast>
    </>
  )
}

export default View
