import React from 'react'
import styled from 'styled-components'
import { P, H3 } from '../Typography'
import { Card, ScrollbarLike } from '../Common'
import { HOUR_WIDTH, EVENT_GAP, EVENT_WIDTH, EVENT_TYPES } from './Constants'
import { PositionedTag } from './Tag'

const EventDescription = styled(P)`
  opacity: 0.8;
  margin-bottom: 2em;
  color: ${p => p.theme.colors.schedule.description} !important;
`

const EventCard = styled(Card)`
  position: absolute;
  color: ${p => p.theme.colors.schedule.text};

  ${p =>
    p.delayed &&
    `
    border: 3px solid ${p.theme.colors.secondaryWarning};
    border-radius: 7px;
    background: ${p.theme.colors.card};

    & > h3 {
      color: ${p.theme.colors.secondaryWarning};
    }
  `};

  margin: 5em;
  width: ${EVENT_WIDTH - 50}px;

  &&& {
    padding: ${EVENT_GAP}px 15px;
    margin-left: ${props => props.timeStart * HOUR_WIDTH}px;
    width: ${props => props.duration * HOUR_WIDTH - EVENT_GAP * 4}px;
  }

  // overflow-x: scroll;

  ${ScrollbarLike};

  ::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.colors.primary};
  }

  & > h3 {
    opacity: 1;
    height: 65%;
    color: ${p => p.theme.colors.schedule.text};
  }
`

const TimeStamp = styled(P)`
  color: ${p => p.theme.colors.schedule.timestamp} !important;
`

const StyledH3 = styled(H3)`
  color: ${p => p.theme.colors.schedule.text} !important;
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
  console.log('Formatted Start Time:', formatTime(event.startTime))
  console.log('Original Start Time:', event.startTime)
  console.log('Calculated MarginLeft:', event.startTime * HOUR_WIDTH)
  return (
    <EventCard timeStart={event.timeStart} duration={event.duration} delayed={event.delayed}>
      <StyledH3>
        {event.name}
        {event.delayed && ' (DELAYED)'}
      </StyledH3>
      <PositionedTag color={EVENT_TYPES[event.type].colour}>
        {EVENT_TYPES[event.type].label}
      </PositionedTag>
      <TimeStamp>
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </TimeStamp>
      <EventDescription>{event.description}</EventDescription>
    </EventCard>
  )
}
