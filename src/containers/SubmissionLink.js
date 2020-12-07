import React, { useState } from 'react'
import Form from '../components/SubmissionForm'
import { applicantsRef, projectsRef } from '../utility/firebase'

const NO_PROJECT = 'no project found'

const getProjectByEmail = async email => {
  const projectDoc = await projectsRef.where('teamMembersEmails', 'array-contains', email).get()
  if (projectDoc.docs.length < 1) {
    return NO_PROJECT
  }
  return projectDoc
}

export default ({ user, refreshCallback }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = async email => {
    if (!!email) {
      setMessage(`Syncing Devpost...`)

      // try to find a submission which contains this email
      const projectRef = await getProjectByEmail(email)
      if (projectRef === NO_PROJECT) {
        setMessage(`Not found. Message an organizer in #ask-organizers.`)
        return
      }

      const projectId = projectRef.docs[0].id
      setMessage(`Found! Syncing submission...`)

      // if found, set firebase doc ref
      await applicantsRef.doc(user.uid).update({
        submittedProject: projectId,
      })

      setMessage(`Successfully synced. Refreshing...`)
      refreshCallback()
    } else {
      setMessage('Please enter a non-empty email.')
    }
  }

  return <Form email={email} msg={message} onSubmit={submit} onChange={setEmail} />
}
