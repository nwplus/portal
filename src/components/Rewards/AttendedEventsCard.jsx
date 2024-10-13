import styled, { useTheme } from 'styled-components'
import { StyledSVG } from '../Schedule/Tag'
import { EVENT_TYPES } from '../Schedule/Constants'
import { P } from '../Typography'
import Icon from '../../assets/checkmark.svg?react'

const AttendedEventsCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  color: ${p => p.theme.colors.cardText};
  background: ${p => p.theme.colors.backgroundTertiary};
  border-radius: 5px;
  padding: 1em 1.5em;
`

const EventDetailsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TagPointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`

const CheckmarkSVG = styled(Icon)`
  fill: ${props => props.color};
  ${p => p.theme.mediaQueries.mobile} {
    height: 0.75em;
    width: 0.75em;
  }
`

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const EventName = styled(P)`
  margin: 0;
  font-weight: 700;
`

const EventTime = styled(P)`
  margin: 0;
  font-size: 0.875em;
`

const PointsText = styled(P)`
  font-weight: 700;
  color: ${props => props.color};
  font-size: 0.875em;
`

const AttendedEventsCard = () => {
  const theme = useTheme()
  const event_type = Object.entries(EVENT_TYPES(theme)).map(([key, event_type], i) => event_type)[0]
  return (
    <AttendedEventsCardContainer>
      <CheckmarkSVG color={event_type.colour} />
      <EventDetailsContainer>
        <EventDetails>
          <EventName>Some Event</EventName>
          <EventTime>10:00AM - 11:00AM</EventTime>
        </EventDetails>
        <TagPointsContainer>
          <StyledSVG color={event_type.colour} />
          <PointsText color={event_type.colour}>600 pts earned</PointsText>
        </TagPointsContainer>
      </EventDetailsContainer>
    </AttendedEventsCardContainer>
  )
}

export default AttendedEventsCard
