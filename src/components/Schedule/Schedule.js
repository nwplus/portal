import React from 'react';
import styled from 'styled-components';
import { Card } from '../Common';
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

const msToHours = ms => ms / 1000 / 60 / 60

const ScheduleColumn = ({ column }) => {
  return (
    <FlexColumn>
      {column.map((event, i) => <Event key={i} event={event} />)}
    </FlexColumn>
  )
}

export default ({ events, hackathonStart, hackathonEnd }) => {
  const produceOptimalSchedule = (events) => {
    const res = []
    let unusedEvents = events;

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
          const duration = msToHours((new Date(event.endTime)) - (new Date(event.startTime)))
          event.duration = duration

          accumulator.push(event)
          usedEvents.push(event)
          latestTime = new Date(event.endTime)
        }
        return accumulator;
      }, [])

      // update unused by removing used events
      unusedEvents = unusedEvents.filter(event => !usedEvents.includes(event))

      // add schedule to columns list
      res.push(sched)
    }
    return res
  }

  const schedule = produceOptimalSchedule(events)
  const durationOfHackathon = msToHours(hackathonEnd - hackathonStart)

  return (
    <Card>
      <TagLegend />
      <ScheduleFlexContainer>
        <TimelineColumn hackathonStart={hackathonStart} duration={durationOfHackathon} />
        {schedule.map((column, i) => <ScheduleColumn key={i} column={column} />)}
      </ScheduleFlexContainer>
    </Card>
  );
}