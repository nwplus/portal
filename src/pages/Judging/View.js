import React, { useEffect, useState } from 'react'
import { H2 } from '../../components/Typography'
import ViewProject from '../../components/ViewProject'
import { getLivesiteDoc } from '../../utility/firebase'

export default ({ id }) => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)
  const [score, setScore] = useState({
    tech: 0,
    design: 0,
    functionality: 0,
    creativity: 0,
    pitch: 0,
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
    // TODO: Get project from firebase
    console.log(id)
  }, [id, setProject])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  const submit = () => {
    // TODO: Submit to firebase
    console.log(score)
  }

  if (!isJudgingOpen) {
    return <H2>Judging is not open yet. Please check back later.</H2>
  }

  return <ViewProject project={project} score={score} onChange={setScore} onSubmit={submit} />
}
