import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import HeroPage, { Loading, JudgingNotOpen } from '../../components/HeroPage'
import ViewProject from '../../components/ViewProject'
import { getLivesiteDoc, projectsRef, db, applicantsRef } from '../../utility/firebase'
import { useAuth } from '../../utility/Auth'

const REDIRECT_TIMEOUT = 3000

export default ({ id }) => {
  const [, setLocation] = useLocation()
  const { user } = useAuth()
  const [pageBlocked, setPageBlocked] = useState()
  const [isJudgingOpen, setIsJudgingOpen] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)
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
      if (data.grades[user.uid]) {
        setPageBlocked('You already graded this project')
        return
      }
      setProject(data)
    })()
  }, [id, user.uid, setPageBlocked])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  const submit = async () => {
    if (!score.tech || !score.design || !score.functionality || !score.creativity || !score.pitch) {
      setError(true)
    } else if (!isSubmitting) {
      setError(false)
      setIsSubmitting(true)
      await db.runTransaction(async transaction => {
        const projectDoc = await transaction.get(projectsRef.doc(id))
        if (!projectDoc.exists) {
          setIsSubmitting(false)
          alert('Error, project not found')
          return
        }
        const oldGrades = projectDoc.data().grades
        const grades = { ...oldGrades, [user.uid]: score }
        transaction.update(projectsRef.doc(id), { grades })
      })
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => setLocation('/judging'), REDIRECT_TIMEOUT)
    }
  }

  if (pageBlocked) {
    return (
      <HeroPage>
        <h2>{pageBlocked}</h2>
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
    <ViewProject
      project={project}
      score={score}
      onChange={setScore}
      onSubmit={submit}
      isSubmitting={isSubmitting}
      error={error}
      success={success}
    />
  )
}
