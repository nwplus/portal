import React from 'react'
import styled from 'styled-components'
import { EVENT_TYPES } from './Constants'
import { ReactComponent as Icon } from '../../assets/scheduleTag.svg'

export const TagLegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align items to the right */
  padding-right: 25px;

  & > span {
    margin-right: 15px;
  }
  ${p => p.theme.mediaQueries.mobile} {
    justify-content: center;
  }
`

export const Tag = styled.span`
  color: ${p => p.theme.colors.schedule.text};
  font-weight: ${p => p.theme.typography.h3.weight};
  font-size: ${p => p.theme.typography.h3.size};
  padding: 3px 6px;
  border-radius: 4px;
`

export const PositionedTag = styled(Icon)`
  position: absolute;
  right: 15px;
  top: 15px;
  fill: ${props => props.color};
`

export const StyledSVG = styled(Icon)`
  fill: ${props => props.color};
`

export const TagLegend = () => {
  return (
    <TagLegendContainer>
      {Object.entries(EVENT_TYPES).map(([key, event_type], i) => {
        return (
          <React.Fragment key={key}>
            <StyledSVG color={event_type.colour} />
            <Tag>{event_type.label}</Tag>
          </React.Fragment>
        )
      })}
    </TagLegendContainer>
  )
}
