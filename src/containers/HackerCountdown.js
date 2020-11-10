import React, { useState, useEffect } from 'react'
import Countdown from './Countdown'
import { livesiteDocRef } from '../utility/firebase'

export default () => {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  useEffect(() => {
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const d = doc.data()
      if (d) {
        setStart(new Date(d.hackingStart))
        setEnd(new Date(d.hackingEnd))
      }
    })
    return unsubscribe
  }, [setStart, setEnd])

  const eventDurationHours = (end.getTime() - start.getTime()) / 1000 / 3600
  const beforeHackingStart = new Date().getTime() < start
  const countDownDate = beforeHackingStart ? start : end
  const eventName = beforeHackingStart ? 'Hacking starts in...' : 'Hacking ends in...'

  return (
    <Countdown
      countDownDate={countDownDate}
      eventName={eventName}
      eventDurationHours={eventDurationHours}
    />
  )
}
