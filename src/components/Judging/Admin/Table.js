import React from 'react'
import styled from 'styled-components'
import { JUDGING_RUBRIC } from '../../../utility/Constants'

const StyledTable = styled.table`
  width: 100%;
  border: none;
  border-collapse: collapse;
`

const StyledRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${p => p.theme.colors.background};
  }

  &:hover {
    background-color: ${p => p.theme.colors.foreground};
  }

  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const StyledHeader = styled.th`
  padding: 0.5em 0.25em;
  background-color: ${p => p.theme.colors.background};
`

const StyledTd = styled.td`
  padding: 0.2em 0.5em;

  & > a {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    color: ${p => p.theme.colors.link};
    &:hover {
      color: ${p => p.theme.colors.linkHover};
    }
    &:focus {
      color: ${p => p.theme.colors.linkHover};
    }
  }
`

const Table = ({ titles, data }) => (
  <StyledTable>
    <tbody>
      <StyledRow>
        {titles.map(title => (
          <StyledHeader key={title}>{title}</StyledHeader>
        ))}
      </StyledRow>
      {data &&
        data.map((row, i) => (
          <StyledRow key={i}>
            {row.map((item, j) => (
              <StyledTd key={j}>{item}</StyledTd>
            ))}
          </StyledRow>
        ))}
    </tbody>
  </StyledTable>
)

const RubricHeaders = () =>
  JUDGING_RUBRIC.map((item, i) => <StyledHeader key={i}>{item.label}</StyledHeader>)
const ProjectTd = ({ proj }) =>
  JUDGING_RUBRIC.map((item, i) => <StyledTd key={i}>{proj[item.id]}</StyledTd>)

const ProjectGradeTitles = [
  'Title',
  'Devpost',
  '# Assigned',
  '# Graded',
  'Average Total',
  ...JUDGING_RUBRIC.map(item => item.label),
]

const ProjectTitles = ['Title', 'Team Members', 'Team Member Emails', 'Devpost']

export const ProjectTable = ({ data }) => {
  const formattedData =
    data &&
    data.map(row => {
      return [
        row.title,
        row.teamMembers.join(', '),
        row.teamMembersEmails.join(', '),
        row.devpostUrl,
      ]
    })
  return <Table titles={ProjectTitles} data={formattedData} />
}
