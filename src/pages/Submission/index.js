import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, applicantsRef } from '../../utility/firebase'
import Submission from '../../components/Submission'
import { getYoutubeThumbnail } from '../../utility/utilities'

// TODO: Get from firebase auth
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const [project, setProject] = useState()
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    // https://stackoverflow.com/questions/17978883/what-is-the-purpose-of-a-semicolon-before-an-iife
    ;(async () => {
      const application = await applicantsRef.doc(USER_ID).get()
      const team = await application.data().team.get()
      team
        .data()
        .project.get()
        .then(doc => {
          const projectData = doc.data()
          projectData.imgUrl = getYoutubeThumbnail(projectData.youtubeUrl)
          projectData.href = projectData.devpostUrl
          setProject(projectData)
        })
      team
        .data()
        .project.collection('Grades')
        .orderBy('notes')
        .get()
        .then(doc => {
          const feedback = doc.docs.map(doc => {
            const docData = doc.data()
            return docData.notes
          })
          setFeedback(feedback)
        })
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
