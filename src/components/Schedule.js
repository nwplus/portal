import React from 'react';
import styled from 'styled-components';
import { Card } from './Common';
import { P, H3 } from './Typography';

const HOUR_HEIGHT = 150
const EVENT_GAP = 10

const ScheduleFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: ${props => (props.duration * HOUR_HEIGHT) - 20}px;
`

const ScheduleColumn = styled.div`
  flex: 0 0 400px;
  height: auto;
`

const EventCard = styled(Card)`
  position: absolute;
  background-color: ${p => p.theme.colors.foreground};
  margin: 5px;
  padding: ${EVENT_GAP}px 15px;
  width: 350px;
  margin-top: ${props => (props.hourOffset * HOUR_HEIGHT)}px;
  height: ${props => (props.duration * HOUR_HEIGHT) - (EVENT_GAP * 4)}px;
  overflow-y: scroll;

  &:after {
    content  : "";
    position : absolute;
    z-index  : 1;
    bottom   : 0;
    left     : 0;
    pointer-events   : none;
    background-image : linear-gradient(to bottom, 
                      rgba(255,255,255, 0), 
                      ${p => p.theme.colors.foreground} 90%);
    width    : 100%;
    height   : 3em;
  }
`

export default ({ events, hackathonStart, hackathonEnd }) => {
  const produceOptimalSchedule = (events) => {
    const res = []
    let unusedEvents = events;

    // build optimal columns list while there are still events that
    // are not in the schedule
    while (unusedEvents.length > 0) {
      let latestTime = new Date(0) // epoch time lmao
      let usedIndices = []

      // produce optimal schedule and track which events are used
      const sched = unusedEvents.reduce((accumulator, event, i) => {
        const curTime = new Date(event.startTime)
        if (curTime.getTime() >= latestTime.getTime()) {
          const hoursFromStart = (curTime - hackathonStart) / 1000 / 60 / 60
          event.hourOffset = hoursFromStart

          const duration = ((new Date(event.endTime)) - (new Date(event.startTime))) / 1000 / 60 / 60
          event.duration = duration

          accumulator.push(event)
          usedIndices.push(i)
          latestTime = new Date(event.endTime)
        }
        return accumulator;
      }, [])

      // update unused by removing used events
      unusedEvents = unusedEvents.filter((value, index) => {
        return usedIndices.indexOf(index) === -1;
      })

      // add schedule to columns list
      res.push(sched)
    }
    return res
  }

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return time.toLocaleDateString('en-US', options)
  }

  const schedule = produceOptimalSchedule(events)
  console.log(schedule)

  const durationOfHackathon = (hackathonEnd - hackathonStart) / 1000 / 60 / 60

  return (
    <Card>
      <ScheduleFlexContainer duration={durationOfHackathon}>
        {schedule.map((column) =>
          <ScheduleColumn>
            {column.map((event) =>
              <EventCard hourOffset={event.hourOffset} duration={event.duration}>
                <H3>{event.name}</H3>
                <P>{formatTime(event.startTime)} - {formatTime(event.endTime)}</P>
                <P>{event.description}</P>
              </EventCard>
            )}
          </ScheduleColumn>
        )}
      </ScheduleFlexContainer>
    </Card>
  );
}