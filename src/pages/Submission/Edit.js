import React, { useEffect, useState } from 'react'
import { getLivesiteDoc, getProject } from '../../utility/firebase'
import Form from '../../components/ProjectForm'

// TODO: Get from firebase auth
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const [project, setProject] = useState()

  useEffect(() => {
    ;(async () => {
      await getProject(USER_ID, setProject, null)
    })()
  }, [setProject])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  const submit = project => {
    alert('TODO: handle form submit')
    console.log(project)
  }

  return (
    // TODO: Implement this page
    isSubmissionsOpen ? (
      <Form project={project} onSubmit={submit} onChange={setProject} />
    ) : (
      <h2>Submissions are not open yet. Please check back later.</h2>
    )
  )
}
