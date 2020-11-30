import React from 'react'
import styled from 'styled-components'
import { H2, P, A, Label } from '../components/Typography'
import { Select, Button, TextArea } from '../components/Input'
import Youtube from '../components/Youtube'

const Container = styled.div`
  display: flex;
`

const Column = styled.div`
  margin: 1em;
  flex: 1;
`

const StyledYoutube = styled(Youtube)`
  width: 500px;
  height: 300px;
`

const StyledP = styled(P)`
  margin: 1em 0;
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

const ScoreInput = ({ id, label, score, onChange }) => {
  return (
    <>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <div id={id}>
        {[1, 2, 3, 4, 5].map(option => {
          return (
            <Select
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

export default ({ project, score, onChange, onSubmit }) => {
  return (
    <Container>
      <Column>
        <H2>Judging "{project.title}"</H2>
        <StyledYoutube src={project.youtubeUrl} />
        <StyledP>{project.description}</StyledP>
        <A src={project.devpostUrl}>View on Devpost</A>
      </Column>
      <Column>
        <H2>How do I judge a project?</H2>
        <P>
          Please judge the project on the left. Hover over the ? icons to see the scoring criteria.
        </P>
        <ScoreInput id="tech" label="Technology" score={score} onChange={onChange} />
        <ScoreInput id="design" label="Design" score={score} onChange={onChange} />
        <ScoreInput id="functionality" label="Functionality" score={score} onChange={onChange} />
        <ScoreInput id="creativity" label="Creativity" score={score} onChange={onChange} />
        <ScoreInput id="pitch" label="Pitch" score={score} onChange={onChange} />

        <StyledLabel htmlFor="notes">Comments</StyledLabel>
        <StyledTextArea
          maxLength="600"
          width="100%"
          id="notes"
          placeholder="Constructive feedback"
          value={score.notes}
          onChange={e => onChange({ ...score, notes: e })}
        />
        <RightButton onClick={onSubmit}>Submit Score</RightButton>
      </Column>
    </Container>
  )
}
