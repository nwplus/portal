import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { H1, P } from '../components/Typography'

import { getSubmission } from '../utility/firebase'
import { MAX_CHARACTERS_IN_DESCRIPTION } from '../utility/Constants'
import { cutString, hexToRgba } from '../utility/utilities'
import { Loading } from '../components/HeroPage'
import Youtube from '../components/Youtube'

const StyledProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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

const BannerStyledH1 = styled(H1)`
  color: inherit;
  margin-bottom: 16px;
`

const BannerStyledP = styled(P)`
  color: inherit;
  margin-bottom: 21px;
`

const Project = ({ project }) => {
  return (
    <StyledProjectContainer>
      <StyledBanner>
        <BannerStyledH1>{project.title}</BannerStyledH1>
        <BannerStyledP>Created By: {project.teamMembers.join(' | ')}</BannerStyledP>
      </StyledBanner>
      <P>{cutString(project.shortDescription, MAX_CHARACTERS_IN_DESCRIPTION)}</P>
      <StyledYoutube src={project.youtubeUrl} />
      <p>{project.longDescription}</p>

      <p>{project.links}</p>
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
