import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { ScrollbarLike } from '../Common'
import { H2 } from '../Typography'
import { EVENT_GAP } from './Constants'
import Event from './Event'
import { TagLegend } from './Tag'
import { TimelineColumn } from './Timeline'

const ScrollableContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  max-width: 150vh;
  min-height: 80vh;
  padding: 15px;
  position: absolute;
  right: 0;
  left: 0;
  margin-top: 1em;
  border-radius: 10px;
  background: linear-gradient(to right, #244556 85%, #33515e 100%);
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent 50%, #193545 100%);
  }
`

const MobileScrollableContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 150vh;
  min-height: 75vh;
  padding: 15px;
  position: absolute;
  right: 0;
  left: 0;
  margin-top: 1em;
  border-radius: 10px;
  background: #244556;
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent 50%, #193545 100%);
  }
`

const ScheduleFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1em;
  position: relative;
  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
    // align-items: center;
  }
`

const FlexColumn = styled.div`
  margin-top: 2.5em;
  flexdirection: row;
  position: absolute;
  left: 0;
  flex: 0 0 ${EVENT_GAP}px;
  // flex-grow: 1;
`

// These styles are a copy of what's in Common.js
// I'm doing this because we're styling Schedule uniquely for cmd-f 2022
// TODO: We should change this back to what it was before this PR
const OverflowContainer = styled.div`
  padding: 1em;
  border-radius: 3px;
  margin: 1em 0;
  overflow-y: scroll;
  max-width: 100vw;
`

const MobileOverflowContainer = styled.div`
  padding: 1em;
  border-radius: 3px;
  margin: 0.75em 0;
  overflow-y: hidden;
  overflow-x: hidden;
  max-width: 100vw;
`

const msToHours = ms => ms / 1000 / 60 / 60

const Header = styled(H2)`
  margin: 0 0 1.5px 0;
  color: ${p => p.theme.colors.schedule.text};
`

const HeaderContainer = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
    align-items: center;
  }
`

const DayLabel = styled.span`
  position: sticky;
  font-weight: ${p => p.theme.typography.h1.weight};
  font-size: 1.2em;
  transition: opacity 0.5s ease;
  position: absolute;
`

const DayLabelContainer = styled.div`
  position: absolute;
  z-index: 99;
  bottom: -1em;
  left: 2em;
`

const RelativeContainer = styled.div`
  position: relative;
  max-width: 100vw;
  height: auto;
`

const ScheduleColumn = ({ column }) => {
  return (
    <FlexColumn>
      {column.map((event, i) => (
        <Event key={i} event={event} />
      ))}
    </FlexColumn>
  )
}

export default ({ events, hackathonStart, hackathonEnd }) => {
  console.log('hackathonStart prop in Schedule:', hackathonStart)
  console.log('hackathonEnd prop in Schedule:', hackathonEnd)
  // track mobile view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // Define a breakpoint for mobile (e.g., 768px)
  const isMobile = windowWidth <= 768

  const doEventsOverlap = (event1, event2) => {
    const event1Start = new Date(event1.startTime)
    const event1End = new Date(event1.endTime)
    const event2Start = new Date(event2.startTime)
    const event2End = new Date(event2.endTime)

    // Check if event2 starts within event1 and ends before event1 ends
    const startsDuringEvent1 = event2Start >= event1Start && event2End < event1End

    // Check if event2 is completely within event1
    const withinEvent1 = event2Start >= event1Start && event2End <= event1End

    // Check if event2 starts before event1 and ends during it
    const endsDuringEvent1 =
      event2Start < event1Start && event2End > event1Start && event2End <= event1End

    // Check if event2 encompasses event1
    const encompassesEvent1 = event2Start <= event1Start && event2End >= event1End
    // Check if event2 starts during event1 but ends after event1
    const startsWithinButEndsAfter =
      event2Start > event1Start && event2Start < event1End && event2End > event1End

    // Combine all checks
    return (
      startsDuringEvent1 ||
      endsDuringEvent1 ||
      encompassesEvent1 ||
      withinEvent1 ||
      startsWithinButEndsAfter
    )
  }

  const findColumnForEvent = (columns, event) => {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].some(existingEvent => doEventsOverlap(existingEvent, event))) {
        return i
      }
    }
    return -1 // Return -1 to indicate a new column is needed
  }

  const produceOptimalScheduleDesktop = events => {
    const sortedEvents = events.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))

    const columns = sortedEvents.reduce((acc, event) => {
      // Determine the column for the event
      const columnIndex = findColumnForEvent(acc, event)

      // Place the event in the appropriate column or create a new column
      if (columnIndex !== -1) {
        acc[columnIndex].push(event)
      } else {
        acc.push([event])
      }

      // Calculate and assign timeStart and duration for the event
      const eventStart = new Date(event.startTime)
      const duration = msToHours(new Date(event.endTime) - eventStart) || 0.5 // Default to 0.5 hours if duration is 0
      const timeStart = msToHours(eventStart - hackathonStart)

      event.timeStart = timeStart
      event.duration = duration

      return acc
    }, []) // Start with an empty array of columns

    return columns
  }

  const produceOptimalScheduleMobile = events => {
    const sortedEvents = events.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))

    // Calculate and assign timeStart and duration for each event
    sortedEvents.forEach(event => {
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)
      const duration = msToHours(eventEnd - eventStart) || 0.5 // Default to 0.5 hours if duration is 0
      const timeStart = msToHours(eventStart - hackathonStart)

      event.timeStart = timeStart
      event.duration = duration
    })

    // Since it's a single-column layout, all events can be in one column
    return [sortedEvents] // Wrapping sortedEvents in an array to match the expected format
  }

  const schedule = isMobile
    ? produceOptimalScheduleMobile(events)
    : produceOptimalScheduleDesktop(events)
  console.log('Scheduled Events:', schedule)
  const durationOfHackathon = Math.min(msToHours(hackathonEnd - hackathonStart), 48)

  // track scroll position for timeline label fade (!isMobile)
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = e => {
    setScrollPosition(e.currentTarget.scrollLeft)
  }
  const [midnightPosition, setMidnightPosition] = useState(0)
  const handleMidnightPositionChange = position => {
    setMidnightPosition(position)
  }
  const isSunday = scrollPosition >= midnightPosition

  return (
    <RelativeContainer>
      {!isMobile ? (
        <OverflowContainer>
          <HeaderContainer>
            <Header>Day-Of-Events Schedule</Header>
            <TagLegend />
          </HeaderContainer>
          <DayLabelContainer>
            <DayLabel style={{ opacity: isSunday ? 0 : 1 }}>Saturday</DayLabel>
            <DayLabel style={{ opacity: isSunday ? 1 : 0 }}>Sunday</DayLabel>
          </DayLabelContainer>
          <ScrollableContainer onScroll={handleScroll}>
            <ScheduleFlexContainer>
              <TimelineColumn
                hackathonStart={hackathonStart}
                duration={durationOfHackathon}
                numCols={schedule.length}
                onMidnightPositionChange={handleMidnightPositionChange}
                scrollPosition={scrollPosition}
                midnightPosition={midnightPosition}
              />
              {schedule.map((column, i) => (
                <ScheduleColumn key={i} column={column} />
              ))}
            </ScheduleFlexContainer>
          </ScrollableContainer>
        </OverflowContainer>
      ) : (
        <MobileOverflowContainer>
          <HeaderContainer>
            <Header>Day-Of-Events Schedule</Header>
            <TagLegend />
          </HeaderContainer>
          <MobileScrollableContainer>
            <ScheduleFlexContainer>
              <TimelineColumn
                hackathonStart={hackathonStart}
                duration={durationOfHackathon}
                numCols={schedule.length}
              />
              {schedule.map((column, i) => (
                <ScheduleColumn key={i} column={column} />
              ))}
            </ScheduleFlexContainer>
          </MobileScrollableContainer>
        </MobileOverflowContainer>
      )}
    </RelativeContainer>
  )
}
