import React, { useEffect, useState } from 'react'
import Form from '../components/SubmissionForm'
import { getLivesiteDoc } from '../utility/firebase'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  const submit = email => {
    alert('TODO: handle form submit')
    console.log(email)
  }

  return isSubmissionsOpen ? (
    <Form email={email} onSubmit={submit} onChange={setEmail} />
  ) : (
    <h2>Submissions are not open yet. Please check back later.</h2>
  )
}
