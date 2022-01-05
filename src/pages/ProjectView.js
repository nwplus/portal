import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { H1, H2, P } from '../components/Typography'

import { getSubmission } from '../utility/firebase'
import { MAX_CHARACTERS_IN_DESCRIPTION } from '../utility/Constants'
import { cutString, hexToRgba } from '../utility/utilities'
import { Loading } from '../components/HeroPage'
import Youtube from '../components/Youtube'
import { Button } from '../components/Input'

const StyledProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 50px;
`

const StyledYoutube = styled(Youtube)`
  width: 600px;
  height: 350px;
  border-radius: 3px;
`
const StyledBanner = styled.div`
  ${p => `
    color: ${p.theme.colors.primary};
    background: ${hexToRgba(p.theme.colors.primary, 0)};
    border: 1px solid ${p.theme.colors.primary};`}
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
`

const StyledH1 = styled(H1)`
  color: inherit;
  margin-bottom: 16px;
`

const StyledP = styled(P)`
  color: inherit;
  margin-bottom: 21px;
`

const StyledH2 = styled(H2)`
  opacity: 1;
`

const Project = ({ project }) => {
  return (
    <StyledProjectContainer>
      <StyledBanner>
        <StyledH1>{project.title}</StyledH1>
        <StyledP>Created By: {project.teamMembers.join(' | ')}</StyledP>
      </StyledBanner>
      <P>{cutString(project.shortDescription, MAX_CHARACTERS_IN_DESCRIPTION)}</P>
      <StyledYoutube src={project.youtubeUrl} />
      <div>
        <StyledH2>Long Description</StyledH2>
        <P>{project.longDescription}</P>
      </div>
      <div>
        <StyledH2>Relevant Links</StyledH2>
        <div>
          {project.links.map(link => (
            <Button color="primary" width="flex" href={link}>
              {link}
            </Button>
          ))}
        </div>
      </div>
    </StyledProjectContainer>
  )
}

export default ({ pid }) => {
  const [projectInfo, setProjectInfo] = useState(null)

  const getProject = async () => {
    const projectData = await getSubmission(pid)
    console.log(projectData, ' logging the result of getting submission')
    if (projectData.exists) {
      setProjectInfo(!projectData ? null : projectData)
    } else {
      setProjectInfo(null)
    }
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !!projectInfo ? <Project project={projectInfo} /> : <Loading />
}
