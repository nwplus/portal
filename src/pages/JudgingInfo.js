import React from 'react'
import styled from 'styled-components'
import { A, H1, H2, H3, P, UL, LI, HR } from '../components/Typography'

const StyledH2 = styled(H2)`
  opacity: 1;
`

const StyledH3 = styled(H3)`
  opacity: 1;
`

const StyledP = styled(P)`
  margin-top: 5px;
`

const StyledTable = styled.table`
  border: 1px solid ${p => p.theme.colors.text};
  border-collapse: collapse;

  th,
  td {
    border: 1px solid ${p => p.theme.colors.text};
    padding: 8px;
  }
`

export default function JudgingInfo() {
  return (
    <>
      <H1>Judging Info</H1>
      <StyledH2>
        Disclaimer: We are NOT using Devpost for project submission. You will submit your project
        through the Portal.
      </StyledH2>
      <HR />
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
      <HR />
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
      <HR />
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
      <HR />
      <StyledH2>Prizes</StyledH2>
      <StyledH3>Podium Prizes</StyledH3>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Prize (CAD)</th>
        </tr>
        <tr>
          <td>First Place</td>
          <td>CA$2,000.00</td>
        </tr>
        <tr>
          <td>Second Place</td>
          <td>CA$1,250.00</td>
        </tr>
        <tr>
          <td>Third Place</td>
          <td>CA$750.00</td>
        </tr>
        <tr>
          <td>Honourable Mention</td>
          <td>CA$200.00</td>
        </tr>
      </StyledTable>
      <StyledH3>Sponsor Prizes</StyledH3>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Prize (CAD)</th>
          <th>Details</th>
        </tr>
        <tr>
          <td>Covalent Bounty Prizes</td>
          <td>Bounty prizes in two categories valued at $2,500 USD in total</td>
          <td>
            <p>Category 1. Developer Mode dApps</p>
            <p>
              $2,000 USD (equivalent in a stablecoin) prize pool to the top 3 projects making use of
              the Covalent API.
            </p>
            <p>Category 2. No-Code Analyst Mode</p>
            <p>
              $500 USD (equivalent in a stablecoin) to the top project making use of the Covalent
              API data in tabular format or with a no-code tool.
            </p>
            <p>
              More information:{' '}
              <A href="https://tinyurl.com/covalentprize" target="_blank">
                https://tinyurl.com/covalentprize
              </A>
            </p>
          </td>
        </tr>
        <tr>
          <td>TTT Studio Get Unique with Unity</td>
          <td>
            $200 gift card for an outing to{' '}
            <A href="https://evolvevr.ca" target="_blank">
              Evolve Virtual Reality
            </A>{' '}
            + TTT Merchandise
          </td>
          <td>
            <p>
              Judges will be looking for creativity and how well you’ve leveraged Unity’s
              technologies to develop a unique experience.
            </p>
            <p>
              More information:{' '}
              <A href="https://tinyurl.com/tttstudiosprize" target="_blank">
                https://tinyurl.com/tttstudiosprize
              </A>
            </p>
          </td>
        </tr>
        <tr>
          <td>Kabam Best UX/UI</td>
          <td>$50 Uber Eats Gift Cards</td>
          <td>
            <p>
              Judges will be looking for a solution with an appealing design and seamless journey
              flow. They will be looking for designs that add to the enjoyment, engagement, and ease
              of use of the solution!
            </p>
            <p>
              More information:{' '}
              <A href="https://tinyurl.com/kabamuxprize" target="_blank">
                https://tinyurl.com/kabamuxprize
              </A>
            </p>
          </td>
        </tr>
        <tr>
          <td>Microsoft Best use of Azure</td>
          <td>$2000 + Dinner with Microsoft team</td>
          <td>
            <p>
              To qualify for this prize your project must utilize at least one of the ACS UI
              libraries.
            </p>
            <p>
              More information:{' '}
              <A href="https://tinyurl.com/microsoft-sponsor-prize" target="_blank">
                https://tinyurl.com/microsoft-sponsor-prize
              </A>
            </p>
          </td>
        </tr>
        <tr>
          <td>OpenAI Best use of OpenAI API</td>
          <td>
            <p>1st place winners: $120 worth of tokens</p>
            <p>2nd place winners: $60 worth of tokens</p>
          </td>
          <td>
            <p>To qualify for this prize the project must use OpenAI API.</p>
            <p>
              More information:{' '}
              <A href="https://tinyurl.com/openaiprize" target="_blank">
                https://tinyurl.com/openaiprize
              </A>
            </p>
          </td>
        </tr>
        <tr>
          <td>Various MLH Prizes</td>
          <td>See details</td>
          <td>
            <p>
              Various MLH prizes are up for grabs! See the link below for details and how to
              qualify.
            </p>
            <p>
              <A href="https://tinyurl.com/mlhprizes" target="_blank">
                https://tinyurl.com/mlhprizes
              </A>
            </p>
          </td>
        </tr>
      </StyledTable>
    </>
  )
}
