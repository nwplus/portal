import React, { useEffect, useState } from 'react'
import { useHackathon } from '../utility/HackathonProvider'
import { rewardsRef } from '../utility/firebase'
import styled from 'styled-components'
import RewardCard from '../components/RewardCard'

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

// const rewards = [
//   {
//     title: 'Kinder egg',
//     blurb: 'A Kinder egg is a wonderful treat that simply melts in your mouth',
//     from: 'Kinder',
//     image: egg,
//     // points: 350,
//     maxPoints: 500,
//   },
//   {
//     title: 'Kinder egg',
//     blurb: 'A Kinder egg is a wonderful treat that simply melts in your mouth',
//     from: 'Kinder',
//     image: egg,
//     // points: 500,
//     maxPoints: 500,
//   },
// ]

const Rewards = () => {
  const [rewards, setRewards] = useState([])
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const rewardsCollection = await rewardsRef(dbHackathonName).get()
        const rewardList = rewardsCollection.docs.map(doc => doc.data())
        setRewards(rewardList)
      } catch (error) {
        console.error('Error fetching rewards:', error)
      }
    }

    fetchRewards()
  }, [])

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
              name={reward.title}
              desc={reward.blurb}
              company={reward.from}
              image={reward.imgURL}
              // points={reward.points}
              // maxPoints={reward.maxPoints}
            />
          ))}
        </Cards>
      </div>
    </Container>
  )
}

export default Rewards