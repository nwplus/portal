import React, { useEffect, useState } from 'react'
import { getLivesiteDoc } from '../../utility/firebase'
import Submission from '../../components/Submission'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)

  // TODO: use firebase data
  // eslint-disable-next-line no-unused-vars
  const [project, setProject] = useState({
    description: 'This project is a project that is very cool!',
    imgUrl: 'https://img.youtube.com/vi/PQgHXPGoKwg/maxresdefault.jpg',
    devpost: 'https://devpost.com/software/impostor',
    title: 'Imposter',
    teamName: 'H4ckHouse',
  })

  // TODO: use firebase data
  // eslint-disable-next-line no-unused-vars
  const [feedback, setFeedback] = useState([
    'Very good!',
    'Wow this project changed my life like how is this real omg i would give my life for this.',
  ])

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

  return <Submission project={project} feedback={feedback} />
}
