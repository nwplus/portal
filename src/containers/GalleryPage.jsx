import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import JudgingCard from '../components/Judging/JudgingCard'
import Pagination, { getClickedPageIndex } from '../components/Pagination'
import { H2 } from '../components/Typography'
import { getYoutubeThumbnail } from '../utility/utilities'
// import Hackcamp2023BG from '../components/BackgroundImage'

const ProjectPageWrapper = styled.div`
  width: 100%;
  text-align: center;
`

export const ProjectPageContainer = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 64px;
  row-gap: 56px;
  margin-bottom: 40px;
  ${p => p.theme.mediaQueries.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: 1fr 1fr 1fr;
    column-gap: 28px;
    row-gap: 24px;
    margin-bottom: 16px;
  }
`

const StyledJudgingCard = styled(JudgingCard)`
  max-height: 400px;
  width: 100%;
`

const CardContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const PROJECTS_PER_PAGE = 24

export function GalleryPage({ projects, startingPageIndex = 0 }) {
  const [currPageIndex, setCurrPageIndex] = useState(startingPageIndex)
  const [currPageProjects, setCurrPageProjects] = useState([])

  const TOTAL_PROJECT_PAGES = Math.ceil(projects.length / PROJECTS_PER_PAGE)

  const getCurrPageProjects = (projects, currPageIndex) => {
    const currPageProjects = []
    const begin = currPageIndex * PROJECTS_PER_PAGE
    for (let i = begin; i < begin + PROJECTS_PER_PAGE && i < projects.length; i++) {
      const { description, links, teamMembers, title } = projects[i]
      if (!description || !links || !teamMembers || !title) {
        return
      }
      currPageProjects.push(projects[i])
    }
    return currPageProjects
  }

  useEffect(() => {
    setCurrPageProjects(getCurrPageProjects(projects, currPageIndex))
  }, [currPageIndex, setCurrPageIndex, projects])

  const handlePageChange = nextPageIndex => {
    if (nextPageIndex === TOTAL_PROJECT_PAGES || nextPageIndex < 0) {
      return
    }
    setCurrPageIndex(nextPageIndex)
  }
  return (
    <ProjectPageWrapper>
      {/* <Hackcamp2023BG version="noObjects" /> */}

      {currPageProjects.length === 0 ? (
        <H2>No projects found :(</H2>
      ) : (
        <>
          <ProjectPageContainer>
            {currPageProjects.map((project, index) => (
              <CardContainerWrap>
                <StyledJudgingCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  imgUrl={getYoutubeThumbnail(project.links.youtube)}
                  buttonLabel="See more"
                  buttonDisabled={false}
                  href={'/projects/' + project.uid}
                />
              </CardContainerWrap>
            ))}
          </ProjectPageContainer>
          <Pagination
            count={TOTAL_PROJECT_PAGES}
            pageIndex={currPageIndex}
            onPageClick={e => setCurrPageIndex(getClickedPageIndex(e))}
            onPrevClick={() => handlePageChange(currPageIndex - 1)}
            onNextClick={() => handlePageChange(currPageIndex + 1)}
          />
        </>
      )}
    </ProjectPageWrapper>
  )
}
