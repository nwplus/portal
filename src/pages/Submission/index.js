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
    isSubmissionsOpen ? <h1>Submissions are open</h1> : <h1>Submissions are not open</h1>
  )
}
