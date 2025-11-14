import React from 'react'
import styled from 'styled-components'
import { StyledCSVLink } from '../../../containers/JudgingPanel'
import Accordion from '../../Accordion'
import { CardLike } from '../../Common'
import { Button } from '../../Input'
import { H1 } from '../../Typography'
import { useHackathon } from '../../../utility/HackathonProvider'
import { JUDGING_RUBRIC, calculateGrade } from '../../../utility/Constants'

const SuperlativePrize = styled.div`
  ${CardLike};
  padding: 0.25em 0.5em;
  margin: 0.5em;
`

const EntriesList = styled.ul`
  color: ${p => p.theme.colors.foreground};
  margin-top: 0;
  cursor: default;
`

const LinkContainer = styled.div`
  padding: 0.5em;
`

const SuperlativeSubmissions = ({ superlativePrizes }) => {
  const { activeHackathon } = useHackathon()
  const getCsvFriendlyData = projects => {
    const formattedProjects = projects.map(project => {
      const portalLink = window.location.origin // to support local development as well
      const projectInfo = {
        'Title': project.title,
        'Link': `${portalLink}/app/${activeHackathon}/projects/${project.id}`,
        'Devpost': project.links.devpost,
        'Charity choice': project.charityChoice,
      }
      // compute average scores per rubric and overall grade if grades exist
      if (project.grades && Object.keys(project.grades).length > 0) {
        const totals = {}
        const gradeEntries = Object.values(project.grades)
        const count = gradeEntries.length

        gradeEntries.forEach(grade => {
          Object.entries(grade).forEach(([key, value]) => {
            if (typeof value !== 'number') return
            totals[key] = (totals[key] || 0) + value
          })
        })

        // Attach averages for each rubric item
        const avgForCalc = {}
        JUDGING_RUBRIC.forEach(item => {
          const avg = totals[item.id] ? totals[item.id] / count : 0
          // use the rubric id as the CSV column header to match other exports
          projectInfo[item.id] = Number.isFinite(avg) ? avg.toFixed(2) : ''
          avgForCalc[item.id] = avg
        })

        // Overall grade based on averaged rubric values
        projectInfo['Overall grade'] = calculateGrade(avgForCalc)
      } else {
        // ensure rubric headers exist even if no grades present
        JUDGING_RUBRIC.forEach(item => {
          projectInfo[item.id] = ''
        })
        projectInfo['Overall grade'] = ''
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
      <H1>Projects by Superlative Prizes</H1>
      {Object.keys(superlativePrizes).map(
        (prize, i) =>
          superlativePrizes[prize].length > 0 && (
            <SuperlativePrize key={i}>
              <Accordion cursor="default" heading={prize} key={prize}>
                <EntriesList>
                  {superlativePrizes[prize].map((submission, i) =>
                    submission && submission.draftStatus === 'public' ? (
                      <li key={submission.id || idx}>{submission.title}</li>
                    ) : null
                  )}
                </EntriesList>
                <Button color="secondary" width="medium">
                  <LinkContainer>
                    <StyledCSVLink
                      data={getCsvFriendlyData(superlativePrizes[prize])}
                      filename={`projects_of_${prize.replace(' ', '_')}.csv`}
                      target="_blank"
                    >
                      Download CSV
                    </StyledCSVLink>
                  </LinkContainer>
                </Button>
              </Accordion>
            </SuperlativePrize>
          )
      )}
    </div>
  )
}

export default SuperlativeSubmissions
