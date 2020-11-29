import React, { useEffect, useState } from 'react'
import { getLivesiteDoc } from '../../utility/firebase'
import { Button, TextInput, TextArea, Checkbox, Select, Dropdown } from '../../components/Input'
import Form from '../../components/ProjectForm'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)

  // TODO: use firebasse
  const [submission, setSubmission] = useState({
    name: 'Test Submission',
  })

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  const submit = e => {
    console.log(e)
  }

  return (
    // TODO: Implement this page
    isSubmissionsOpen ? <Form name={submission.name} /> : <h1>Edit - You cannot submit yet</h1>
  )
}
