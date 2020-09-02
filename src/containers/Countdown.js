import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { H2 } from '../components/Typography'
import TimeDisplay from '../components/TimeDisplay'

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

  return (
    <CenteredCard>
      <H2>{eventName.toUpperCase()}</H2>
      <TimeDisplay days={days} hours={hours} minutes={minutes} seconds={seconds} />
    </CenteredCard>
  );
}

export default Countdown