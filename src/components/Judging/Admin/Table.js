import React from 'react'
import styled from 'styled-components'
import { JUDGING_RUBRIC } from '../../../utility/Constants'
import { A } from '../../Typography'
import { Button } from '../../Input'

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
    background-color: ${p => p.theme.colors.border};
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
      {data?.map((row, i) => (
        <StyledRow key={i}>
          {row.map((item, j) => {
            if (typeof item === 'string' && item.includes('/projects/')) {
              return (
                <StyledTd key={j}>
                  <A target="blank" href={item}>
                    Link
                  </A>
                </StyledTd>
              )
            }
            if (typeof item === 'object') {
              return item
            }
            return <StyledTd key={j}>{item}</StyledTd>
          })}
        </StyledRow>
      ))}
    </tbody>
  </StyledTable>
)

// const ProjectTitles = ['Title', 'Team Members', 'Team Member Emails', 'Devpost']

// export const ProjectTable = ({ data }) => {
//   const formattedData = data?.map(row => {
//     return [row.title, row.teamMembers.join(', '), row.teamMembersEmails.join(', '), row.devpostUrl]
//   })
//   return <Table titles={ProjectTitles} data={formattedData} />
// }

const DisqualifyButton = ({ onClick, disqualified }) => {
  return disqualified ? (
    <StyledTd>
      <A onClick={onClick}>Undisqualify</A>
    </StyledTd>
  ) : (
    <StyledTd>
      <A onClick={onClick}>Disqualify</A>
    </StyledTd>
  )
}

const ProjectGradeTitles = [
  'Title',
  'View',
  '# Assigned',
  '# Graded',
  'Average Total',
  ...JUDGING_RUBRIC.map(item => item.label),
  'Disqualify',
]

export const ProjectGradeTable = ({ data, onDisqualify }) => {
  const formattedData = data?.map(row => {
    const projectLink = `/projects/${row.id}`
    return [
      row.title,
      projectLink,
      row.countAssigned,
      row.countGraded,
      row.grade,
      ...JUDGING_RUBRIC.map(item => row[item.id]),
      <DisqualifyButton
        key={row.id}
        disqualified={row.disqualified}
        onClick={() => onDisqualify(row.id, row.disqualified)}
      />,
    ]
  })
  return <Table titles={ProjectGradeTitles} data={formattedData} />
}

const GradeTitles = [
  'Title',
  'View',
  'Total Grade',
  'Submitted by',
  ...JUDGING_RUBRIC.map(item => item.label),
  'Reported',
  'Delete',
]

const RemoveButton = ({ onRemove }) => {
  return (
    <StyledTd>
      <Button color="warning" onClick={onRemove}>
        Delete
      </Button>
    </StyledTd>
  )
}

export const GradeTable = ({ data, onRemove }) => {
  const formattedData = data?.map(row => {
    const projectLink = `/projects/${row.id}`
    return [
      row.title,
      projectLink,
      row.totalGrade,
      row.user,
      ...JUDGING_RUBRIC.map(item => row[item.id]),
      row.reported ? 'true' : 'false',
      <RemoveButton key={row.id} onRemove={() => onRemove(row)} />,
    ]
  })
  return <Table titles={GradeTitles} data={formattedData} />
}
