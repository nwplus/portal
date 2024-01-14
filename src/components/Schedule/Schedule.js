import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { ScrollbarLike } from '../Common'
import { H2 } from '../Typography'
import { EVENT_GAP, MOBILE_HOUR_HEIGHT } from './Constants'
import Event from './Event'
import { TagLegend } from './Tag'
import { TimelineColumn } from './Timeline'

const ScrollableContainer = styled.div`
  ${ScrollbarLike}
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
  overflow-x: auto;
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
  &:after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent 80%, #193545 100%);
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
  flex-direction: row;
  position: absolute;
  left: 0;
  flex: 0 0 ${EVENT_GAP}px;
`

const MobileFlexColumn = styled.div`
  flex-direction: row;
  position: absolute;
  left: 0;
  flex: 0 0 ${EVENT_GAP}px;
  align-items: center;
`

// These styles are a copy of what's in Common.js
// I'm doing this because we're styling Schedule uniquely for cmd-f 2022
// TODO: We should change this back to what it was before this PR
const OverflowContainer = styled.div`
  padding: 1em;
  border-radius: 3px;
  margin: 1em 0;
  max-width: 100vw;
`

const MobileOverflowContainer = styled.div`
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

const MobileScheduleColumn = ({ column, hackathonStart, cumulativeHeight }) => {
  // Memoize the calculation of topMargin
  const topMargin = useMemo(() => {
    const baseMargin =
      column.events.length > 0
        ? msToHours(new Date(column.events[0].startTime) - hackathonStart) * MOBILE_HOUR_HEIGHT + 50
        : 0
    return baseMargin + cumulativeHeight + EVENT_GAP * 2
  }, [column.events, hackathonStart, cumulativeHeight]) // Dependencies

  return (
    <MobileFlexColumn style={{ marginTop: `${topMargin}px` }}>
      {column.events.map((event, i) => (
        <Event key={i} event={event} />
      ))}
    </MobileFlexColumn>
  )
}

export default ({ events, hackathonStart, hackathonEnd }) => {
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
    const columns = sortedEvents.reduce((acc, event) => {
      // Get the start hour block for the event
      const eventStart = new Date(event.startTime)
      eventStart.setMinutes(0, 0, 0) // Reset minutes and seconds to zero for the hour block
      // Find a column for the same hour block or create a new one
      let column = acc.find(col => col.hourBlock.getTime() === eventStart.getTime())

      if (!column) {
        // Create a new column block if none exist for this hour block
        column = {
          hourBlock: eventStart,
          events: [],
          topMargin: msToHours(eventStart - hackathonStart) * MOBILE_HOUR_HEIGHT,
          eventCount: 0,
        }
        acc.push(column)
      }

      // Add the event to the column and update the event count
      column.events.push(event)
      column.eventCount += 1

      // Calculate and assign timeStart and duration for the event
      const timeStart = msToHours(eventStart - hackathonStart)

      event.timeStart = timeStart

      return acc
    }, []) // Start with an empty array for columns
    // After all events are processed, map to the structure we want to return
    return columns.map(col => ({
      hourBlock: col.hourBlock,
      topMargin: col.topMargin,
      eventCount: col.eventCount,
      events: col.events,
    }))
  }

  const mobileSchedule = produceOptimalScheduleMobile(events)
  const schedule = produceOptimalScheduleDesktop(events)
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
  let cumulativeHeight = 0
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
                schedule={mobileSchedule}
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
                schedule={mobileSchedule}
              />

              {mobileSchedule.map((column, i) => {
                const topMargin = cumulativeHeight
                const columnHeight = (column.eventCount - 1) * MOBILE_HOUR_HEIGHT
                cumulativeHeight += columnHeight

                return (
                  <MobileScheduleColumn
                    key={i}
                    column={column}
                    hackathonStart={hackathonStart}
                    cumulativeHeight={topMargin}
                  />
                )
              })}
            </ScheduleFlexContainer>
          </MobileScrollableContainer>
        </MobileOverflowContainer>
      )}
    </RelativeContainer>
  )
}
