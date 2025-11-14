import React from 'react'
import styled from 'styled-components'
import { JUDGING_RUBRIC } from '../../utility/Constants'
import { Card } from '../Common'
import { Button, Select, TextArea } from '../Input'
import { A, ErrorMessage, H2, Label, Message, P } from '../Typography'
import Youtube from '../Youtube'

const Container = styled.div`
  display: flex;

  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
  }
`

const Column = styled.div`
  margin: 1em;
  flex: 1;
`

const JudgingColumn = styled(Column)`
  flex: 0 0 550px;
  margin-right: 4em;

  ${p => p.theme.mediaQueries.mobile} {
    flex: none;
  }
`

const StyledYoutube = styled(Youtube)`
  width: 500px;
  height: 300px;
  border-radius: 3px;
`

const StyledP = styled(P)`
  margin: 1em 0;
  color: ${p => p.theme.colors.text};
`

const StyledA = styled(A)`
  color: ${p => p.theme.colors.textSecondary};

  &:hover {
    color: ${p => p.theme.colors.tertiaryHover};
  }
`

const ExternalLink = styled(A)`
  color: ${p => p.theme.colors.tertiaryHover};
  font-weight: bold;

  &:hover {
    color: ${p => p.theme.colors.tertiaryHover};
  }
`

const StyledLabel = styled(Label)`
  color: ${p => p.theme.colors.textSecondary};
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

const StyledH2 = styled(H2)`
  opacity: 1;
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

const ViewProject = ({ project, score, error, success, isSubmitting, onChange, onSubmit }) => {
  const cleanedUpLink = project.links.sourceCode.replace(/https?:\/\//, '')
  const cleanedUpDevpostLink = project.links.devpost
    ? project.links.devpost.replace(/https?:\/\//, '')
    : ''
  const cleanedUpFigmaLink = project.links.figma
    ? project.links.figma.replace(/https?:\/\//, '')
    : ''
  return (
    <Container>
      <JudgingColumn>
        <StyledH2>Judging "{project.title}"</StyledH2>
        <Card>
          <StyledYoutube src={project.links.youtube} />
          <StyledP>{project.description}</StyledP>
          <StyledP>
            {cleanedUpDevpostLink ? (
              <StyledA target="_blank" rel="noreferrer noopener" href={`//${cleanedUpDevpostLink}`}>
                View Devpost
              </StyledA>
            ) : (
              ''
            )}
          </StyledP>
          <StyledP>
            <StyledA target="_blank" rel="noreferrer noopener" href={`//${cleanedUpLink}`}>
              View source code
            </StyledA>
          </StyledP>
          <StyledP>
            {cleanedUpFigmaLink ? (
              <StyledA target="_blank" rel="noreferrer noopener" href={`//${cleanedUpFigmaLink}`}>
                View Figma
              </StyledA>
            ) : (
              ''
            )}
          </StyledP>
        </Card>
      </JudgingColumn>
      <Column>
        <H2>Scorecard</H2>
        <StyledP>
          For a full break-down on the rubric, please refer to the Judging Guide on the{' '}
          <ExternalLink
            target="_blank"
            rel="noreferrer noopener"
            href="https://nwplus.notion.site/PUBLIC-HackCamp-2025-Peer-Judging-Rubric-1ed14d529faa811ba7f2c17e5fa454df?pvs=74"
          >
            Hacker Package
          </ExternalLink>
          !
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
        <RightButton disabled={isSubmitting} onClick={onSubmit} color="secondary" width="flex">
          Submit Score
        </RightButton>
      </Column>
    </Container>
  )
}

export default ViewProject
