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
    &:hover {
      background-color: ${p => p.theme.colors.foreground};
    }
  }

  &:hover {
    background-color: ${p => p.theme.colors.background};
  }

  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${p => p.reported && `outline: 2px solid${p.theme.colors.warning};`}
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

const RubricHeaders = () =>
  JUDGING_RUBRIC.map((item, i) => <StyledHeader key={i}>{item.label}</StyledHeader>)
const ProjectTd = ({ proj }) =>
  JUDGING_RUBRIC.map((item, i) => <StyledTd key={i}>{proj[item.id]}</StyledTd>)

export default ({ grades }) => (
  <StyledTable>
    <tbody>
      <StyledRow>
        <StyledHeader>Title</StyledHeader>
        <StyledHeader>Devpost</StyledHeader>
        <StyledHeader>Total Grade</StyledHeader>
        <RubricHeaders />
      </StyledRow>
      {grades &&
        grades.map((grade, i) => (
          <StyledRow reported={grade.reported} key={i}>
            <StyledTd>{grade.title}</StyledTd>
            <StyledTd>
              <a href={grade.devpostUrl}>Devpost</a>
            </StyledTd>
            <StyledTd>{grade.totalGrade}</StyledTd>
            <ProjectTd proj={grade} />
          </StyledRow>
        ))}
    </tbody>
  </StyledTable>
)