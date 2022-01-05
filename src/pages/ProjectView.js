import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { H1, P } from '../components/Typography'

import { getSubmission } from '../utility/firebase'
import { MAX_CHARACTERS_IN_DESCRIPTION } from '../utility/Constants'
import { cutString } from '../utility/utilities'
import { Loading } from '../components/HeroPage'
import Youtube from '../components/Youtube'

const StyledProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledYoutube = styled(Youtube)`
  width: 600px;
  height: 350px;
  border-radius: 3px;
`

const Project = ({ project }) => {
  return (
    <StyledProjectContainer>
      <H1>{project.title}</H1>
      <StyledYoutube src={project.youtubeUrl} />
      <P>{cutString(project.shortDescription, MAX_CHARACTERS_IN_DESCRIPTION)}</P>
      <p>{project.longDescription}</p>
      <p>{project.teamMembers}</p>
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
