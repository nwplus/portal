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

const GettingStarted = () => {
  const [states, setStates] = useState({
    preHacking: { info: false, discord: false, workshops: false, verify: false, notion: false },
    dayOf: {
      attend: false,
      enjoy: false,
      ceremony: false,
      workshops: false,
      stamps: false,
      sponsor: false,
      interact: false,
      hydrate: false,
    },
    postHacking: { judge: false, vote: false, feedback: false, ceremony: false },
  })

  return (
    <>
      <H1>Getting Started</H1>
      <StyledH2>Welcome to HackCamp 2022!</StyledH2>
      <StyledP>
        Welcome to HackCamp: an immersive experience where a collective of inspired minds unite to
        learn, connect, and create. During this two-day adventure, you will have the chance to meet
        with industry-level professionals, attend a variety of design, development, and
        entrepreneurial workshops, and collaborate alongside a team of fellow hackers to craft and
        pitch your unique project. At nwPlus, we strive for inclusivity, diversity, and
        accessibility at the core of our community; no matter your background, skill set, or story,
        we are ecstatic to learn more about you, your vision, and the ideas you offer to build and
        grow the world we share. This is your great unknown — explore the resources at your
        fingertips, advance through new frontiers, and make your own mark in this vast cosmos of
        possibility.
      </StyledP>
      <HR />
      <StyledH2>Contact Information</StyledH2>
      <StyledP>
        Logistics team: <A href="mailto:hackcamp@nwplus.io">hackcamp@nwplus.io</A>
      </StyledP>
      <StyledP>Feel more than welcome to email us with any questions!</StyledP>
      <StyledP>
        <strong>#questions</strong> channel will be available for you for any questions that might
        arise during the event.
      </StyledP>
      <HR />
      <StyledH2>Hacker TODO's</StyledH2>
      <TodoColumnContainer>
        <TodoColumn>
          <StyledH3>Pre-hacking</StyledH3>
          <Checkbox
            label="Read the entirety of this HackCamp 2022 Getting Started page on portal"
            checked={states.preHacking.info}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, info: !states.preHacking.info },
              })
            }
          />
          <Checkbox
            label="Read the entirety of the HackCamp 2022 Hacker Package (link in the RSVP Confirmation Email)"
            checked={states.preHacking.notion}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, notion: !states.preHacking.notion },
              })
            }
          />
          <Checkbox
            label="Join the HackCamp 2022 Slack server (link in the RSVP Confirmation Email & Hacker Package)"
            checked={states.preHacking.discord}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, discord: !states.preHacking.discord },
              })
            }
          />
          <Checkbox
            label="Attend pre-hackathon workshops hosted by our amazing organizers!"
            checked={states.preHacking.verify}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, verify: !states.preHacking.verify },
              })
            }
          />
          {/* <Checkbox
            label="Attend pre-hackathon workshops by our amazing sponsors!"
            checked={states.preHacking.workshops}
            onChange={() =>
              setStates({
                ...states,
                preHacking: { ...states.preHacking, workshops: !states.preHacking.workshops },
              })
            }
          /> */}
        </TodoColumn>
        <TodoColumn>
          <StyledH3>The day of hacking</StyledH3>
          <Checkbox
            label="Enjoy your time at HackCamp 2022 and create something amazing with your team!"
            checked={states.dayOf.enjoy}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, enjoy: !states.dayOf.enjoy },
              })
            }
          />
          <Checkbox
            label="Attend Opening Ceremonies!"
            checked={states.dayOf.ceremony}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, ceremony: !states.dayOf.ceremony },
              })
            }
          />
          <Checkbox
            label="Participate in mini activities and complete the engagement stamp card for prizes!"
            checked={states.dayOf.workshops}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, workshops: !states.dayOf.workshops },
              })
            }
          />
          <Checkbox
            label="Interact with mentors by asking questions in the #mentor-help channel or visiting them in the LIFE building"
            checked={states.dayOf.stamps}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, stamps: !states.dayOf.stamps },
              })
            }
          />
          {/* <Checkbox
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
            label="Interact with mentors by submitting mentor tickets on Discord"
            checked={states.dayOf.interact}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, interact: !states.dayOf.interact },
              })
            }
          /> */}
          <Checkbox
            label="Take care of yourself and stay hydrated"
            checked={states.dayOf.hydrate}
            onChange={() =>
              setStates({
                ...states,
                dayOf: { ...states.dayOf, hydrate: !states.dayOf.hydrate },
              })
            }
          />
        </TodoColumn>
        <TodoColumn>
          <StyledH3>Post-hacking</StyledH3>
          <Checkbox
            label="Peer judge 4 other projects in order for your project to be considered for prizes"
            checked={states.postHacking.judge}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, judge: !states.postHacking.judge },
              })
            }
          />
          <Checkbox
            label="Fill out the feedback form and share your thoughts about HackCamp"
            checked={states.postHacking.vote}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, vote: !states.postHacking.vote },
              })
            }
          />
          <Checkbox
            label="Attend closing ceremonies!"
            checked={states.postHacking.feedback}
            onChange={() =>
              setStates({
                ...states,
                postHacking: { ...states.postHacking, feedback: !states.postHacking.feedback },
              })
            }
          />
          <Checkbox
            label="Give yourself a pat on the back for a weekend of hard work! :')"
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
      <StyledH2>Our Online Platform: Slack!</StyledH2>
      <StyledP>
        The primary form of hacker communication will be on our HackCamp 2022 Slack server.
      </StyledP>
      <UL>
        <LI>
          Link to join our Slack server can be found{' '}
          <A
            target="_blank"
            rel="noreferrer noopener"
            href="https://join.slack.com/t/hackcamp-2022/shared_invite/zt-1hwpxaelx-ILbPpOazWCbkTaK0WKwFsw"
          >
            here
          </A>
        </LI>
        {/* <LI>
          Learn more about our nwPlus Discord Bot Commands{' '}
          <PortalLink href="/discord-bot">here</PortalLink>
        </LI> 
        <LI>
          If you are unfamiliar with Discord, check out our{' '}
          <A
            href="https://www.notion.so/nwplus/PUBLIC-Discord-Guide-8fec58618b68464eba5b78c01902213d"
            target="_blank"
            rel="noreferrer noopener"
          >
            introductory Discord videos
          </A>
        </LI> */}
        <LI>
          We ask all hackers to familiar themselves with the rules of etiquette in the #rules
          channel
        </LI>
      </UL>
      <HR />
      <StyledH2>Schedule</StyledH2>
      <StyledP>
        The schedule for HackCamp 2022 can be found on the{' '}
        <PortalLink href="/schedule">schedule page</PortalLink>! Please also turn on the
        notifications for the #announcements channel on Slack to stay updated on our events!
      </StyledP>
      <HR />
      <StyledH2>Tag Us on Social Media! #hackcamp2022</StyledH2>
      <StyledP>Instagram and Facebook: @nwplusubc</StyledP>
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

export default GettingStarted
