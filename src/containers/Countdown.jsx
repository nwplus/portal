import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import { H2 } from '../components/Typography'
import TimeDisplay from '../components/TimeDisplay'

export const Centered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5%;
  padding: 16px 0;
  z-index: 99;

  position: relative;
  width: calc(100% + 100px);
  left: -50px;
  top: -24px; // the parent component has a padding top of 24px

  background: ${p => p.theme.colors.sidebar.backgroundSecondary};

  ${p => p.theme.mediaQueries.tabletLarge} {
    flex-direction: column;
    padding: 0;
    width: 100%;

    left: 0;
    top: -8px; // the parent component has a padding top of 8px

    background: none;
    width: calc(100% + 40px);
    left: -20px;
    top: -8px;
  }
`

const StyledH2 = styled(H2)`
  opacity: 1;
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
      <StyledH2>{eventName.toUpperCase()}</StyledH2>
      <TimeDisplay days={days} hours={hours} minutes={minutes} seconds={seconds} />
      {/* <ProgressBar percent={progress * 100} /> */}
    </Centered>
  )
}

export default withTheme(Countdown)
