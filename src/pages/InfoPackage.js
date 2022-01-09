import React from 'react'
import styled from 'styled-components'
import { H1, H2, P, A, UL, LI } from '../components/Typography'

const StyledH2 = styled(H2)`
  opacity: 1;
`
const StyledP = styled(P)`
  margin-top: 5px;
`
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`
const InfoSection = styled.div`
  max-width: 600px;
  padding: 0 30px 0 30px;
`

export default () => {
  return (
    <>
      <H1>Info Package</H1>
      <InfoWrapper>
        <InfoSection>
          <StyledH2>Mini Activities</StyledH2>
          <StyledP>
            <strong>Stamp card raffle:</strong> Using the discord bot, you can collect a stamp for
            each workshop, sponsor booth, and mini activity attended. Each stamp will be an entry to
            a raffle to win a mystery prize!
          </StyledP>
          <StyledP>
            <strong>Discord contest:</strong> Every once in a while, one of the nwPlus organizers
            will ask you a question regarding tech, nwPlus, and our sponsors. The first person to
            get each question correct will win a mystery prize!
          </StyledP>
          <StyledP>
            There are many other mini activities that are planned throughout nwHacks to give you a
            fun break from hacking and the opportunity to win something cool.
          </StyledP>
        </InfoSection>
        <InfoSection>
          <StyledH2>Sponsor Booth</StyledH2>
          <StyledP>
            Boothing hours is the place where you can connect, discuss, and make meaningful
            connections with sponsor reps, as well as ask questions and receive feedback on the
            sponsored prize/challenge.
          </StyledP>
          <UL>
            <LI>Pre-hacking boothing time (8:30 AM - 10:00 PM PST)</LI>
            <LI>Pre-hacking boothing time (8:30 AM - 10:00 PM PST)</LI>
            <LI>
              Spontaneous sponsor booths during hacking time- Once booths are open, we’ll let you
              know!
            </LI>
          </UL>
          <StyledP>Links and times for the boothings can be found on the "schedule" page.</StyledP>
        </InfoSection>
      </InfoWrapper>
      <InfoWrapper>
        <InfoSection>
          <StyledH2>Workshops</StyledH2>
          <StyledP>
            <strong>Before and throughout nwHacks</strong>, we will be hosting workshops on a wide
            array of topics. You will get the chance to learn something new and connect with
            industry professionals.
          </StyledP>
          <StyledP>Links and times for the workshops can be found on the "schedule" page.</StyledP>
        </InfoSection>
        <InfoSection>
          <StyledH2>Swag</StyledH2>
          <StyledP>
            The nwPlus team will be sending out stickers to thank you for your participation.
          </StyledP>
          <StyledP>
            To minimize environmental impact, we decided to implement an opt-in system for swags. If
            you are willing to receive MLH swags as well as nwHacks specific swag, please fill the
            below Address form.
          </StyledP>
          <StyledP>
            <A href="https://majorleaguehacking.typeform.com/to/prgvE4AV?typeform-source=hackp.ac">
              Shipping Address Form
            </A>
          </StyledP>
        </InfoSection>
      </InfoWrapper>
      <H1>Prizes</H1>
      <InfoWrapper>
        <InfoSection>
          <StyledH2>Podium Prizes</StyledH2>
          <UL>
            <LI>1st Place: CA$1,800 for 1 team</LI>
            <LI>2nd Place: CA$1,200 for 1 team</LI>
            <LI>3rd Place: CA$700 for 1 team</LI>
            <LI>Honourable Mention: CA$200 for 3 teams</LI>
          </UL>
        </InfoSection>
        <InfoSection>
          <StyledH2>Sponsor Prizes</StyledH2>
          <UL>
            <LI>
              <strong>TTT Studio's</strong> Get Unique with Unity{' '}
            </LI>
            <LI>
              <strong>Covalent's</strong> Web3 in Your nwHacks Project
            </LI>
            <LI>
              <strong>MLH’s</strong> multiple sponsor challenges and prizes →{' '}
              <A href="https://hack.mlh.io/prizes">https://hack.mlh.io/prizes</A>
            </LI>
            <LI>More sponsor challenges and prizes to be added! Stay tuned!</LI>
          </UL>
        </InfoSection>
        <InfoSection>
          <StyledH2>Mini activity Prizes</StyledH2>
          <UL>
            <LI>Stamp card raffle: mystery prize for 30 hackers</LI>
            <LI>Discord contests: mystery prize for 20 hackers</LI>
          </UL>
          <StyledP>
            Participate in other mini activities during nwHacks 2022 for more prizes valued +CA$200!
          </StyledP>
        </InfoSection>
      </InfoWrapper>
      <StyledP>
        Detailed description, qualifications and judging criteria on the above prizes will be
        released the two days before nwHacks 2022.
      </StyledP>
      <H1>Discounts and Freebies</H1>
      <StyledP>
        MLH partnered with some amazing technology companies to get you free access to their APIs
        this weekend! Find out more on{' '}
        <A href="https://hack.mlh.io/software">https://hack.mlh.io/software</A>.
      </StyledP>
      <H1>More Info</H1>
      <StyledP>
        Here are some Medium articles created by our fellow nwPlus staff that will help you get
        started with your projects!
      </StyledP>
      <UL>
        <LI>
          <A href="https://resources.nwplus.io/">
            Self Learning Resources Wiki: Everything About Coding
          </A>
        </LI>
        <LI>
          <A href="https://medium.com/nwplusubc/hackathons-101-your-guide-to-nwhacks-a5aeb80b0579">
            {' '}
            Hackathons 101: Your Guide to nwHacks
          </A>
        </LI>
        <LI>
          <A href="https://medium.com/nwplusubc/hackathon-timeline-9cdcd1825bd4">
            Timeline of a Hackathon
          </A>
        </LI>
      </UL>
      <H1>Reporting</H1>
      <StyledP>
        <strong>
          Here is a list of the different guidelines that all participants must follow.
        </strong>
      </StyledP>
      <UL>
        <LI>
          <A href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</A>
        </LI>
        <LI>
          <A href="https://www.notion.so/nwplus/PUBLIC-Discord-Etiquette-and-Policies-35c5dc4f0ccf45efa0ea390babc88549">
            Discord Etiquette and Policies
          </A>
        </LI>
        <LI>
          <A href="https://nwhacks2021.devpost.com/rules">nwHacks 2021 Project Submission Rules</A>
        </LI>
      </UL>
      <StyledP>
        If you witness any behaviour that does not align with these guidelines (or are unsure if it
        does), please report it to us by using the following discord command: !report
      </StyledP>
      <StyledP>
        Our priority at all nwPlus events is to provide a safe and inclusive space for everyone.
        Reports will be handled immediately, and if you have any questions please reach out to a
        nwPlus organizer.
      </StyledP>
    </>
  )
}
