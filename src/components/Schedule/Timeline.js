import React from 'react'
import styled from 'styled-components'
import { HOUR_HEIGHT, EVENT_GAP, EVENT_WIDTH } from './Constants'

const TimelineColumnContainer = styled.div`
  flex: 0 0 100px;
  height: ${props => props.duration * HOUR_HEIGHT - 20}px;
`

const TimelineBlock = styled.div`
  position: absolute;
  transform: translateY(-${EVENT_GAP}px);
`

const TimelineHR = styled.hr`
  display: inline-block;
  width: max(${props => props.widthMultiplier * EVENT_WIDTH + EVENT_GAP * 2}px, 70vw);
  margin-left: 5em;
  margin-top: ${props => props.hourOffset * HOUR_HEIGHT}px;
  border: 0;
  border-bottom: 1px dashed ${p => p.theme.colors.foreground};
`

const TimelineLabel = styled.span`
  padding-right: 1em;
  position: absolute;
  width: 5em;
  margin-top: ${props => props.hourOffset * HOUR_HEIGHT - EVENT_GAP * 1.5}px;
`

export const TimelineColumn = ({ hackathonStart, duration, numCols }) => {
  duration = Math.floor(Math.max(0, duration))
  return (
    <TimelineColumnContainer duration={duration}>
      {[...Array(duration)].map((v, i) => {
        const labelTime = new Date(hackathonStart.getTime() + i * 60 * 60 * 1000)
        const label = labelTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        return (
          <TimelineBlock key={i}>
            <TimelineLabel hourOffset={i}>{label}</TimelineLabel>
            <TimelineHR hourOffset={i} widthMultiplier={numCols} />
          </TimelineBlock>
        )
      })}
    </TimelineColumnContainer>
  )
}
