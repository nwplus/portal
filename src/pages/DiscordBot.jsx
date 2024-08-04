import React from 'react'
import styled from 'styled-components'
import { Code, H1, H2, HR } from '../components/Typography'
import { copyText } from '../utility/Constants'
import { useHackathon } from '../utility/HackathonProvider'

const StyledH2 = styled(H2)`
  opacity: 1;
`

const StyledTable = styled.table`
  border: 1px solid ${p => p.theme.colors.text};
  border-collapse: collapse;

  th,
  td {
    border: 1px solid ${p => p.theme.colors.text};
    padding: 8px;
    width: 20%;

    &:last-of-type {
      width: 40%;
    }
  }
`

export default function DiscordBot() {
  const { activeHackathon } = useHackathon()
  return (
    <>
      <H1>Discord Bot</H1>
      <StyledH2>General</StyledH2>
      <StyledTable>
        <tr>
          <th>Purpose</th>
          <th>Activate Command</th>
          <th>Available in</th>
          <th>Details</th>
        </tr>
        <tr>
          <td>To verify your email on our list and gain access to all channels and commands</td>
          <td>React to message</td>
          <td>Direct message from bot, #welcome</td>
          <td>
            <p>
              You will get a DM from the bot as soon as you join the server, please read it. After
              you react to the message, the bot will ask you to send it your email. Type the email
              you used to apply to {copyText[activeHackathon].hackathonNameShort} in the message
              bar, hit send. If the first attempt fails, you can re-react to the message!
            </p>
            <p>
              If you don’t get the message upon entering the server for whatever reason, you can
              still react to the message in #welcome as a backup option to verify your email
            </p>
          </td>
        </tr>
        <tr>
          <td>Claim a stamp for attending an activity</td>
          <td>React to message</td>
          <td>Corresponding activity channel</td>
          <td>
            <p>
              You will receive a stamp for attending most activities, and organizers will announce
              to everyone who is present as to when the stamps will drop and in which channel.
            </p>
            <p>For most activities: simply react to the message sent by the bot</p>
            <p>
              For other activities (i.e. sponsor booths): you should have a password given by the
              organizer of the activity.{' '}
              <b>Only react to the bot message once you have the password.</b> The bot will send you
              a DM and ask for the password.
            </p>
          </td>
        </tr>
        <tr>
          <td>Indicate your pronouns as a role on your profile</td>
          <td>React to message</td>
          <td>#welcome</td>
          <td>
            <p>
              React with the emojis corresponding to your pronouns and you will get a role with the
              pronouns. Un-reacting will make you lose the role.
            </p>
          </td>
        </tr>
        <tr>
          <td>Get an additional role</td>
          <td>React to message</td>
          <td>Everywhere</td>
          <td>
            <p>
              Sometimes you will be able to opt in for an additional role. There will be a bot
              message with a list of emojis and their corresponding roles as well as a description
              of what it is for. React to the emoji to get the role and un-react to lose it.
            </p>
          </td>
        </tr>
        <tr>
          <td>To report a misconduct</td>
          <td>
            <Code>!report</Code>
          </td>
          <td>Everywhere</td>
          <td>
            <p>
              Factotum will send you a template you need to fill out via DM. Please fill the form
              out and send it back to the bot via DM
            </p>
          </td>
        </tr>
      </StyledTable>
      <HR />
      <StyledH2>Request Help</StyledH2>
      <StyledTable>
        <tr>
          <th>Purpose</th>
          <th>Activate Command</th>
          <th>Available in</th>
          <th>Details</th>
        </tr>
        <tr>
          <td>To request a mentor ticket- for longer questions needing specialized help</td>
          <td>React to message</td>
          <td>#request-ticket</td>
          <td>
            <p>
              Read the message in #request-ticket channel thoroughly and follow the instruction on
              the message to request a ticket and get 1:1 help from our mentors
            </p>
          </td>
        </tr>
        <tr>
          <td>To request help from a TA (WORKSHOPS ONLY)</td>
          <td>React to message</td>
          <td>#assistance</td>
          <td>
            <p>
              After you react to the message, follow the bot’s instructions to submit a request for
              help and wait for a TA to DM you.
            </p>
          </td>
        </tr>
      </StyledTable>
    </>
  )
}
