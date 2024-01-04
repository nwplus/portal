import React from 'react'
import styled from 'styled-components'
import { EVENT_TYPES } from './Constants'
import { ReactComponent as Icon } from '../../assets/scheduleTag.svg'

export const TagLegendContainer = styled.div`
  margin-bottom: 1.5em;
  text-align: right;

  & > span {
    margin-right: 5px;
  }
`

export const Tag = styled.span`
  color: ${p => p.theme.colors.schedule.text};
  font-weight: ${p => p.theme.typography.h2.weight};
  margin: 0;
  padding: 3px 6px;
  border-radius: 4px;
`

export const PositionedTag = styled(Tag)`
  position: absolute;
  right: 15px;
  top: 15px;
`

export const StyledSVG = styled(Icon)`
  fill: ${props => props.color};
`

export const TagLegend = () => {
  return (
    <TagLegendContainer>
      {Object.entries(EVENT_TYPES).map((entry, i) => {
        const event_type = entry[1]
        console.log('Event Type Color:', event_type.colour)
        return (
          <span key={i}>
            <StyledSVG color={event_type.colour} />
            <Tag>{event_type.label}</Tag>
          </span>
        )
      })}
    </TagLegendContainer>
  )
}
