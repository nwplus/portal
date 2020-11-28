import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, applicantsRef } from '../../utility/firebase'
import Submission from '../../components/Submission'

// TODO: Get from firebase auth
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)

  // TODO: use firebase data
  // eslint-disable-next-line no-unused-vars
  const [project, setProject] = useState()

  console.log(project)

  // TODO: use firebase data
  // eslint-disable-next-line no-unused-vars
  const [feedback, setFeedback] = useState([
    'Very good!',
    'Wow this project changed my life like how is this real omg i would give my life for this.',
  ])

  useEffect(() => {
    ;(async () => {
      const application = await applicantsRef.doc(USER_ID).get()
      const team = await application.data().team.get()
      const project = await team.data().project.get()
      const projectData = project.data()
      const youtubeID = new URL(projectData.youtubeUrl).searchParams.get('v')
      projectData.imgUrl = `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`
      projectData.href = projectData.devpostUrl
      setProject(projectData)
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
