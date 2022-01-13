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
const MOCK_PROJECTS = [
  {
    title: 'title 1',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 2',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 3',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 4',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 5',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 6',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 7',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 8',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 9',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 10',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 11',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 12',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
]

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
        <GalleryPage projects={MOCK_PROJECTS} />
      </Container>
    </>
  )
}
