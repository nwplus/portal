import styled, { useTheme } from 'styled-components'
import { TagLegendContainer, TagLegends } from '../Schedule/Tag'
import { H1 } from '../Typography'
import AttendedEventsCard from './AttendedEventsCard'
import { EVENT_TYPES } from '../Schedule/Constants'
import { getEvents } from '../../utility/firebase'
import { useHackathon } from '../../utility/HackathonProvider'
import { useEffect } from 'react'
import { useState } from 'react'

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
  overflow-y: scroll;
  width: 85%;

  ${p => p.theme.mediaQueries.mobile} {
    width: 100%;
  }
`

const AttendedEvents = ({ userDetails }) => {
  const { dbHackathonName } = useHackathon()
  const theme = useTheme()
  const event_type = EVENT_TYPES(theme)
  const [events, setEvents] = useState([])

  useEffect(() => {
    // prettier insisted on the semicolon
    ;(async () => {
      if (userDetails && dbHackathonName) {
        console.log(userDetails)
        const eventIds = userDetails.dayOf.events.map(event => event.eventId)
        const events = await getEvents(dbHackathonName)
        const filteredEvents = events.filter(event => eventIds.includes(event.key))
        setEvents(filteredEvents)
      }
    })()
  }, [userDetails, dbHackathonName])

  return (
    <AttendedEventsContainer>
      <AttendedEventsHeader>
        <H1>Attended events</H1>
        <TagLegendsContainer>
          <TagLegends theme={theme} />
        </TagLegendsContainer>
      </AttendedEventsHeader>
      {userDetails && (
        <EventsList>
          {events.map((event, i) => (
            <AttendedEventsCard
              key={i}
              name={event.name}
              startTime={new Date(event.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
              endTime={new Date(event.endTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
              points={event.points ? event.points : '0'}
              color={event_type[event.type]?.colour ?? 'gray'}
            />
          ))}
        </EventsList>
      )}
    </AttendedEventsContainer>
  )
}

export default AttendedEvents
