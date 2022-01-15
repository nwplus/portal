import React, { useState } from 'react'
import styled from 'styled-components'
import { H1, H2, H3, P, A, UL, LI, PortalLink, HR } from '../components/Typography'
import { Checkbox } from '../components/Input'

const StyledH2 = styled(H2)`
  opacity: 1;
`
const StyledH3 = styled(H3)`
  opacity: 1;
`
const StyledP = styled(P)`
  margin-top: 5px;
`

const TodoColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`

const TodoColumn = styled.div`
  flex: 1 0 200px;
  display: flex;
  flex-direction: column;
`

export default () => {
  const [states, setStates] = useState({
    preHacking: { info: false, discord: false, workshops: false, verify: false },
    dayOf: {
      attend: false,
      enjoy: false,
      ceremony: false,
      workshops: false,
      stamps: false,
      sponsor: false,
      interact: false,
    },
    postHacking: { judge: false, vote: false, feedback: false, ceremony: false },
  })

  return (
    <>
      <H1>Getting Started</H1>
      <StyledH2>Welcome to nwHacks 2022!</StyledH2>
      <StyledP>
        We're thrilled to have you at nwHacks 2022! Though things are different with our event being
        virtual this year, we're still looking to have a great experience together. Whether it's
        your first, second or nth time at nwHacks, we hope you'll be able to connect, collaborate,
        and build something extraordinary.
      </StyledP>
      <StyledP>The future is yours!</StyledP>
      <StyledP>
        <span role="img" aria-label="heart-emoji">
          💕
        </span>{' '}
        The nwHacks team
      </StyledP>
      <HR />
      <StyledH2>Contact Information</StyledH2>
      <StyledP>
        Logistics team: <A href="mailto:logistics@nwplus.io">logistics@nwplus.io</A>
      </StyledP>
      <StyledP>Feel more than welcome to email us with any questions!</StyledP>
      <StyledP>
        <strong>#ask-organizers</strong> channel will be available for you for any questions that
        might arise during the event.
      </StyledP>
      <HR />
      <StyledH2>Hacker TODO's</StyledH2>
      <TodoColumnContainer>
        <TodoColumn>
          <StyledH3>Pre-hacking</StyledH3>
          <Checkbox
            label="Read the entirety of this nwHacks 2022 Hacker Info page"
            checked={states.preHacking.info}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, info: !states.preHacking.info },
              })
            }
          />
          <Checkbox
            label="Join the nwHacks 2022 Discord server"
            checked={states.preHacking.discord}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, discord: !states.preHacking.discord },
              })
            }
          />
          <Checkbox
            label="Follow the Discord bot’s instructions which should have been sent to you via DM when you joined the server to verify your email on our list!"
            checked={states.preHacking.verify}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, verify: !states.preHacking.verify },
              })
            }
          />
          <Checkbox
            label="Attend pre-hackathon workshops by our amazing sponsors!"
            checked={states.preHacking.workshops}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, workshops: !states.preHacking.workshops },
              })
            }
          />
        </TodoColumn>
        <TodoColumn>
          <StyledH3>The day of hacking</StyledH3>
          <Checkbox
            label="Enjoy your time at nwHacks 2022 and create something amazing with your team 😉"
            checked={states.dayOf.enjoy}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, enjoy: !states.dayOf.enjoy },
              })
            }
          />
          <Checkbox
            label="Attend Opening Ceremony"
            checked={states.dayOf.ceremony}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, ceremony: !states.dayOf.ceremony },
              })
            }
          />
          <Checkbox
            label="Attend workshops"
            checked={states.dayOf.workshops}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, workshops: !states.dayOf.workshops },
              })
            }
          />
          <Checkbox
            label="Get stamps by visiting sponsor booths and participating in mini activities"
            checked={states.dayOf.stamps}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, stamps: !states.dayOf.stamps },
              })
            }
          />
          <Checkbox
            label="Attend Sponsor Q&amp;A sessions"
            checked={states.dayOf.sponsor}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, sponsor: !states.dayOf.sponsor },
              })
            }
          />
          <Checkbox
            label="Interact with mentors by submitting mentor tickets"
            checked={states.dayOf.interact}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, interact: !states.dayOf.interact },
              })
            }
          />
        </TodoColumn>
        <TodoColumn>
          <StyledH3>Post-hacking</StyledH3>
          <Checkbox
            label="Peer judge at least 5 other projects in order for your project to be considered for prizes"
            checked={states.postHacking.judge}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, judge: !states.postHacking.judge },
              })
            }
          />
          <Checkbox
            label="Vote for most helpful mentor of nwHacks 2022"
            checked={states.postHacking.vote}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, vote: !states.postHacking.vote },
              })
            }
          />
          <Checkbox
            label="Fill out feedback form to share your thoughts about nwHacks 2022"
            checked={states.postHacking.feedback}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, feedback: !states.postHacking.feedback },
              })
            }
          />
          <Checkbox
            label="Attend Closing Ceremony"
            checked={states.postHacking.attend}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, attend: !states.postHacking.attend },
              })
            }
          />
        </TodoColumn>
      </TodoColumnContainer>
      <HR />
      <StyledH2>Our Online Platform: Discord!</StyledH2>
      <StyledP>
        All hacker interaction will be happening on our nwHacks 2022 Discord server. The nwPlus
        staff has been working hard to deliver a Discord Bot to facilitate hacker assistance at
        nwHacks 2022.
      </StyledP>
      <UL>
        <LI>
          Link to join our Discord can be found at{' '}
          <A href="https://discord.gg/nwhacks-2022" target="_blank" rel="noreferrer noopener">
            https://discord.gg/nwhacks-2022
          </A>
        </LI>
        <LI>
          Learn more about our nwPlus Discord Bot Commands{' '}
          <PortalLink href="/discord-bot">here</PortalLink>
        </LI>
        <LI>
          If you are unfamiliar with Discord, check out our{' '}
          <A
            href="https://www.notion.so/8fec58618b68464eba5b78c01902213d"
            target="_blank"
            rel="noreferrer noopener"
          >
            introductory Discord videos
          </A>
        </LI>
        <LI>
          We ask all hackers to familiarize themselves with our{' '}
          <A
            href="https://www.notion.so/nwplus/PUBLIC-Discord-Etiquette-and-Policies-fa1722736bd047c49c64d6cd1bd93590"
            target="_blank"
            rel="noreferrer noopener"
          >
            Discord Etiquette and Policies
          </A>
        </LI>
      </UL>
      <HR />
      <StyledH2>Schedule</StyledH2>
      <StyledP>
        The schedule for nwHacks 2022 can be found on the{' '}
        <PortalLink href="/schedule">schedule page</PortalLink>! Please also turn on the
        announcements notification to stay updated on our events!
      </StyledP>
      <HR />
      <StyledH2>Tag Us on Social Media! #nwHacks2022</StyledH2>
      <StyledP>Instagram, Facebook, Twitter: @nwplusubc</StyledP>
      <StyledP>
        Be sure to also follow all of our{' '}
        <A href="https://linktr.ee/nwplusubc" target="_blank" rel="noreferrer noopener">
          social media pages
        </A>{' '}
        to see event photos, behind-the-scenes sneak peeks, and be the first to know about all of
        our upcoming events!
      </StyledP>
    </>
  )
}
