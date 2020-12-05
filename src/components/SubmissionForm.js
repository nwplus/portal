import React from 'react'
import { TextInput } from './Input'
import { H1, Message, A } from './Typography'
import { TableForm, FormRow, SubmitRow } from './TableForm'

export default ({ email, onSubmit, onChange }) => {
  return (
    <div>
      <H1>Link Devpost to Portal</H1>
      <TableForm>
        <FormRow id="title" label="Devpost Email">
          <TextInput
            value={email}
            placeholder="example@gmail.com"
            onChange={e => onChange(email)}
          />
        </FormRow>
        <SubmitRow data={email} onSubmit={onSubmit} text="Link Devpost" />
        <Message>Can't remember which email you used?</Message>
        <A href="https://devpost.com/settings/account">Devpost Account Page</A>
      </TableForm>
    </div>
  )
}
