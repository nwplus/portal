import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { H1 } from '../components/Typography'
import { getProjects } from '../utility/firebase'
import GalleryPage from '../containers/GalleryPage'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0em 2em;
`

export default () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProjects().then(projectsData => {
      const newProjects = projectsData
        .map(project => {
          return { ...project.data(), uid: project.id }
        })
        .filter(project => project.draftStatus === 'public')
      setProjects(newProjects)
    })
  }, [])
  return (
    <>
      <H1>Project Gallery</H1>
      <Container>
        <GalleryPage projects={projects} />
      </Container>
    </>
  )
}
