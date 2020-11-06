import React, { useEffect, useState } from 'react'
import { getJudgingStatus } from '../../utility/firebase'

export default () => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = getJudgingStatus(setIsJudgingOpen)
    return unsubscribe
  }, [setIsJudgingOpen])

  return (
    // TODO: Implement this page
    isJudgingOpen ? <h1>Judging is open</h1> : <h1>Judging is not open</h1>
  )
}
