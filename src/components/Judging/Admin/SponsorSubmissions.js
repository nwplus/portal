import React from 'react'
import styled from 'styled-components'
import Accordion from '../../Accordion'
import { H1 } from '../../Typography'
import { CardLike } from '../../Common'
import { StyledCSVLink } from '../../../containers/JudgingPanel'

const SponsorPrize = styled.div`
  ${CardLike};
  padding: 0.25em 0.5em;
  margin: 0.5em;
`

const EntriesList = styled.ul`
  margin-top: 0;
  cursor: default;
`

const LinkContainer = styled.div`
  padding: 0.5em;
`

export default ({ sponsorPrizes }) => {
  const getCsvFriendlyData = projects => {
    console.log('hi')
    const formattedProjects = projects.map(project => {
      const portalLink = window.location.origin // to support local development as well
      const projectInfo = {
        Title: project.title,
        Link: `${portalLink}/projects/${project.id}`,
        Devpost: project.links.devpost,
        'Charity choice': project.charityChoice,
      }
      project.teamMembers.forEach((member, index) => {
        projectInfo[`Member ${index + 1} Name`] = member.name
        projectInfo[`Member ${index + 1} Email`] = member.email
        projectInfo[`Member ${index + 1} Discord`] = member.discord
      })
      return projectInfo
    })
    return formattedProjects
  }

  return (
    <div>
      <H1>Projects by Sponsor Prizes</H1>
      {Object.keys(sponsorPrizes).map(
        (prize, i) =>
          sponsorPrizes[prize].length > 0 && (
            <SponsorPrize key={i}>
              <Accordion cursor="default" heading={prize} key={prize}>
                <EntriesList>
                  {sponsorPrizes[prize].map((submission, i) => (
                    <li key={i}>
                      {submission.title}{' '}
                      {submission.draftStatus === 'public' ? 'Published (Submitted)' : 'Draft Only'}
                    </li>
                  ))}
                </EntriesList>
                <LinkContainer>
                  <StyledCSVLink
                    data={getCsvFriendlyData(sponsorPrizes[prize])}
                    filename={`projects_of_${prize.replace(' ', '_')}.csv`}
                    target="_blank"
                  >
                    Download CSV
                  </StyledCSVLink>
                </LinkContainer>
              </Accordion>
            </SponsorPrize>
          )
      )}
    </div>
  )
}
