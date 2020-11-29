import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, applicantsRef, getProject } from '../../utility/firebase'
import Submission from '../../components/Submission'

// TODO: Get from firebase auth
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const [project, setProject] = useState()
  const [feedback, setFeedback] = useState([])

  useEffect(async () => {
    await getProject(USER_ID, setProject, setFeedback)
  }, [setProject, setFeedback])

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
