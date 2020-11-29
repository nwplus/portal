import React from 'react'
import styled from 'styled-components'
import { Button, TextInput, TextArea } from '../components/Input'
import { H1, P, Label } from './Typography'

const TableForm = styled.form`
  display: table;
  position: relative;

  & > div {
    display: table-row;

    & > * {
      display: table-cell;
    }

    & > label {
      vertical-align: middle;
    }
  }
`

const RightButton = styled(Button)`
  float: right;
`

const SubmitRow = ({ project, submitCallback }) => {
  return (
    <div>
      <div></div>
      <RightButton
        onClick={e => submitCallback(project)}
        type="submit"
        width="flex"
        color="primary"
      >
        Update Submission
      </RightButton>
    </div>
  )
}

const FormRow = ({ id, label, children }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <div id={id}>{children}</div>
  </div>
)

export default ({ project, submitCallback, onChange }) => {
  return project ? (
    <div>
      <H1>Edit "{project.title}"</H1>
      <TableForm>
        <FormRow id="title" label="Project Name">
          <TextInput
            value={project.title}
            placeholder="Required"
            onChange={e => onChange({ ...project, title: e.target.value })}
          />
        </FormRow>
        <FormRow id="devpostUrl" label="Devpost Link">
          <TextInput
            value={project.devpostUrl}
            placeholder="Required"
            onChange={e => onChange({ ...project, devpostUrl: e.target.value })}
          />
        </FormRow>
        <FormRow id="youtubeUrl" label="Video Link">
          <TextInput
            value={project.youtubeUrl}
            placeholder="Required"
            onChange={e => onChange({ ...project, youtubeUrl: e.target.value })}
          />
        </FormRow>
        <FormRow id="description" label="Description">
          <TextArea
            placeholder="Maximum of 240 characters"
            maxLength="240"
            value={project.description}
            onChange={val => onChange({ ...project, description: val })}
          />
        </FormRow>
        <SubmitRow project={project} submitCallback={submitCallback} />
      </TableForm>
    </div>
  ) : (
    <P>You have not submitted a project.</P>
  )
}
