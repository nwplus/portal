import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { H1, H2, P } from '../components/Typography'

import { getSubmission } from '../utility/firebase'
import { Loading } from '../components/HeroPage'
import Youtube from '../components/Youtube'
import { Button } from '../components/Input'
import { NotFound } from '.'

const StyledProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 0 50px;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
`

const LinkContainer = styled.div`
  display: flex;
  justify-contents: center;
`

const StyledYoutube = styled(Youtube)`
  width: 600px;
  height: 350px;
  border-radius: 3px;
`
const StyledBanner = styled.div`
  ${p => `
    color: ${p.theme.colors.text};
    background: transparent;
    border: 1px solid ${p.theme.colors.text};`}
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

const StyledButton = styled(Button)`
  margin-top: 0;
`

const Project = ({ project }) => {
  const teamMembers = Object.values(project.teamMembers).map(member => member.name)

  const getDisplayName = linkKey => {
    switch (linkKey) {
      case 'devpost':
        return 'Devpost'
      case 'youtube':
        return 'YouTube'
      case 'sourceCode':
        return 'Source code'
      default:
        return null
    }
  }

  return (
    <StyledProjectContainer>
      <StyledBanner>
        <StyledH1>{project.title}</StyledH1>
        <StyledP>Created By: {teamMembers.join(' | ')}</StyledP>
      </StyledBanner>
      <StyledYoutube src={project.links.youtube} />
      <StyledDiv>
        <StyledH2>Description</StyledH2>
        <P>{project.description}</P>
      </StyledDiv>
      <StyledDiv>
        <StyledH2>Relevant Links</StyledH2>
        <LinkContainer>
          {Object.entries(project.links).map(([key, link]) => {
            const cleanedUpLink = link.replace(/https?:\/\//, '')
            return (
              <StyledButton
                color="primary"
                width="flex"
                href={`//${cleanedUpLink}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getDisplayName(key) ?? cleanedUpLink}
              </StyledButton>
            )
          })}
        </LinkContainer>
      </StyledDiv>
    </StyledProjectContainer>
  )
}

export default ({ pid }) => {
  const [loading, setLoading] = useState(true)
  const [projectInfo, setProjectInfo] = useState(null)

  const getProject = async () => {
    const projectData = await getSubmission(pid)
    if (projectData.exists) {
      setProjectInfo(!projectData ? null : projectData)
    } else {
      setProjectInfo(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? <Loading /> : !!projectInfo ? <Project project={projectInfo} /> : <NotFound />
}
