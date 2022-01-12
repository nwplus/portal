import React, { useEffect, useState } from 'react'
import JudgingCard from '../components/Judging/JudgingCard'
import styled from 'styled-components'
import { H1 } from '../components/Typography'
import { getProjects } from '../utility/firebase'
import { getYoutubeThumbnail } from '../utility/utilities'
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
      const newProjects = projectsData.map(project => {
        return { ...project.data(), uid: project.id }
      })
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
