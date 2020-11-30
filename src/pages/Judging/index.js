import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getLivesiteDoc } from '../../utility/firebase'
import JudgingCard from '../../components/JudgingCard'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledJudgingCard = styled(JudgingCard)`
  margin: 0 2em 2em 0;
`

export default () => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)

  // TODO: Get from firebase
  // eslint-disable-next-line no-unused-vars
  const [projects, setProjects] = useState([
    {
      id: '42069',
      description:
        'This project is a project that is very cool haha! This project is a project that is cool! This project is a project that is very cool!',
      imgUrl: 'https://img.youtube.com/vi/PQgHXPGoKwg/maxresdefault.jpg',
      devpostUrl: 'https://devpost.com/software/impostor',
      title: 'Imposter',
      judged: true,
    },
    {
      id: 'a7xh134',
      description: 'A tagline a A tagline A tagline A tagline',
      imgUrl: 'https://img.youtube.com/vi/nAepxZHybEc/maxresdefault.jpg',
      devpostUrl: 'https://devpost.com/software/readar-twh41m',
      title: 'YEEEEEET',
    },
    {
      id: 'a7xh134',
      description: 'A tagline',
      imgUrl: 'https://img.youtube.com/vi/PQgHXPGoKwg/maxresdefault.jpg',
      devpostUrl: 'https://devpost.com/software/impostor',
      title: 'YEEEEEET',
    },
    {
      id: 'a7xh134',
      description: 'A tagline A taglineA tagline A tagline',
      imgUrl: 'https://img.youtube.com/vi/PQgHXPGoKwg/maxresdefault.jpg',
      devpostUrl: 'https://devpost.com/software/readar-twh41m',
      title: 'YEEEEEET11',
    },
    {
      id: 'a7xh134',
      description: 'A tagline',
      imgUrl: 'https://img.youtube.com/vi/nAepxZHybEc/maxresdefault.jpg',
      devpostUrl: 'https://devpost.com/software/impostor',
      title: 'YEEEEEET3',
    },
  ])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  if (!isJudgingOpen) {
    return <h2>Judging is not open yet. Please check back later.</h2>
  }

  return (
    <Container>
      {projects.map(project => {
        return (
          <StyledJudgingCard
            {...project}
            buttonLabel={project.judged ? 'Already Judged' : 'Judge this Submission'}
            buttonDisabled={project.judged}
            href={`judging/view/${project.id}`}
          />
        )
      })}
    </Container>
  )
}
