import React, { useEffect, useState } from 'react'
import { H2 } from '../../components/Typography'
import ViewProject from '../../components/ViewProject'
import { getLivesiteDoc, projectsRef } from '../../utility/firebase'
import { useAuth } from '../../utility/Auth'

export default ({ id }) => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)
  const { user } = useAuth()
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

  // TODO: Get from firebase
  // eslint-disable-next-line no-unused-vars
  const [project, setProject] = useState({
    id: 'a7xh134',
    description:
      'This project is a project that is very cool haha! This project is a project that is cool! This project is a project that is very cool!',
    youtubeUrl: 'https://www.youtube.com/watch?v=PQgHXPGoKwg',
    imgUrl: 'https://img.youtube.com/vi/PQgHXPGoKwg/maxresdefault.jpg',
    devpostUrl: 'https://devpost.com/software/impostor',
    title: 'Imposter',
  })

  useEffect(() => {
    ;(async () => {
      const projectDoc = await projectsRef.doc(id).get()
      const data = projectDoc.data()
      setProject(data)
    })()
  }, [id])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  const submit = async () => {
    if (!score.tech || !score.design || !score.functionality || !score.creativity || !score.pitch) {
      setError(true)
    } else if (!isSubmitting) {
      setIsSubmitting(true)
      await projectsRef.doc(id).collection('Grades').doc(user.uid).set(score)
      setIsSubmitting(false)
      setSuccess(true)
    }
  }

  if (!isJudgingOpen) {
    return <H2>Judging is not open yet. Please check back later.</H2>
  }

  return (
    <ViewProject
      project={project}
      score={score}
      onChange={setScore}
      onSubmit={submit}
      error={error}
      success={success}
    />
  )
}
