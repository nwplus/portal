import React, { useEffect, useState } from 'react'
import JudgingCard from '../components/Judging/JudgingCard'
import styled from 'styled-components'
import { H1 } from '../components/Typography'
import { getProjects } from '../utility/firebase'
import { getYoutubeThumbnail } from '../utility/utilities'

const MOCK_PROJECTS = [
  {
    title: 'title',
    description: 'description',
    imgUrl: 'https://stickershop.line-scdn.net/stickershop/v1/product/13884/LINEStorePC/main.png',
  },
  {
    title: 'title',
    description: 'description',
    imgUrl: 'https://stickershop.line-scdn.net/stickershop/v1/product/13884/LINEStorePC/main.png',
  },
  {
    title: 'title',
    description: 'description',
    imgUrl: 'https://stickershop.line-scdn.net/stickershop/v1/product/13884/LINEStorePC/main.png',
  },
  {
    title: 'title',
    description: 'description',
    imgUrl: 'https://stickershop.line-scdn.net/stickershop/v1/product/13884/LINEStorePC/main.png',
  },
  {
    title: 'title',
    description: 'description',
    imgUrl: 'https://stickershop.line-scdn.net/stickershop/v1/product/13884/LINEStorePC/main.png',
  },
  {
    title: 'title',
    description: 'description',
    imgUrl: 'https://stickershop.line-scdn.net/stickershop/v1/product/13884/LINEStorePC/main.png',
  },
]

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
        {projects.map(project => {
          console.log(project)
          return (
            <JudgingCard
              title={project.title}
              description={project.description}
              imgUrl={getYoutubeThumbnail(project.links.youtube)}
              buttonLabel="See more"
              buttonDisabled={false}
              href={'projects/' + project.uid}
            />
          )
        })}
      </Container>
    </>
  )
}
