import React from 'react'
import styled from 'styled-components'
import { H1, H2, P } from './Typography'
import { Card, HR } from './Common'
import { Button } from './Button'
import JudgingCard from './JudgingCard'

const Label = styled(P)`
  color: ${p => p.theme.colors.primary};
`

const Columns = styled.div`
  display: flex;
  flex: 1 2;
  margin-top: 1em;
  div:nth-child(1) {
    margin-right: 2em;
  }
`

const FeedbackItem = styled.div`
  background: ${p => p.theme.colors.background};
  box-sizing: border-box;
  padding: 1em;
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
    <Card>
      {feedback.map(item => (
        <FeedbackItem key={item}>{item}</FeedbackItem>
      ))}
    </Card>
  )
}

export default ({ project, feedback = [] }) => {
  return (
    <>
      <H1>Submit Your Project</H1>
      <P>Copy goes here once logs is done</P>

      {project ? (
        <>
          <Button href="/submission/edit">Edit Submission</Button>
          <Label>Congratulations! Your project was successfully submitted.</Label>
        </>
      ) : (
        <Button href="/submission/create">Create Submission</Button>
      )}
      <HR />
      <H1>Project Submission</H1>
      <P>Copy goes here once logs is done</P>
      <Columns>
        <Column>
          <H2>Details</H2>
          {project ? (
            <JudgingCard {...project} buttonLabel="View on Devpost" />
          ) : (
            <P>You have not submitted a project.</P>
          )}
        </Column>
        <Column width="2">
          <H2>Feedback</H2>
          {feedback.length > 0 ? (
            <FeedbackCard feedback={feedback} />
          ) : (
            <P>Check back here when judging ends to review your project feedback.</P>
          )}
        </Column>
      </Columns>
    </>
  )
}
