import React from 'react'
import styled from 'styled-components'
import { ScrollbarLike } from '../Common'
import { H1 } from '../Typography'
import { EVENT_WIDTH } from './Constants'
import Event from './Event'
import { TagLegend } from './Tag'
import { TimelineColumn } from './Timeline'

// Rotation transformation is done to make the scroll bar on top
const ScrollableContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  transform: rotateX(180deg);
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.colors.secondaryBackground};
    border-radius: 10px;
    border: none;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-corner {
    background-color: ${p => p.theme.colors.secondaryBackground};
  }
  ::-webkit-resizer {
    background-color: ${p => p.theme.colors.secondaryBackground};
  }
`
// Content is upside down due to transformation in ScrollableContainer,
// which needs to be flipped back
const ScheduleFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  transform: rotateX(180deg);
  padding-top: 30px;
`

const FlexColumn = styled.div`
  flex: 0 0 ${EVENT_WIDTH}px;
`

// These styles are a copy of what's in Common.js
// I'm doing this because we're styling Schedule uniquely for cmd-f 2022
// TODO: We should change this back to what it was before this PR
const OverflowContainer = styled.div`
  padding: 2em;
  border-radius: 3px;
  background-color: ${p => p.theme.colors?.schedule?.background};
  margin: 1em 0;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 1em;
    margin: 0.75em 0;
  }
  overflow-x: scroll;
  position: relative;
  ${ScrollbarLike};
`

const msToHours = ms => ms / 1000 / 60 / 60

const Header = styled(H1)`
  margin: 0 0 0 0;
  color: ${p => p.theme.colors.schedule.text};
`

const ScheduleContainer = ({ header, children }) => {
  return (
    <OverflowContainer>
      <Header>{header ?? '\u00A0'}</Header>
      {children}
    </OverflowContainer>
  )
}

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

  return (
    <ScheduleContainer header="Day-Of-Events Schedule">
      <TagLegend />
      <ScrollableContainer>
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
      </ScrollableContainer>
    </ScheduleContainer>
  )
}
