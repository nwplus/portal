import React, { useEffect, useState } from 'react'
import Form from '../components/SubmissionForm'
import { getLivesiteDoc, applicantsRef, projectsRef } from '../utility/firebase'

const NO_PROJECT = 'no project found'

const getProjectByEmail = async email => {
  const projectDoc = await projectsRef.where('teamMembersEmails', 'array-contains', email).get()
  if (projectDoc.docs.length < 1) {
    return NO_PROJECT
  }
  return projectDoc
}

export default userRef => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  const submit = async email => {
    if (!!email) {
      setMessage(`Syncing Devpost...`)

      // try to find a submission which contains this email
      const project_ref = await getProjectByEmail(email)
      if (project_ref === NO_PROJECT) {
        setMessage(`Not found. Message an organizer in #ask-organizers.`)
        return
      }

      const projectId = project_ref.docs[0].id
      setMessage(`Found! Syncing submission...`)

      // if found, set firebase doc ref
      applicantsRef.doc(userRef.user.uid).update({
        submittedProject: projectId,
      })

      setMessage(`Successfully synced. Refreshing...`)
    } else {
      setMessage('Please enter a non-empty email.')
    }
  }

  return isSubmissionsOpen ? (
    <Form email={email} msg={message} onSubmit={submit} onChange={setEmail} />
  ) : (
    <h2>Submissions are not open yet. Please check back later.</h2>
  )
}
