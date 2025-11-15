import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { P, H3 } from '../Typography'
import { Card, ScrollbarLike } from '../Common'
import { HOUR_WIDTH, EVENT_GAP, EVENT_TYPES, MOBILE_HOUR_HEIGHT } from './Constants'
import { PositionedTag } from './Tag'
import expandButton from '../../assets/expand_icon.svg'
import { useTheme } from 'styled-components'

const EventDescription = styled(P)`
  opacity: 0.8;
  color: ${p => p.theme.colors.schedule.description} !important;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.expanded ? 'unset' : '3')};
  -webkit-box-orient: vertical;
  max-height: ${props => (props.expanded ? 'none' : '4.5em')};
  transition: max-height 0.3s ease;
  ${p => p.theme.mediaQueries.mobile} {
    overflow-y: scroll;
    ${ScrollbarLike}
  }
`

const EventLocation = styled(P)`
  margin: 0;
  margin-bottom: 0.5em;
  font-style: italic;
`

const Points = styled(P)`
  margin: 0;
  margin-top: -0.5em;
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
  background: ${p => p.theme.colors.backgroundTertiary};

  ${p =>
    p.delayed &&
    `
    border: 3px solid ${p.theme.colors.error};
    border-radius: 7px;

    & > h3 {
      color: ${p.theme.colors.error};
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
      height: ${MOBILE_HOUR_HEIGHT - EVENT_GAP}px;
    }
  }

  & > h3 {
    opacity: 1;
    height: 65%;
    color: ${p => p.theme.colors.schedule.text};
  }
`

const TimeStamp = styled(P)`
  color: ${p => p.theme.colors.textSecondary} !important;
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
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return time.toLocaleString('en-US', options)
}

const Event = ({ event }) => {
  const [expanded, setExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)
  const [showToggleButton, setShowToggleButton] = useState(false)
  const descriptionRef = useRef(null)
  const theme = useTheme()

  useLayoutEffect(() => {
    const el = descriptionRef.current
    if (!el) return

    const checkOverflow = () => {
      setShowToggleButton(el.scrollHeight > el.clientHeight)
    }

    // initial check on next paint
    const rafId = requestAnimationFrame(checkOverflow)

    // re-check when the element or its parent resizes (fonts, layout, CSS)
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(checkOverflow)
      ro.observe(el)
      if (el.parentElement) ro.observe(el.parentElement)
    }

    // re-check after fonts load (if supported)
    if (document?.fonts && document.fonts.ready) {
      document.fonts.ready.then(checkOverflow).catch(() => {})
    }

    const onResize = () => checkOverflow()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [event.description, expanded])

  const toggleExpanded = () => {
    setExpanded(!expanded)
    if (!expanded) {
      setMaxHeight(descriptionRef.current.scrollHeight)
    }
  }

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
      <PositionedTag color={EVENT_TYPES(theme)[event.type].colour}>
        {EVENT_TYPES(theme)[event.type].label}
      </PositionedTag>
      <TimeStamp>
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </TimeStamp>
      <EventLocation>{event.location}</EventLocation>
      {/* <Points>{event.points && `Points: ${event.points}`}</Points> */}
      <EventDescription ref={descriptionRef} expanded={expanded} maxHeight={maxHeight}>
        {event.description}
      </EventDescription>
      {showToggleButton && <ToggleButton onClick={toggleExpanded} expanded={expanded} />}
    </EventCard>
  )
}

export default Event
