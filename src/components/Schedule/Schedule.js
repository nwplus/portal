import React from 'react'
import styled from 'styled-components'
import { Card, ScrollbarLike } from '../Common'
import { EVENT_WIDTH } from './Constants'
import { TimelineColumn } from './Timeline'
import { TagLegend } from './Tag'
import Event from './Event'

const ScheduleFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexColumn = styled.div`
  flex: 0 0 ${EVENT_WIDTH}px;
`

const OverflowContainer = styled(Card)`
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
  console.log(durationOfHackathon)

  return (
    <OverflowContainer>
      <TagLegend />
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
    </OverflowContainer>
  )
}
