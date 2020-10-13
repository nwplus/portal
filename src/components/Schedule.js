import React from 'react';
import styled from 'styled-components';
import { Card } from './Common';
import { P, H3 } from './Typography';

const HOUR_HEIGHT = 150
const EVENT_GAP = 5
const EVENT_WIDTH = 400

const EventTypes = {
  "main": ["MAIN", "#FFFFFF"],
  "minievents": ["ACTIVITY", "#FFE27A"],
  "workshop": ["WORKSHOP", "#31E0E0"],
  "notices": ["NOTICE", "#9EFF7C"],
}

const ScheduleFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ScheduleColumn = styled.div`
  flex: 0 0 ${EVENT_WIDTH}px;
`

const TimelineColumnContainer = styled.div`
  flex: 0 0 100px;
  height: ${props => (props.duration * HOUR_HEIGHT) - 20}px;
`

const TimelineBlock = styled.div`
  position: absolute;
  transform: translateY(-${EVENT_GAP + 1}px);
`

const TimelineHR = styled.hr`
  display: inline-block;
  width: 70vw;
  margin-top: ${props => (props.hourOffset * HOUR_HEIGHT)}px;

  border: 0;
  border-bottom: 1px dashed ${p => p.theme.colors.foreground};
`

const TimelineLabel = styled.span`
  padding-right: 1em;
`

const EventDescription = styled(P)`
  opacity: 0.8;
  margin-bottom: 2em;
`

const EventCard = styled(Card)`
  position: absolute;
  background-color: ${p => p.theme.colors.foreground};
  margin: 5px;
  padding: ${EVENT_GAP}px 15px;
  width: ${EVENT_WIDTH - 50}px;
  margin-top: ${props => (props.hourOffset * HOUR_HEIGHT)}px;
  height: ${props => (props.duration * HOUR_HEIGHT) - (EVENT_GAP * 4)}px;
  overflow-y: scroll;

  & > h3 {
    opacity: 1;
  }
`

const TagLegendContainer = styled.div`
  margin-bottom: 1.5em;
  text-align: right;

  & > span {
    margin-right: 5px;
  }
`

const Tag = styled.span`
  color: ${p => p.theme.colors.background};
  font-weight: ${p => p.theme.typography.h3.weight};
  margin: 0;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: ${props => props.colour};
`

const PositionedTag = styled(Tag)`
  position: absolute;
  right: 15px;
  top: 15px;
`

const TimelineColumn = ({ hackathonStart, duration }) => {
  duration = Math.max(0, duration)
  return (
    <TimelineColumnContainer duration={duration}>
      {[...Array(duration)].map((v, i) => {
        const labelTime = new Date(hackathonStart.getTime() + (i * 60 * 60 * 1000))
        const label = labelTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        return (
          <TimelineBlock>
            <TimelineLabel>{label}</TimelineLabel>
            <TimelineHR hourOffset={i} />
          </TimelineBlock>
        )
      })}
    </TimelineColumnContainer>
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
      <TagLegendContainer>
        {Object.entries(EventTypes).map(entry => {
          return <Tag colour={entry[1][1]}>{entry[1][0]}</Tag>
        })}
      </TagLegendContainer>
      <ScheduleFlexContainer>
        <TimelineColumn hackathonStart={hackathonStart} duration={durationOfHackathon} />
        {schedule.map((column) =>
          <ScheduleColumn>
            {column.map((event) =>
              <EventCard hourOffset={event.hourOffset} duration={event.duration}>
                <H3>{event.name}</H3>
                <PositionedTag colour={EventTypes[event.type][1]}>{EventTypes[event.type][0]}</PositionedTag>
                <P>{formatTime(event.startTime)} - {formatTime(event.endTime)}</P>
                <EventDescription>{event.description}</EventDescription>
              </EventCard>
            )}
          </ScheduleColumn>
        )}
      </ScheduleFlexContainer>
    </Card>
  );
}