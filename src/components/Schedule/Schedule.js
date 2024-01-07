import React, { useState } from 'react'
import styled from 'styled-components'
import { ScrollbarLike } from '../Common'
import { H1, H2 } from '../Typography'
import { EVENT_WIDTH } from './Constants'
import Event from './Event'
import { TagLegend } from './Tag'
import { TimelineColumn } from './Timeline'

// Rotation transformation is done to make the scroll bar on top
const ScrollableContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 150vh;
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

// Content is upside down due to transformation in ScrollableContainer,
// which needs to be flipped back
const ScheduleFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  position: relative;
`

const FlexColumn = styled.div`
  position: absolute;
  flex: 0 0 ${EVENT_WIDTH}px;
  // max-width: 100%;
`

// These styles are a copy of what's in Common.js
// I'm doing this because we're styling Schedule uniquely for cmd-f 2022
// TODO: We should change this back to what it was before this PR
const OverflowContainer = styled.div`
  padding: 1em;
  border-radius: 3px;
  // background-color: ${p => p.theme.colors?.schedule?.background};
  margin: 1em 0;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 1em;
    margin: 0.75em 0;
  }
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
`

const ScheduleContainer = styled.div`
  padding: 2em;
  border-radius: 10px;
  background-color: #244556;
  margin: 1em 0;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 1em;
    margin: 0.75em 0;
  }
`

const RelativeContainer = styled.div`
  position: relative;
  max-width: 100vw;
  height: auto;
  // height: 100%;
  // width: 100%;
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
  const produceOptimalSchedule = events => {
    const columns = []
    let unusedEvents = events

    // build optimal columns list while there are still events that
    // are not in the schedule
    while (unusedEvents.length > 0) {
      let latestTime = new Date(0) // epoch time lmao
      let usedEvents = []

      // produce optimal schedule and track which events are used
      const sched = unusedEvents.reduce((accumulator, event, i) => {
        const curTime = new Date(event.startTime)
        if (curTime.getTime() >= latestTime.getTime()) {
          // set offset as number of hours between start of hackathon and this event
          const hoursFromStart = msToHours(curTime - hackathonStart)
          event.timeStart = hoursFromStart

          // set duration of event
          const duration = msToHours(new Date(event.endTime) - new Date(event.startTime))
          const isZeroDurationEvent = duration === 0

          // if zero duration event, set event duration to be 0.5 (30 minutes) because 0 duration events end up being too tall
          event.duration = isZeroDurationEvent ? 0.5 : duration

          accumulator.push(event)
          usedEvents.push(event)

          let newLatestTime = new Date(event.endTime)

          // if zero duration event, set new latestTime = latestTime + 30 to avoid overlaps
          latestTime = isZeroDurationEvent
            ? new Date(newLatestTime.setMinutes(newLatestTime.getMinutes() + 30))
            : newLatestTime
        }
        return accumulator
      }, [])

      // update unused by removing used events
      unusedEvents = unusedEvents.filter(event => !usedEvents.includes(event))

      // add schedule to columns list
      columns.push(sched)
    }
    return columns
  }

  const schedule = produceOptimalSchedule(events)
  const durationOfHackathon = Math.min(msToHours(hackathonEnd - hackathonStart), 48)

  // track scroll position for timeline label fade
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = e => {
    setScrollPosition(e.currentTarget.scrollLeft)
  }
  const [midnightPosition, setMidnightPosition] = useState(0)
  const handleMidnightPositionChange = position => {
    setMidnightPosition(position)
  }

  return (
    <RelativeContainer>
      <OverflowContainer>
        <HeaderContainer>
          <Header>Day-Of-Events Schedule</Header>
          <TagLegend />
        </HeaderContainer>
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
    </RelativeContainer>
  )
}
