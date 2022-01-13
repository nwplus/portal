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
  {
    title: 'title 13',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 14',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 15',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 16',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 17',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 18',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 19',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 20',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 21',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 22',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 23',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 24',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 25',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 26',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 27',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 28',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 29',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 30',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 31',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 32',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 33',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 34',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 35',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 36',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 37',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 38',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 39',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 40',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 41',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 42',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 43',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 44',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 45',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 46',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 47',
    description: 'description',
    links: { youtube: 'https://www.youtube.com/watch?v=kOHB85vDuow&ab_channel=JYPEntertainment' },
    teamMembers: [],
  },
  {
    title: 'title 48',
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
