import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { P, H3 } from '../Typography'
import { Card, ScrollbarLike } from '../Common'
import { HOUR_WIDTH, EVENT_GAP, EVENT_TYPES, MOBILE_HOUR_HEIGHT } from './Constants'
import { PositionedTag } from './Tag'
import expandButton from '../../assets/expand_icon.svg'

const EventDescription = styled(P)`
  opacity: 0.8;
  color: ${p => p.theme.colors.schedule.description} !important;
  overflow: ${props => (props.expanded ? 'visible' : 'hidden')};
  max-height: ${props => (props.expanded ? 'none' : '4.5em')};
  transition: max-height 0.3s ease;
  display: ${props => (props.expanded ? 'block' : '-webkit-box')};
  webkitlineclamp: ${props => (props.expanded ? 'none' : '3')};
  webkitboxorient: 'vertical';
  ${p => p.theme.mediaQueries.mobile} {
    overflow-y: scroll;
    ${ScrollbarLike}
  }
`

const EventLocation = styled(P)`
  opacity: 0.5;
  margin: 0;
  margin-bottom: 0.5em;
  font-style: italic;
  color: ${p => p.theme.colors.schedule.description} !important;
`

const ToggleButton = styled.button`
  background-image: url(${expandButton});
  background-color: transparent;
  border: none;
  position: absolute;
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-size: contain;
  background-repeat: no-repeat;
  transform: ${props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
  right: 15px;
  bottom: 15px;
  ${p => p.theme.mediaQueries.mobile} {
    display: none;
  }
`

const EventCard = styled(Card)`
  position: relative;
  color: ${p => p.theme.colors.schedule.text};
  transition: max-height 0.3s ease;
  max-height: ${props => (props.isExpanded ? '1000px' : '200px')};
  margin: 1em;

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
  &&& {
    padding: ${EVENT_GAP}px 15px;
    margin-left: ${props => props.timeStart * HOUR_WIDTH + EVENT_GAP * 2}px;
    width: ${props => props.duration * HOUR_WIDTH - EVENT_GAP * 4}px;
    ${p => p.theme.mediaQueries.mobile} {
      position: relative;
      margin-left: 0;
      margin-right: 0;
      margin-top: -0.5em;
      width: 100%;
      height: ${MOBILE_HOUR_HEIGHT - EVENT_GAP} px;
    }
  }

  & > h3 {
    opacity: 1;
    height: 65%;
    color: ${p => p.theme.colors.schedule.text};
  }
`

const TimeStamp = styled(P)`
  color: ${p => p.theme.colors.schedule.timestamp} !important;
  margin: 0;
`

const StyledH3 = styled(H3)`
  color: ${p => p.theme.colors.schedule.text} !important;
  margin: 0;
  margin-top: 1em;
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
  const [expanded, setExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)
  const [showToggleButton, setShowToggleButton] = useState(false)
  const descriptionRef = useRef(null)

  useEffect(() => {
    if (descriptionRef.current) {
      const isOverflowing =
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      setShowToggleButton(isOverflowing)
    }
  }, [descriptionRef, event.description])

  const toggleExpanded = () => {
    setExpanded(!expanded)
    if (!expanded) {
      setMaxHeight(descriptionRef.current.scrollHeight)
    }
  }
  console.log('Formatted Start Time:', formatTime(event.startTime))
  console.log('Original Start Time:', event.startTime)
  console.log('Calculated MarginLeft:', event.timeStart * HOUR_WIDTH)
  console.log('ORIGINAL duration:', event.duration)
  console.log('Calculated duration:', event.duration * HOUR_WIDTH)
  return (
    <EventCard
      timeStart={event.timeStart}
      duration={event.duration}
      delayed={event.delayed}
      isExpanded={expanded}
      cumulativeOffset={event.cumulativeOffset}
    >
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
      <EventLocation>{event.location}</EventLocation>
      <EventDescription ref={descriptionRef} expanded={expanded} maxHeight={maxHeight}>
        {event.description}
      </EventDescription>
      {showToggleButton && <ToggleButton onClick={toggleExpanded} expanded={expanded} />}
    </EventCard>
  )
}
