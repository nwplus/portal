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
  max-height: ${props => (props.expanded ? `${props.maxHeight}px` : '4.5em')};
  transition: max-height 0.3s ease;
  ${p => p.theme.mediaQueries.mobile} {
    overflow-y: auto;
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
  z-index: 3;
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

    const clampLines = 3

    const measureFullHeight = node => {
      const clone = node.cloneNode(true)
      // keep same wrapping so measurement matches on-card layout
      clone.style.width = `${node.clientWidth}px`
      clone.style.position = 'absolute'
      clone.style.visibility = 'hidden'
      clone.style.pointerEvents = 'none'
      clone.style.maxHeight = 'none'
      clone.style.webkitLineClamp = 'unset'
      clone.style.display = 'block'
      clone.style.boxSizing = 'border-box'
      document.body.appendChild(clone)
      const h = clone.scrollHeight
      document.body.removeChild(clone)
      return h
    }

    const checkOverflow = () => {
      const style = getComputedStyle(el)
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2
      const allowedHeight = lineHeight * clampLines
      const fullHeight = measureFullHeight(el)
      const isOverflowed = fullHeight >= Math.ceil(allowedHeight)
      setShowToggleButton(isOverflowed)
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

    // when expanded, measure and set the full pixel height (with a small buffer)
    // to ensure the animated max-height is never slightly short of the content.
    const HEIGHT_BUFFER = 6 // extra pixels to avoid 1-2px clipping on some browsers
    const setMeasuredHeightWhenExpanded = () => {
      if (!expanded) return
      // measure via clone to avoid mutating the live node
      const fullHeight = measureFullHeight(el)
      // add a small buffer so rounding doesn't clip the last line
      setMaxHeight(fullHeight + HEIGHT_BUFFER)
    }

    // set measured height initially if already expanded
    const rafSetHeight = requestAnimationFrame(setMeasuredHeightWhenExpanded)

    const onResize = () => checkOverflow()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(rafSetHeight)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [event.description, expanded])

  const toggleExpanded = () => {
    setExpanded(prev => !prev)
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
