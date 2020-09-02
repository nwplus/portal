import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { H2 } from '../components/Typography'
import TimeDisplay from '../components/TimeDisplay'
import ProgressBar from '../components/ProgressBar'

export const CenteredCard = styled.div`
  text-align: center;
`

const Countdown = ({ countDownDate, eventDurationHours, eventName }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // calculate ratios
  const diff = Math.max(countDownDate - now, 0); // floor to 0 if in the past
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const rawHours = 24 * days + hours + minutes / 60
  const progress = 1 - (rawHours / eventDurationHours)

  return (
    <CenteredCard>
      <H2>{eventName.toUpperCase()}</H2>
      <TimeDisplay days={days} hours={hours} minutes={minutes} seconds={seconds} />
      <ProgressBar percent={progress * 100} />
    </CenteredCard>
  );
}

export default Countdown