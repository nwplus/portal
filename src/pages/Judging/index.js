import React, { useEffect, useState } from 'react'
import { isJudgingOpen } from '../../utility/firebase'

export default () => {
  const [isJudgingEnabled, setIsJudgingEnabled] = useState(false)

  useEffect(() => {
    const unsubscribe = isJudgingOpen(setIsJudgingEnabled)
    return unsubscribe
  }, [setIsJudgingEnabled])

  return (
    isJudgingEnabled ? <h1>Judging is open</h1> : <h1>Judging is not open</h1>
  )
}
