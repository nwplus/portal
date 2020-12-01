import React from 'react'
import styled from 'styled-components'

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
    background-color: ${p => p.theme.colors.background};
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

export default ({ projects }) => (
  <StyledTable>
    <tbody>
      <StyledRow>
        <StyledHeader>Title</StyledHeader>
        <StyledHeader>Team Members</StyledHeader>
        <StyledHeader>Team Member Emails</StyledHeader>
        <StyledHeader>Devpost</StyledHeader>
      </StyledRow>
      {projects &&
        projects.map((p, i) => (
          <StyledRow key={i}>
            <StyledTd>{p.title}</StyledTd>
            <StyledTd>{p.teamMembers.join(', ')}</StyledTd>
            <StyledTd>{p.teamMembersEmails.join(', ')}</StyledTd>
            <StyledTd>
              <a href={p.devpostUrl}>Devpost</a>
            </StyledTd>
          </StyledRow>
        ))}
    </tbody>
  </StyledTable>
)
