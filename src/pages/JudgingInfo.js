import React from 'react'
import styled from 'styled-components'
import { H1, H2, P, UL, LI } from '../components/Typography'

const StyledH2 = styled(H2)`
  opacity: 1;
`

const StyledP = styled(P)`
  margin-top: 5px;
`

export default function JudgingInfo() {
  return (
    <>
      <H1>Judging Info</H1>
      <StyledH2>
        Disclaimer: We are NOT using Devpost for project submission. You will submit your project
        through the Portal
      </StyledH2>
      <StyledH2>Judging Phases</StyledH2>
      <StyledP>
        The judging system at nwHacks 2022 will follow three phases to determine the winners of the
        podium prizes. Note that sponsor prizes will not be following this system, the winners of
        sponsor prizes will be decided at the discretion of the appropriate sponsor.
      </StyledP>
      <UL>
        <LI>
          Phase 1 (Peer-to-peer) → Hackers will have the opportunity to submit their own feedback on
          projects through portal.nwplus.io. Please be genuine when submitting feedback, cases of
          malicious intent may be punished.
        </LI>
        <LI>Phase 2 (Mentors) → Projects will be opened to mentors for judging.</LI>
        <LI>
          Phase 3 (Panel Judges) → The remaining top 5 projects will present to our panel judges to
          determine the winners of nwHacks 2022. This stage will be held through private channels on
          the Discord server.
        </LI>
      </UL>
      <StyledH2>Judging Rubric</StyledH2>
      <StyledP>
        The following criteria will be evaluated by our judges and by your peers. No more
        information about the criteria will be shared by our judges or staff.
      </StyledP>
      <UL>
        <LI>
          Technology - Use and proficiency of the technologies(programming languages, APIs,
          software) used for the project
        </LI>
        <LI>Design - UI and UX, ease of use and accessibility</LI>
        <LI>
          Pitch + Impact - Demo preparedness, types of problems addressed and uniqueness of the
          solution
        </LI>
      </UL>

      <StyledH2>Prize Qualifications</StyledH2>
      <StyledP>In order to qualify for a prize, the following rules must be followed:</StyledP>
      <UL>
        <LI>
          Project code must be original, using code made before the start of the hacking period is
          not permitted
        </LI>
        <LI>Each team member must be a registered hacker at nwHacks</LI>
        <LI>Collaboration between two or more teams is not permitted</LI>
        <LI>All code must be available on a public repository (Github preferably)</LI>
        <LI>Judge all of the projects you are assigned during the peer-to-peer judging phase</LI>
        <LI>Video demo is maximum 4 minutes long</LI>
      </UL>
      <StyledH2>Prizes</StyledH2>
      {/* <>TODO</> */}
    </>
  )
}
