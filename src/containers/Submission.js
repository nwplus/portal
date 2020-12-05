import React, { useEffect, useState } from 'react'
import { getProject } from '../utility/firebase'
import Submission from '../components/Submission'

export default user => {
  const [project, setProject] = useState()
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    ;(async () => {
      console.log(user)
      await getProject(user.uid, setProject, setFeedback)
    })()
  }, [setProject, setFeedback])

  return <Submission project={project} feedback={feedback} />
}
