import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import { H2 } from '../components/Typography'
import TimeDisplay from '../components/TimeDisplay'

export const Centered = styled.div`
  text-align: center;
  z-index: 99;
`

const Countdown = ({ countDownDate, eventName, theme }) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // calculate ratios
  const diff = Math.max(countDownDate - now, 0) // floor to 0 if in the past
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return (
    <Centered>
      <H2>{eventName.toUpperCase()}</H2>
      <TimeDisplay days={days} hours={hours} minutes={minutes} seconds={seconds} />
      {/* <ProgressBar percent={progress * 100} /> */}
    </Centered>
  )
}

export default withTheme(Countdown)
