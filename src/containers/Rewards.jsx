import styled from 'styled-components'
import React from 'react'
import RewardCard from '../components/RewardCard'
import egg from '../assets/egg.svg'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Header = styled.h1`
  font-weight: 800;
  font-size: 2.5rem;
`

const Subtitle = styled.h3`
  font-weight: 400;
  margin-top: -18px;
  margin-bottom: 36px;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0px;
  row-gap: 32px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 28px;
  }
`

const rewards = [
  {
    name: 'Kinder egg',
    req: 'Reach 500 pts',
    desc: 'A Kinder egg is a wonderful treat that simply melts in your mouth.',
    image: egg,
    points: 350,
    maxPoints: 500,
  },
  {
    name: 'Kinder egg',
    req: 'Reach 500 pts',
    desc: 'A Kinder egg is a wonderful treat that simply melts in your mouth.',
    image: egg,
    points: 500,
    maxPoints: 500,
  },
  {
    name: 'Kinder egg',
    req: 'Attend Telus’ game dev workshop',
    desc: 'A Kinder egg is a wonderful treat that simply melts in your mouth.',
    image: egg,
    workshops: 0,
    maxWorkshops: 1,
  },
  {
    name: 'Kinder egg',
    req: 'Attend Telus’ game dev workshop',
    desc: 'A Kinder egg is a wonderful treat that simply melts in your mouth.',
    image: egg,
    workshops: 1,
    maxWorkshops: 1,
  },
]

const Rewards = () => {
  return (
    <Container>
      <div></div>
      <div>
        <Header>Rewards</Header>
        <Subtitle>Enter a raffle for prizes by collecting points or attending events!</Subtitle>
        <Cards>
          {rewards.map((reward, index) => (
            <RewardCard
              key={index}
              name={reward.name}
              req={reward.req}
              desc={reward.desc}
              image={reward.image}
              points={reward.points}
              maxPoints={reward.maxPoints}
              workshops={reward.workshops}
              maxWorkshops={reward.maxWorkshops}
            />
          ))}
        </Cards>
      </div>
    </Container>
  )
}

export default Rewards
