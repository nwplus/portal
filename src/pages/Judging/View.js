import React, { useEffect, useState } from 'react'
import { getLivesiteDoc } from '../../utility/firebase'

export default ({ id }) => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  return (
    // TODO: Implement this page
    isJudgingOpen ? <h1>Viewing project {id}</h1> : <h1>Judging is not open</h1>
  )
}
