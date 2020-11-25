import React, { useEffect, useState } from 'react'
import { getLivesiteDoc } from '../../utility/firebase'

export default () => {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsSubmissionsOpen(livesiteDoc.submissionsOpen)
    )
    return unsubscribe
  }, [setIsSubmissionsOpen])

  return (
    // TODO: Implement this page
    isSubmissionsOpen ? <h1>Create - You cannot submit yet</h1> : <h1>TODO: Submission form</h1>
  )
}
