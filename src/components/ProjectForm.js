import React from 'react'
import styled from 'styled-components'
import { Button, TextInput, TextArea } from '../components/Input'
import { H1, P, A } from './Typography'

const TableForm = styled.form`
  display: table;

  & > div {
    display: table-row;

    & > * {
      display: table-cell;
    }
  }
`

const Label = styled.label``

const FormRow = ({ id, label, children }) => (
  <div>
    <Label for={id}>{label}</Label>
    <div id={id}>{children}</div>
  </div>
)

export default ({ project, submitCallback, onChange }) => {
  console.log(project)
  return project ? (
    <div>
      <H1>Edit "{project.title}"</H1>
      <TableForm onSubmit={submitCallback}>
        <FormRow id="title" label="PROJECT NAME">
          <TextInput
            value={project.title}
            placeholder="Required"
            onChange={e => onChange({ ...project, title: e.target.value })}
          />
        </FormRow>
        <FormRow id="devpostUrl" label="DEVPOST LINK">
          <TextInput
            value={project.devpostUrl}
            placeholder="Required"
            onChange={e => onChange({ ...project, devpostUrl: e.target.value })}
          />
        </FormRow>
        <FormRow id="youtubeUrl" label="VIDEO LINK">
          <TextInput
            value={project.youtubeUrl}
            placeholder="Required"
            onChange={e => onChange({ ...project, youtubeUrl: e.target.value })}
          />
        </FormRow>
        <FormRow id="description" label="DESCRIPTION">
          <TextArea
            placeholder="Maximum of 240 characters"
            maxLength="240"
            value={project.description}
            onChange={val => onChange({ ...project, description: val })}
          />
        </FormRow>
      </TableForm>
    </div>
  ) : (
    <P>You have not submitted a project.</P>
  )
}
