import styled from 'styled-components'
import { StyledSVG } from '../Schedule/Tag'
import { P } from '../Typography'
import Icon from '../../assets/checkmark.svg?react'

const AttendedEventsCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  color: ${p => p.theme.colors.cardText};
  background: ${p => p.theme.colors.backgroundTertiary};
  border-radius: 5px;
  padding: 0.875em 1em;
`

const EventDetailsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  gap: 2em;
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
  margin: 0;
`

/**
 * @typedef {{name: string, time: string, points: number, color: string}} AttendedEventsCardProps
 */

/**
 * @param {AttendedEventsCardProps} param0
 */
const AttendedEventsCard = ({ name, time, points, color }) => {
  return (
    <AttendedEventsCardContainer>
      <CheckmarkSVG color={color} />
      <EventDetailsContainer>
        <EventDetails>
          <EventName>{name}</EventName>
          <EventTime>{time}</EventTime>
        </EventDetails>
        <TagPointsContainer>
          <StyledSVG color={color} />
          <PointsText color={color}>{points} pts earned</PointsText>
        </TagPointsContainer>
      </EventDetailsContainer>
    </AttendedEventsCardContainer>
  )
}

export default AttendedEventsCard
