import React from 'react'
import styled from 'styled-components'
import { Button, TextInput, TextArea } from '../components/Input'
import { H1, P, Label } from './Typography'

export const TableForm = styled.form`
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

export const RightButton = styled(Button)`
  float: right;
`

export const SubmitRow = ({ data, text, onSubmit }) => {
  return (
    <div>
      <div></div>
      <RightButton onClick={e => onSubmit(data)} type="submit" width="flex" color="primary">
        {text}
      </RightButton>
    </div>
  )
}

export const FormRow = ({ id, label, children }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <div id={id}>{children}</div>
  </div>
)

// example table form
export default ({ project, onSubmit, onChange }) => {
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
        <SubmitRow data={project} onSubmit={onSubmit} text="Update Submission" />
      </TableForm>
    </div>
  ) : (
    <P>You have not submitted a project.</P>
  )
}
