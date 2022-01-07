import React from 'react'
import JudgingCard from '../components/Judging/JudgingCard'
import styled from 'styled-components'
import { H1 } from '../components/Typography'

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
`

const StyledJudgingCard = styled(JudgingCard)`
  margin: 0 2em 2em 0;
`

export default ({ projects }) => {
  return (
    <>
      <H1>Project Gallery</H1>
      <Container>
        {MOCK_PROJECTS.map(project => {
          return (
            <StyledJudgingCard
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
              buttonLabel="See more"
              buttonDisabled={false}
            />
          )
        })}
      </Container>
    </>
  )
}
