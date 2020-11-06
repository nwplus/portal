import React, { useEffect, useState } from 'react'
import { isJudgingOpen } from '../../utility/firebase'

export default ({ id }) => {
  const [isJudgingEnabled, setIsJudgingEnabled] = useState(false)

  useEffect(() => {
    const unsubscribe = isJudgingOpen(setIsJudgingEnabled)
    return unsubscribe
  }, [setIsJudgingEnabled])

  return (
    // TODO: Implement this page
    isJudgingEnabled ? <h1>Viewing project {id}</h1> : <h1>Judging is not open</h1>
  )
}
