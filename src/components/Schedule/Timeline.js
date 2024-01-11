import React, { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { EVENT_GAP, EVENT_WIDTH, HOUR_WIDTH } from './Constants'

const TimelineColumnContainer = styled.div`
  flex: 0 0 100px;
  display: flex;
  flex-direction: row;
  height: 75vh;
  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column; // vertical layout for mobile
    height: auto;
    width: 100%;
  }
`

const ScheduleHR = css`
  height: max(${props => props.widthMultiplier * EVENT_WIDTH + EVENT_GAP * 2}px, 70vw);
  display: inline-block;
  width: ${HOUR_WIDTH}px;
  ${p => p.theme.mediaQueries.mobile} {
    height: ${HOUR_WIDTH}px;
  }
`
const TimelineBlock = styled.div`
  ${ScheduleHR}
  margin-top: 1.5em;
`

const TimelineHR = styled.hr`
  ${ScheduleHR}
  border: 0;
  border-top: 1px solid #8e7eb4;
  border-right: 1px solid #8e7eb4;
  opacity: 50%;
  ${p => p.theme.mediaQueries.mobile} {
    border-right: 0;
  }
`

const CurrentTimeHR = styled.hr`
  ${ScheduleHR}
  position: absolute;
  border: 0;
  border-right: 2px solid ${p => p.theme.colors.error};
  height: 100%;
  opacity: 50%;
  ${p => p.theme.mediaQueries.mobile} {
    border-bottom: 2px solid ${p => p.theme.colors.error};
  }
`

const TimelineLabel = styled.span`
  position: relative;
  font-weight: 600;
`

const MobileDayLabel = styled.span`
  font-weight: ${p => p.theme.typography.h1.weight};
  font-size: 1.2em;
  display: inline;
`

const CurrentTime = ({ start, duration, numCols }) => {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [scrolled, setScrolled] = useState(false)
  const hoursBetweenNowAndStart = (currentTime - start) / 60 / 60 / 1000
  const renderCurrentTime = 0 < hoursBetweenNowAndStart && hoursBetweenNowAndStart < duration

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // Scroll to where the current time indicator is
  // I use a timeout because for some reason window initially thinks its height is short, so
  // the scroll maxes out at this point. Obviously we don't want to, so a small timeout here.
  useEffect(() => {
    if (!scrolled && hoursBetweenNowAndStart > 1) {
      const timeout = setTimeout(() => {
        const scrollHeight = 72 + hoursBetweenNowAndStart * HOUR_WIDTH
        window.scrollTo({ top: scrollHeight, behavior: 'smooth' })
        setScrolled(true)
      }, 500)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [scrolled, hoursBetweenNowAndStart])

  return (
    renderCurrentTime && (
      <CurrentTimeHR hourOffset={hoursBetweenNowAndStart} widthMultiplier={numCols} />
    )
  )
}

export const TimelineColumn = ({
  hackathonStart,
  duration,
  numCols,
  onMidnightPositionChange,
  scrollPosition,
  midnightPosition,
}) => {
  duration = Math.floor(Math.max(0, duration))
  //ref for Saturday -> Sunday fade.
  const midnightRef = useRef(null)
  useEffect(() => {
    if (midnightRef.current) {
      const position = midnightRef.current.offsetLeft
      onMidnightPositionChange(position)
    }
  }, [midnightRef, onMidnightPositionChange])

  // track mobile view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Define a breakpoint for mobile (e.g., 768px)
  const isMobile = windowWidth <= 768
  return (
    <TimelineColumnContainer duration={duration}>
      <CurrentTime start={hackathonStart} duration={duration} numCols={numCols} />
      {[...Array(duration)].map((v, i) => {
        const labelTime = new Date(hackathonStart.getTime() + i * 60 * 60 * 1000)
        const label = labelTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        return !isMobile ? (
          <TimelineBlock key={i} ref={label === '12:00 AM' ? midnightRef : null}>
            <TimelineLabel hourOffset={i}>{label}</TimelineLabel>
            <TimelineHR hourOffset={i} widthMultiplier={numCols} />
          </TimelineBlock>
        ) : // Nested conditional rendering for mobile layout
        i === 0 ? (
          <TimelineBlock key={i}>
            <TimelineLabel hourOffset={i}>
              <MobileDayLabel>January 20th, 2024</MobileDayLabel>
              <br />
              {label}
            </TimelineLabel>
            <br />
            <TimelineHR hourOffset={i} widthMultiplier={numCols} />
          </TimelineBlock>
        ) : label === '12:00 AM' ? (
          <TimelineBlock key={i}>
            <TimelineLabel hourOffset={i}>
              <MobileDayLabel>January 21, 2024</MobileDayLabel>
              <br />
              {label}
            </TimelineLabel>
            <br />
            <TimelineHR hourOffset={i} widthMultiplier={numCols} />
          </TimelineBlock>
        ) : (
          <TimelineBlock key={i}>
            <TimelineLabel hourOffset={i}>{label}</TimelineLabel>
            <TimelineHR hourOffset={i} widthMultiplier={numCols} />
          </TimelineBlock>
        )
      })}
    </TimelineColumnContainer>
  )
}
