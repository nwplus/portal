import React from 'react'
import styled from 'styled-components'
import { H1, H2, P } from './Typography'
import { HR, Button } from './Common'
import JudgingCard from './JudgingCard'

const Columns = styled.div`
  display: flex;
  flex: 1 2;
  margin-top: 1em;
  div:nth-child(1) {
    margin-right: 2em;
  }
`

const FeedbackCard = ({ feedback }) => {
  return <p>hi</p>
}

export default ({ project, feedback }) => {
  return (
    <>
      <H1>Submit Your Project</H1>
      <P>Copy goes here once logs is done</P>
      <Button href="/submission/create">Create Submission</Button>
      <HR />
      <H1>Project Submission</H1>
      <P>Copy goes here once logs is done</P>
      <Columns>
        <div style={{ flex: 1 }}>
          <H2>Details</H2>
          {project ? (
            <JudgingCard {...project} href={project.devpost} buttonLabel="View on Devpost" />
          ) : (
            <P>You have not submitted a project.</P>
          )}
        </div>
        <div style={{ flex: 2 }}>
          <H2>Feedback</H2>
          {project ? (
            <FeedbackCard feedback={feedback} />
          ) : (
            <P>Check back here when judging ends to review your project feedback.</P>
          )}
        </div>
      </Columns>
    </>
  )
}
