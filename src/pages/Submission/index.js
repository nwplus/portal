import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, applicantsRef } from '../../utility/firebase'
import Submission from '../../components/Submission'

// TODO: Get from firebase auth
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const [project, setProject] = useState()
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    ;(async () => {
      const application = await applicantsRef.doc(USER_ID).get()
      const team = await application.data().team.get()
      const project = await team.data().project.get()
      const projectData = project.data()
      const youtubeID = new URL(projectData.youtubeUrl).searchParams.get('v')
      projectData.imgUrl = `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`
      projectData.href = projectData.devpostUrl
      const grades = await team.data().project.collection('Grades').get()
      const feedback = grades.docs.map(doc => {
        const docData = doc.data()
        return docData.notes
      })
      setProject(projectData)
      setFeedback(feedback)
    })()
  }, [setProject])

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
