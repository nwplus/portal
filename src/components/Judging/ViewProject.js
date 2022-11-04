import React from 'react'
import styled from 'styled-components'
import { H2, P, A, Label, ErrorMessage, Message } from '../Typography'
import { Select, Button, TextArea } from '../Input'
import Youtube from '../Youtube'
import { Card } from '../Common'
import { JUDGING_RUBRIC } from '../../utility/Constants'

const Container = styled.div`
  display: flex;
`

const Column = styled.div`
  margin: 1em;
  flex: 1;
`

const JudgingColumn = styled(Column)`
  flex: 0 0 550px;
  margin-right: 4em;
`

const StyledYoutube = styled(Youtube)`
  width: 500px;
  height: 300px;
  border-radius: 3px;
`

const StyledP = styled(P)`
  margin: 1em 0;
`

const StyledA = styled(A)`
  color: ${p => p.theme.colors.primary};
  border-color: ${p => p.theme.colors.primary};

  &:hover {
    color: ${p => p.theme.colors.tertiaryHover};
  }
`

const StyledLabel = styled(Label)`
  display: block;
  margin: 1em 0 0.25em 0;
`

const StyledTextArea = styled(TextArea)`
  margin: 1em 0;
`

const RightButton = styled(Button)`
  float: right;
`

const StyledMessage = styled(Message)`
  text-align: right;
`

const ScoreInput = ({ id, label, description, maxScore, score, onChange }) => {
  return (
    <>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <P>{description}</P>
      <div id={id}>
        {[...Array(maxScore).keys()].map(option => {
          option = option + 1 // 1-index
          return (
            <Select
              key={option}
              type="radio"
              label={option}
              checked={score[id] === option}
              onChange={() => onChange({ ...score, [id]: option })}
              value={option}
            />
          )
        })}
      </div>
    </>
  )
}

export default ({ project, score, error, success, isSubmitting, onChange, onSubmit }) => {
  const cleanedUpLink = project.links.sourceCode.replace(/https?:\/\//, '')
  const cleanedUpDevpostLink = project.links.devpost.replace(/https?:\/\//, '')
  return (
    <Container>
      <JudgingColumn>
        <H2>Judging "{project.title}"</H2>
        <Card>
          <StyledYoutube src={project.links.youtube} />
          <StyledP>{project.description}</StyledP>
          <StyledP>
            <StyledA target="_blank" rel="noreferrer noopener" href={`//${cleanedUpDevpostLink}`}>
              View Devpost
            </StyledA>
          </StyledP>
          <StyledP>
            <StyledA target="_blank" rel="noreferrer noopener" href={`//${cleanedUpLink}`}>
              View source code
            </StyledA>
          </StyledP>
        </Card>
      </JudgingColumn>
      <Column>
        <H2>Scorecard</H2>
        <StyledP>
          For a full break-down on the rubric, please refer to the Judging Guide on the Hacker
          Package!
        </StyledP>
        {JUDGING_RUBRIC.map(entry => (
          <ScoreInput
            id={entry.id}
            label={entry.label}
            description={entry.description}
            maxScore={entry.value}
            score={score}
            onChange={onChange}
          />
        ))}
        <StyledLabel htmlFor="notes">Comments</StyledLabel>
        <StyledTextArea
          maxLength="600"
          width="100%"
          id="notes"
          placeholder="Constructive feedback"
          value={score.notes}
          onChange={e => onChange({ ...score, notes: e })}
        />
        {error && <ErrorMessage>Please fill all fields</ErrorMessage>}
        {success && (
          <StyledMessage>Successfully submitted! You will be redirected soon.</StyledMessage>
        )}
        <RightButton disabled={isSubmitting} onClick={onSubmit}>
          Submit Score
        </RightButton>
      </Column>
    </Container>
  )
}
