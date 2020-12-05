import React from 'react'
import styled from 'styled-components'
import { H1, H2, H3, P } from './Typography'
import { Card, HR } from './Common'
import JudgingCard from './JudgingCard'

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-block;
`

const Item = styled.li`
  display: inline-block;
  border-style: none;
  font-size: 0.9em;
  margin-right: 3px;
  padding: 0.4rem;
  border-radius: 2px;
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.background};
  margin-bottom: 0.2em;
`

const Grade = styled(Item)`
  text-transform: capitalize;
`

const SponsorPrizeHeading = styled(H3)`
  margin-right: 1em;
  display: inline-block;
`

const Columns = styled.div`
  display: flex;
  flex: 1 2;
  margin-top: 1em;
  div:nth-child(1) {
    margin-right: 2em;
  }
`

const FeedbackItem = styled(Card)`
  box-sizing: border-box;
  padding: 0.5em 1em 0 1em;
  width: 100%;
  margin: 1em 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

const Column = styled.div`
  flex: ${p => p.width || 1};
`

const FeedbackCard = ({ feedback }) => {
  return (
    <>
      {feedback.map((item, i) => {
        const ordered = {}
        Object.keys(item)
          .sort()
          .forEach(function (key) {
            ordered[key] = item[key]
          })

        const grades = Object.entries(ordered).filter(([key, value]) => key !== 'notes')
        const total = Object.values(grades).reduce((accum, cur) => accum + cur[1], 0)

        return (
          <FeedbackItem key={i}>
            <H3>Score: {total}</H3>
            <P>{item.notes || 'No feedback provided.'}</P>
            <ItemList>
              {grades.map(([key, value]) => (
                <Grade key={key}>
                  {key}: {value}
                </Grade>
              ))}
            </ItemList>
          </FeedbackItem>
        )
      })}
    </>
  )
}

export default ({ project }) => {
  project.grades = Object.values(project.grades)
  return (
    <>
      <H1>Project Submission</H1>
      <H3>Team Members: {project.teamMembers.join(', ')}</H3>
      <SponsorPrizeHeading>Sponsor Prizes: </SponsorPrizeHeading>
      <ItemList>
        {project.sponsorPrizes.map(prize => (
          <Item key={prize}>{prize || "Didn't apply for sponsor prizes"}</Item>
        ))}
      </ItemList>
      <Columns>
        <Column>
          <H2>Details</H2>
          <JudgingCard {...project} buttonLabel="View on Devpost" />
        </Column>
        <Column width="2">
          <H2>Feedback</H2>
          {project.grades.length > 0 ? (
            <>
              <H3>Your project has been judged {project.grades.length} times.</H3>
              <FeedbackCard feedback={project.grades} />
            </>
          ) : (
            <P>Check back here when judging ends to review your project feedback.</P>
          )}
        </Column>
      </Columns>
    </>
  )
}
