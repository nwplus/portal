import React, { useState, useEffect } from 'react'
import Countdown from './Countdown'
import { livesiteDocRef } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'

const HackerCountdown = () => {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const { activeHackathon } = useHackathon()

  useEffect(() => {
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const d = doc.data()
      if (d) {
        const hackingStart = new Date(d.hackingStart[activeHackathon])
        const hackingEnd = new Date(d.hackingEnd[activeHackathon])
        setStart(hackingStart)
        setEnd(hackingEnd)
      }
    })
    return unsubscribe
  }, [activeHackathon])

  const now = new Date()

  const beforeHackingStart = now < start
  const countDownDate = beforeHackingStart ? start : end
  const eventName = beforeHackingStart ? 'Hacking starts in...' : 'Hacking ends in...'

  return <Countdown countDownDate={countDownDate} eventName={eventName} />
}

export default HackerCountdown
