import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'wouter'
import HeroPage, { Loading, JudgingNotOpen } from '../../components/HeroPage'
import ViewProject from '../../components/Judging/ViewProject'
import { A } from '../../components/Typography'
import ErrorBanner from '../../components/ErrorBanner'
import { getLivesiteDoc, projectsRef, db, applicantsRef } from '../../utility/firebase'
import { useAuth } from '../../utility/Auth'

const REDIRECT_TIMEOUT = 3000

export default ({ id }) => {
  const [, setLocation] = useLocation()
  const { user } = useAuth()
  const [pageBlocked, setPageBlocked] = useState()
  const [showError, setShowError] = useState(false)
  const [isJudgingOpen, setIsJudgingOpen] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [score, setScore] = useState({
    tech: 0,
    design: 0,
    functionality: 0,
    creativity: 0,
    pitch: 0,
    notes: '',
  })

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
    if (!score.tech || !score.design || !score.functionality || !score.creativity || !score.pitch) {
      setFormError(true)
    } else if (!isSubmitting) {
      setFormError(false)
      setIsSubmitting(true)
      try {
        await db.runTransaction(async transaction => {
          const projectDoc = await transaction.get(projectsRef.doc(id))
          if (!projectDoc.exists) {
            setIsSubmitting(false)
            console.err('Project does not exist')
            setShowError(true)
            return
          }
          const oldGrades = projectDoc.data().grades
          const grades = { ...oldGrades, [user.uid]: score }
          transaction.update(projectsRef.doc(id), { grades })
        })
      } catch (e) {
        setShowError(true)
        console.err(e)
      }
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

      <ErrorBanner>
        {showError
          ? 'There was an issue submitting. If this persists, please contact us on discord.'
          : null}
      </ErrorBanner>
    </>
  )
}
