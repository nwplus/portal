import React from 'react'
import styled from 'styled-components'
import { CardWithHeader, ScrollbarLike } from '../Common'
import { EVENT_WIDTH } from './Constants'
import { TimelineColumn } from './Timeline'
import { TagLegend } from './Tag'
import Event from './Event'

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
    background-color: #8e7eb4;
    border-radius: 10px;
    border: none;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-corner {
    background-color: #8e7eb4;
  }
  ::-webkit-resizer {
    background-color: #8e7eb4;
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

const OverflowContainer = styled(CardWithHeader)`
  overflow-x: scroll;
  position: relative;
  ${ScrollbarLike};
`

const msToHours = ms => ms / 1000 / 60 / 60

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
          event.duration = duration

          accumulator.push(event)
          usedEvents.push(event)
          latestTime = new Date(event.endTime)
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
    <OverflowContainer header="Day-Of-Events Schedule">
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
    </OverflowContainer>
  )
}
