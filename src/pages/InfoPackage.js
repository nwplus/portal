import React from 'react'
import styled from 'styled-components'
import { H1, H2, P, A, UL, LI, HR, Code, PortalLink } from '../components/Typography'

const StyledH2 = styled(H2)`
  opacity: 1;
  ${p => p.noMargin && 'margin: 0;'}
`
const StyledP = styled(P)`
  margin-top: 5px;
`
const StyledUL = styled(UL)`
  margin: 0;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
`
const InfoSection = styled.div`
  flex: 1 0 200px;
  display: flex;
  flex-direction: column;
`

export default () => {
  return (
    <>
      <H1>Info Package</H1>
      <StyledH2>Workshops</StyledH2>
      <StyledP>
        <strong>Before and throughout nwHacks</strong>, we will be hosting workshops on a wide array
        of topics. You will get the chance to learn something new and connect with industry
        professionals.
      </StyledP>
      <StyledP>
        Links and times for the workshops can be found on the{' '}
        <PortalLink href="/schedule">schedule page</PortalLink> or through Discord Events
        functionality.
      </StyledP>
      <HR />
      <StyledH2>Sponsor Booth</StyledH2>
      <StyledP>
        Boothing hours is the place where you can connect, discuss, and make meaningful connections
        with sponsor reps, as well as ask questions and receive feedback on the sponsored
        prize/challenge.
      </StyledP>
      <StyledUL>
        <LI>Pre-hacking boothing time (8:30 AM - 10:00 PM PST)</LI>
        <LI>Post-hacking boothing time (1:00 PM - 4:00 PM PST)</LI>
        <LI>
          Spontaneous sponsor booths during hacking time- Once booths are open, we’ll let you know!
        </LI>
      </StyledUL>
      <StyledP>
        Links and times for the boothings can be found on the{' '}
        <PortalLink href="/schedule">schedule page</PortalLink> or through Discord Events
        functionality.
      </StyledP>
      <HR />
      <StyledH2>Mini Activities</StyledH2>
      <StyledP>
        <strong>Stamp card raffle:</strong> Using the Discord bot, you can collect a stamp for each
        workshop, sponsor booth, and mini activity attended. Each stamp will be an entry to a raffle
        to win a mystery prize!
      </StyledP>
      <StyledP>
        <strong>Discord contest:</strong> Every once in a while, one of the nwPlus organizers will
        ask you a question regarding tech, nwPlus, and our sponsors. The first person to get each
        question correct will win a mystery prize!
      </StyledP>
      <StyledP>
        There are many other mini activities that are planned throughout nwHacks to give you a fun
        break from hacking and the opportunity to win something cool.
      </StyledP>
      <HR />
      <StyledH2>Swag</StyledH2>
      <StyledP>
        The nwPlus team will be sending out stickers to thank you for your participation.
      </StyledP>
      <StyledP>
        To minimize environmental impact, we decided to implement an opt-in system for swags. If you
        are willing to receive MLH swags as well as nwHacks specific swag, please fill the below
        Address form.
      </StyledP>
      <StyledP>
        <A href="https://majorleaguehacking.typeform.com/to/prgvE4AV?typeform-source=hackp.ac">
          Shipping Address Form (MLH)
        </A>
      </StyledP>
      <StyledP>
        <A href="https://forms.gle/snthRE15an29Cr1G7">Shipping Address Form (nwHacks)</A>
      </StyledP>
      <HR />
      <StyledH2>Prizes</StyledH2>
      <InfoWrapper>
        <InfoSection>
          <StyledH2 noMargin>Podium Prizes</StyledH2>
          <StyledUL>
            <LI>1st Place: CA$1,800 for 1 team</LI>
            <LI>2nd Place: CA$1,200 for 1 team</LI>
            <LI>3rd Place: CA$700 for 1 team</LI>
            <LI>Honourable Mention: CA$200 for 3 teams</LI>
          </StyledUL>
        </InfoSection>
        <InfoSection>
          <StyledH2 noMargin>Sponsor Prizes</StyledH2>
          <StyledUL>
            <LI>
              <strong>TTT Studio's</strong> Get Unique with Unity{' '}
            </LI>
            <LI>
              <strong>Covalent's</strong> Web3 in Your nwHacks Project
            </LI>
            <LI>
              <strong>Kabam's</strong> Best UX/UI
            </LI>
            <LI>
              <strong>Microsoft's</strong> Best Use of Azure ACS
            </LI>
            <LI>
              <strong>OpenAI's</strong> Best Use of OpenAI API
            </LI>
            <LI>
              <strong>MLH’s</strong> multiple sponsor challenges and prizes:{' '}
              <A href="https://hack.mlh.io/prizes" target="_blank">
                https://hack.mlh.io/prizes
              </A>
            </LI>
          </StyledUL>
        </InfoSection>
        <InfoSection>
          <StyledH2 noMargin>Mini activity Prizes</StyledH2>
          <StyledUL>
            <LI>Stamp card raffle: mystery prize for 20 hackers</LI>
            <LI>
              Craver-nwHacks raffle: fill out{' '}
              <A href="https://forms.gle/uZRixK7yp8Th715B8" target="_blank">
                this form
              </A>{' '}
              to win some cool gaming peripherals sponsored by Craver Solutions
            </LI>
            <LI>Discord contests: mystery prize for 20 hackers</LI>
          </StyledUL>
          <StyledP>
            Participate in other mini activities during nwHacks 2022 for more prizes valued +CA$200!
          </StyledP>
        </InfoSection>
      </InfoWrapper>
      <StyledP>
        Detailed description, qualifications and judging criteria on the above prizes will be
        released the two days before nwHacks 2022.
      </StyledP>
      <HR />
      <StyledH2>Discounts and Freebies</StyledH2>
      <StyledP>
        MLH partnered with some amazing technology companies to get you free access to their APIs
        this weekend! Find out more on{' '}
        <A href="https://hack.mlh.io/software" target="_blank">
          https://hack.mlh.io/software
        </A>
        .
      </StyledP>
      <StyledP>
        Craver Solutions is giving out their t-shirt swag to the first 100 people! Go fill out this{' '}
        <A href="https://docs.google.com/forms/d/e/1FAIpQLSc6pPCUFtS9v88iOJIHj23WE0EWr9UyqWAb103c1TBVm93n_A/viewform">
          Google Form
        </A>{' '}
        and be one of the lucky hackers to get a free t-shirt.{''}
      </StyledP>
      <HR />
      <StyledH2>More Info</StyledH2>
      <StyledP>
        Here are some Medium articles created by our fellow nwPlus staff that will help you get
        started with your projects!
      </StyledP>
      <StyledUL>
        <LI>
          <A href="https://resources.nwplus.io/" target="_blank">
            Self Learning Resources Wiki: Everything About Coding
          </A>
        </LI>
        <LI>
          <A
            href="https://medium.com/nwplusubc/hackathons-101-your-guide-to-nwhacks-a5aeb80b0579"
            target="_blank"
          >
            {' '}
            Hackathons 101: Your Guide to nwHacks
          </A>
        </LI>
        <LI>
          <A href="https://medium.com/nwplusubc/hackathon-timeline-9cdcd1825bd4" target="_blank">
            Timeline of a Hackathon
          </A>
        </LI>
      </StyledUL>
      <HR />
      <StyledH2>Reporting</StyledH2>
      <StyledP>
        <strong>
          Here is a list of the different guidelines that all participants must follow.
        </strong>
      </StyledP>
      <UL>
        <LI>
          <A href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">
            MLH Code of Conduct
          </A>
        </LI>
        <LI>
          <A
            href="https://www.notion.so/nwplus/PUBLIC-Discord-Etiquette-and-Policies-35c5dc4f0ccf45efa0ea390babc88549"
            target="_blank"
          >
            Discord Etiquette and Policies
          </A>
        </LI>
      </UL>
      <StyledP>
        If you witness any behaviour that does not align with these guidelines (or are unsure if it
        does), please report it to us by using the following Discord command: <Code>!report</Code>
      </StyledP>
      <StyledP>
        Our priority at all nwPlus events is to provide a safe and inclusive space for everyone.
        Reports will be handled immediately, and if you have any questions please reach out to a
        nwPlus organizer.
      </StyledP>
    </>
  )
}
