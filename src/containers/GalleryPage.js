import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import JudgingCard from '../components/Judging/JudgingCard'
import Pagination, { getClickedPageIndex } from '../components/Pagination'

const ProjectPageWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const ProjectPageContainer = styled.div`
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

const PROJECTS_PER_PAGE = 6

export default function GalleryPage({ projects, startingPageIndex = 0 }) {
  const [currPageIndex, setCurrPageIndex] = useState(startingPageIndex)
  const [currPageProjects, setCurrPageProjects] = useState([])

  const TOTAL_PROJECT_PAGES = Math.ceil(projects.length / PROJECTS_PER_PAGE)

  const getCurrPageProjects = (projects, currPageIndex) => {
    console.log('inside getCurrPageProjects')
    const currPageProjects = []
    for (let i = currPageIndex; i < PROJECTS_PER_PAGE && i < projects.length; i++) {
      const { description, links, teamMembers, title } = projects[i]
      if (!description || !links || !teamMembers || !title) {
        return
      }
      currPageProjects.push(projects[i])
    }
    return currPageProjects
  }

  useEffect(() => {
    console.log('in useEffect')
    setCurrPageProjects(getCurrPageProjects(projects, currPageIndex))
  }, [currPageIndex, setCurrPageIndex, projects])

  const handlePageChange = nextPageIndex => {
    if (nextPageIndex === TOTAL_PROJECT_PAGES || nextPageIndex < 0) {
      return
    }
    setCurrPageIndex(nextPageIndex)
  }
  console.log(currPageProjects)
  return (
    <ProjectPageWrapper>
      {currPageProjects.length == 0 ? (
        <div>No projects found :(</div>
      ) : (
        <>
          <ProjectPageContainer>
            {currPageProjects.map((project, index) => (
              <JudgingCard key={index} {...project} />
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
