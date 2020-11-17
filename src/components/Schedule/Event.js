import React from 'react'
import styled from 'styled-components'
import { P, H3 } from '../Typography'
import { Card } from '../Common'
import { HOUR_HEIGHT, EVENT_GAP, EVENT_WIDTH, EVENT_TYPES } from './Constants'
import { PositionedTag } from './Tag'

const EventDescription = styled(P)`
  opacity: 0.8;
  margin-bottom: 2em;
`

const EventCard = styled(Card)`
  position: absolute;

  ${p => props =>
    props.delayed
      ? `
      background: linear-gradient(${p.theme.colors.warning}, ${p.theme.colors.background});
    `
      : `
      background-color: ${p.theme.colors.background};
    `}

  margin: 5px;
  padding: ${EVENT_GAP}px 15px;
  width: ${EVENT_WIDTH - 50}px;
  margin-top: ${props => props.timeStart * HOUR_HEIGHT}px;
  height: ${props => props.duration * HOUR_HEIGHT - EVENT_GAP * 4}px;
  overflow-y: scroll;

  & > h3 {
    opacity: 1;
  }
`

const TimeStamp = styled(P)`
  color: ${p => p.theme.colors.linkHover};
`

const formatTime = timeString => {
  const time = new Date(timeString)
  const options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return time.toLocaleDateString('en-US', options)
}

export default ({ event }) => {
  return (
    <EventCard timeStart={event.timeStart} duration={event.duration} delayed={event.delayed}>
      <H3>
        {event.name}
        {event.delayed && ' (DELAYED)'}
      </H3>
      <PositionedTag colour={EVENT_TYPES[event.type].colour}>
        {EVENT_TYPES[event.type].label}
      </PositionedTag>
      <TimeStamp>
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </TimeStamp>
      <EventDescription>{event.description}</EventDescription>
    </EventCard>
  )
}
