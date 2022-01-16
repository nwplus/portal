import React from 'react'
import styled from 'styled-components'
import { H1, H2, H3, P } from '../Typography'
import { Card, CardWithHeader } from '../Common'
import { Button } from '../Input'
import JudgingCard from './JudgingCard'
import { JUDGING_RUBRIC } from '../../utility/Constants'

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-block;
`

const Item = styled.li`
  display: inline-block;
  border-style: none;
  font-size: 0.9em;
  margin-right: 0.4rem;
  padding: 0.4rem;
  border-radius: 2px;
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.background};
  margin-bottom: 0.2em;
`

const Grade = styled(Item)`
  text-transform: capitalize;
`

const Columns = styled.div`
  display: flex;
  flex: 1 2;
  margin-top: 1em;
`

const FeedbackItem = styled(Card)`
  box-sizing: border-box;
  padding: 1em 2em;
  width: 100%;
  margin: 1em 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  ${p => p.reported && `border: 1px solid ${p.theme.colors.warning};`}
`

const Column = styled.div`
  flex: ${p => p.width || 1};
`

const StyledButton = styled(Button)`
  float: right;
`

const FeedbackCard = ({ feedback, reportCallback }) => {
  return (
    <>
      {Object.entries(feedback).map(([i, item]) => {
        const ordered = {}
        Object.keys(item)
          .sort()
          .forEach(key => (ordered[key] = item[key]))

        const grades = Object.entries(ordered).filter(([key]) =>
          JUDGING_RUBRIC.map(item => item.id).includes(key)
        )

        return (
          <FeedbackItem key={i} reported={item.reported}>
            <P>{item.notes || 'No feedback provided.'}</P>
            <ItemList>
              {grades.map(([key, value]) => (
                <Grade key={key}>
                  {key}: {value}
                </Grade>
              ))}
            </ItemList>
            <StyledButton
              disabled={item.reported}
              color="warning"
              onClick={() => {
                !item.reported && reportCallback(i)
              }}
            >
              {item.reported ? 'Reported' : 'Report'}
            </StyledButton>
          </FeedbackItem>
        )
      })}
    </>
  )
}

export default ({ project, reportCallback }) => {
  const gradeCount = Object.keys(project.grades ?? {}).length
  return (
    <>
      <H1>Project Submission</H1>
      <H3>Team Members: {project.teamMembers.map(member => member.name).join(', ')}</H3>
      <H3>
        Sponsor Prizes:{' '}
        {project.sponsorPrizes[0]
          ? project.sponsorPrizes.join(', ')
          : "Didn't apply for sponsor prizes"}
      </H3>
      <Columns>
        <Column>
          <JudgingCard {...project} buttonLabel="View project" href={'projects/' + project.id} />
        </Column>
        <Column width="2">
          <CardWithHeader header="Feedback">
            {gradeCount > 0 ? (
              <>
                <P>Your project has been judged {gradeCount} times.</P>
                <FeedbackCard feedback={project.grades} reportCallback={reportCallback} />
              </>
            ) : (
              <P>Check back here when judging ends to review your project feedback.</P>
            )}
          </CardWithHeader>
        </Column>
      </Columns>
    </>
  )
}
