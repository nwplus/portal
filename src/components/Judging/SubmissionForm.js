import React from 'react'
import { TextInput } from '../Input'
import { H1, Message, A, P } from '../Typography'
import { TableForm, FormRow, SubmitRow } from '../TableForm'

export default ({ email, msg, onSubmit, onChange }) => {
  return (
    <div>
      <H1>Link Devpost to Portal</H1>
      <P>
        You will need to link the portal to your Devpost account so we can fetch your submission.
      </P>
      <TableForm
        onSubmit={e => {
          e.preventDefault()
          onSubmit(email)
        }}
      >
        <FormRow id="title" label="Devpost Email">
          <TextInput
            value={email}
            placeholder="example@gmail.com"
            onChange={e => onChange(e.target.value)}
          />
        </FormRow>
        <SubmitRow msg={msg} data={email} onSubmit={onSubmit} text="Link Devpost" />{' '}
        <Message>Can't remember which email you used?</Message>
        <A href="https://devpost.com/settings/account">Devpost Account Page</A>
      </TableForm>
    </div>
  )
}
