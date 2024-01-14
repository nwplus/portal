import React, { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { EVENT_GAP, EVENT_WIDTH, HOUR_WIDTH, MOBILE_HOUR_HEIGHT } from './Constants'

const TimelineColumnContainer = styled.div`
  flex: 0 0 100px;
  display: flex;
  flex-direction: row;
  height: 75vh;
  position: absolute;
  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column; // vertical layout for mobile
    height: auto;
    width: auto;
  }
`

const ScheduleHR = css`
  height: max(${props => props.widthMultiplier * EVENT_WIDTH + EVENT_GAP * 2}px, 70vw);
  display: inline-block;
  width: ${HOUR_WIDTH}px;
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
`

const CurrentTimeHR = styled.hr`
  ${ScheduleHR}
  position: absolute;
  margin-top: 3.5em;
  border: 0;
  border-right: 2px solid ${p => p.theme.colors.error};
  height: 200%;
`

const TimelineLabel = styled.span`
  position: relative;
  font-weight: 600;
`

const MobileTimelineColumnContainer = styled.div`
  flex: 0 0 100px;
  display: flex;
  flex-direction: column;
  height: auto;
  position: absolute;
  width: 100%;
`

const MobileScheduleHR = css`
  height: ${MOBILE_HOUR_HEIGHT + EVENT_GAP}px;
  display: inline-block;
`
const MobileTimelineBlock = styled.div`
  ${MobileScheduleHR}
  margin-top: 0;
  height: ${props => props.height}px;
`

const MobileTimelineHR = styled.hr`
  ${MobileScheduleHR}
  border: 0;
  border-top: 1px solid #8e7eb4;
  width: 75%;
  opacity: 50%;
  margin-left: 4em;
`

const MobileCurrentTimeHR = styled.hr`
  ${MobileScheduleHR}
  position: absolute;
  border: 0;
  height: 100%;
  opacity: 50%;
  border-bottom: 2px solid ${p => p.theme.colors.error};
`

const MobileTimelineLabel = styled.span`
  position: relative;
  font-size: 0.75em;
  font-weight: 600;
  top: 1.5em;
`

const MobileDayLabel = styled.span`
  font-weight: ${p => p.theme.typography.h1.weight};
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
        window.scrollTo({ left: scrollHeight, behavior: 'smooth' })
        setScrolled(true)
      }, 500)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [scrolled, hoursBetweenNowAndStart])
  console.log(hoursBetweenNowAndStart)
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
  schedule,
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
  return isMobile ? (
    <MobileTimelineColumnContainer>
      <MobileCurrentTimeHR start={hackathonStart} duration={duration} numCols={numCols} />
      {[...Array(duration)].map((v, i) => {
        // Calculate the start time for each hour block
        let hourStartTime = new Date(hackathonStart.getTime() + i * 60 * 60 * 1000)
        hourStartTime.setMinutes(0, 0, 0) // Reset minutes and seconds to align with hour blocks

        // Find the matching hour block in mobileSchedule
        const hourBlock = schedule.find(
          block => block.hourBlock.getTime() === hourStartTime.getTime()
        )

        console.log(hourBlock)

        // Calculate the height based on the number of events
        const blockHeight = hourBlock
          ? MOBILE_HOUR_HEIGHT * hourBlock.eventCount
          : MOBILE_HOUR_HEIGHT

        console.log(blockHeight) // correct

        const labelTime = new Date(hackathonStart.getTime() + i * 60 * 60 * 1000)
        const label = labelTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        return (
          <MobileTimelineBlock key={i} height={blockHeight}>
            <MobileTimelineLabel hourOffset={i}>
              {i === 0 && <MobileDayLabel>Saturday</MobileDayLabel>}
              {label === '12:00 AM' && <MobileDayLabel>Sunday</MobileDayLabel>}
              <br />
              {label}
            </MobileTimelineLabel>
            <br />
            <MobileTimelineHR hourOffset={i} />
          </MobileTimelineBlock>
        )
      })}
    </MobileTimelineColumnContainer>
  ) : (
    <TimelineColumnContainer duration={duration}>
      <CurrentTime start={hackathonStart} duration={duration} numCols={numCols} />
      {[...Array(duration)].map((v, i) => {
        const labelTime = new Date(hackathonStart.getTime() + i * 60 * 60 * 1000)
        const label = labelTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        return (
          <TimelineBlock key={i} ref={label === '12:00 AM' ? midnightRef : null}>
            <TimelineLabel hourOffset={i}>{label}</TimelineLabel>
            <TimelineHR hourOffset={i} widthMultiplier={numCols} />
          </TimelineBlock>
        )
      })}
    </TimelineColumnContainer>
  )
}
