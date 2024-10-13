import styled, { useTheme } from 'styled-components'
import { TagLegendContainer, TagLegends } from '../Schedule/Tag'
import { H1 } from '../Typography'
import AttendedEventsCard from './AttendedEventsCard'
import { EVENT_TYPES } from '../Schedule/Constants'

const AttendedEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;
`

const AttendedEventsHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const TagLegendsContainer = styled(TagLegendContainer)`
  justify-content: start;
  padding-right: 0;
`

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  width: 85%;

  ${p => p.theme.mediaQueries.mobile} {
    width: 100%;
  }
`

const AttendedEvents = () => {
  const theme = useTheme()
  const event_type = EVENT_TYPES(theme)

  const events = [
    { name: 'Some Event', time: '10:00AM - 11:00AM', points: 600, event_type: 'main' },
    { name: 'Some Event 2', time: '10:00AM - 11:00AM', points: 400, event_type: 'workshops' },
    { name: 'Some Event 3', time: '10:00AM - 11:00AM', points: 300, event_type: 'minievents' },
  ]

  return (
    <AttendedEventsContainer>
      <AttendedEventsHeader>
        <H1>Attended events</H1>
        <TagLegendsContainer>
          <TagLegends theme={theme} />
        </TagLegendsContainer>
      </AttendedEventsHeader>
      <EventsList>
        {events.map((event, i) => (
          <AttendedEventsCard
            key={i}
            name={event.name}
            time={event.time}
            points={event.points}
            color={event_type[event.event_type].colour}
          />
        ))}
      </EventsList>
    </AttendedEventsContainer>
  )
}

export default AttendedEvents
