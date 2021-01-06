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
  padding: 0.5em;
  background-color: ${p => p.theme.colors.background};
  text-align: left;
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

//An array of titles and a nested array of data
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
            {row.map((item, j) => {
              if (typeof item === 'string' && item.includes('http')) {
                return (
                  <StyledTd>
                    <a target="blank" href={item}>
                      Link
                    </a>
                  </StyledTd>
                )
              }
              return <StyledTd key={j}>{item}</StyledTd>
            })}
          </StyledRow>
        ))}
    </tbody>
  </StyledTable>
)

const ProjectTitles = ['Title', 'Team Members', 'Team Member Emails', 'Devpost']

export const ProjectTable = ({ data }) => {
  const formattedData = data?.map(row => {
    return [row.title, row.teamMembers.join(', '), row.teamMembersEmails.join(', '), row.devpostUrl]
  })
  return <Table titles={ProjectTitles} data={formattedData} />
}

const ProjectGradeTitles = [
  'Title',
  'Devpost',
  '# Assigned',
  '# Graded',
  'Average Total',
  ...JUDGING_RUBRIC.map(item => item.label),
]

export const ProjectGradeTable = ({ data }) => {
  const formattedData = data?.map(row => {
    return [
      row.title,
      row.devpostUrl,
      row.countAssigned,
      row.countGraded,
      row.grade,
      ...JUDGING_RUBRIC.map(item => row[item.id]),
    ]
  })
  return <Table titles={ProjectGradeTitles} data={formattedData} />
}

const GradeTitles = [
  'Title',
  'Devpost',
  'Total Grade',
  'Submitted by',
  ...JUDGING_RUBRIC.map(item => item.label),
  'Reported',
]

export const GradeTable = ({ data }) => {
  const formattedData = data?.map(row => {
    return [
      row.title,
      row.devpostUrl,
      row.totalGrade,
      row.user,
      ...JUDGING_RUBRIC.map(item => row[item.id]),
      row.reported ? 'true' : 'false',
    ]
  })
  return <Table titles={GradeTitles} data={formattedData} />
}
