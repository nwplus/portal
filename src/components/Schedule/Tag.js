import React from 'react';
import styled from 'styled-components';
import { EVENT_TYPES } from './Constants'

export const TagLegendContainer = styled.div`
  margin-bottom: 1.5em;
  text-align: right;

  & > span {
    margin-right: 5px;
  }
`

export const Tag = styled.span`
  color: ${p => p.theme.colors.background};
  font-weight: ${p => p.theme.typography.h3.weight};
  margin: 0;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: ${props => props.colour};
`

export const PositionedTag = styled(Tag)`
  position: absolute;
  right: 15px;
  top: 15px;
`

export const TagLegend = () => {
  return (
    <TagLegendContainer>
      {Object.entries(EVENT_TYPES).map((entry, i) => {
        const event_type = entry[1]
        return <Tag key={i} colour={event_type.colour}>{event_type.label}</Tag>
      })}
    </TagLegendContainer>
  )
}