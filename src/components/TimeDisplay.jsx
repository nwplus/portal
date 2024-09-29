import React from 'react'
import styled from 'styled-components'

const TimeContainer = styled.div`
  margin: 0;
  text-align: center;
  font-weight: 600;
`

const TimeText = styled.span`
  color: ${p => p.theme.colors.text};
  font-family: ${p => p.theme.typography.headerFont};
  width: ${p => (p.value >= 100 ? '135px' : '90px')};
  font-size: 3em;
  ${p => p.theme.mediaQueries.tabletLarge} {
    font-size: 2em;
  }
  ${p => p.theme.mediaQueries.mobile} {
    font-size: 4em;
  }
`

const TimeUnitText = styled(TimeText)`
  font-size: 1em;
  margin: 0 10px;
  width: ${p => (p.value >= 100 ? '135px' : '90px')};
  ${p => p.theme.mediaQueries.mobile} {
    font-size: 2em;
  }
`

const Separator = styled.span`
  width: 20px;
  font-size: 3em;
`

const TimeFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${p => p.theme.mediaQueries.mobile} {
    font-size: 0.5em;
  }
`

const TimeDisplay = ({ days, hours, minutes, seconds }) => {
  function fmt(time) {
    return time >= 100 ? time.toString() : ('0' + time).slice(-2)
  }

  return (
    <TimeContainer>
      <TimeFlex>
        <TimeText value={days}>{fmt(days)}</TimeText>
        <Separator>:</Separator>
        <TimeText value={hours}>{fmt(hours)}</TimeText>
        <Separator>:</Separator>
        <TimeText value={minutes}>{fmt(minutes)}</TimeText>
        <Separator>:</Separator>
        <TimeText value={seconds}>{fmt(seconds)}</TimeText>
      </TimeFlex>
      <TimeFlex>
        <TimeUnitText value={days}>{days === 1 ? 'day' : 'days'}</TimeUnitText>
        <TimeUnitText value={hours}>hr</TimeUnitText>
        <TimeUnitText value={minutes}>min</TimeUnitText>
        <TimeUnitText value={seconds}>sec</TimeUnitText>
      </TimeFlex>
    </TimeContainer>
  )
}

export default TimeDisplay
