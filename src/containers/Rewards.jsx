import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useHackathon } from '../utility/HackathonProvider'
import { applicantsRef, rewardsRef, getEvents } from '../utility/firebase'
import RewardCard from '../components/RewardCard'
import TotalPoints from '../components/Rewards/TotalPoints'
import AttendedEvents from '../components/Rewards/AttendedEvents'
import { useAuth } from '../utility/Auth'
// import { getUserApplication } from '../utility/firebase'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Column = styled.div`
  margin-right: 24px;
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-right: 0px;
    margin-top: 0px;
  }
`

const Spacer = styled.div`
  margin-bottom: 24px;
`

const Name = styled.h1`
  font-weight: 800;
  font-size: 2rem;
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
  column-gap: 32px;
  row-gap: 32px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 28px;
  }
`

const Rewards = () => {
  const [rewards, setRewards] = useState([])
  const [userDetails, setUserDetails] = useState(null)
  const [userPoints, setUserPoints] = useState(0)
  const { dbHackathonName } = useHackathon()
  const { user } = useAuth()

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

    const getUserPoints = async () => {
      if (!user) return
      try {
        const userDoc = await applicantsRef(dbHackathonName).doc(user.uid).get()
        if (!userDoc.exists) {
          console.log('No user data found')
          return
        }
        const userData = userDoc.data()

        if (userData && dbHackathonName) {
          const userCheckedIn = userData.dayOf.checkedIn
          const eventIds = userData.dayOf.events.map(event => event.eventId)
          const events = await getEvents(dbHackathonName)
          const filteredEvents = events.filter(event => eventIds.includes(event.key))
          // setName(`${userData.basicInfo.preferredName} ${userData.basicInfo.legalLastName}`)
          const points = filteredEvents.reduce((accumulator, event) => {
            const eventPoints = parseInt(event.points)
            if (!isNaN(eventPoints)) {
              return accumulator + eventPoints
            } else {
              return accumulator
            }
          }, 0)

          setUserPoints(userCheckedIn ? points + 15 : points)
        }

        // const points = userData.points || 0
        // setUserPoints(points)
        setUserDetails(userData)
      } catch (error) {
        console.error('Error fetching user points:', error)
      }
    }
    fetchRewards()
    getUserPoints()
  }, [dbHackathonName, user])

  return (
    <Container>
      <Column>
        <Spacer>
          <Name>
            {userDetails?.basicInfo?.preferredName || userDetails?.basicInfo?.legalFirstName}{' '}
            {userDetails?.basicInfo?.legalLastName}
          </Name>
          <TotalPoints userDetails={userDetails} />
        </Spacer>
        <AttendedEvents userDetails={userDetails} />
      </Column>
      <div>
        <Header>Rewards</Header>
        <Subtitle>
          A list of hackathon and raffle prizes available! Enter a raffle for prizes by collecting
          points or attending events!
        </Subtitle>
        <Cards>
          {rewards.map((reward, index) => (
            <RewardCard
              key={index}
              name={reward.reward}
              type={reward.type}
              desc={reward.blurb}
              company={reward.from}
              image={reward.imgURL}
              points={userPoints}
              requiredPoints={reward.requiredPoints}
              prizes={reward.prizesAvailable}
              redeemed={userDetails?.dayOf?.rewards?.some(r => r.rewardId === reward.key)}
            />
          ))}
        </Cards>
      </div>
    </Container>
  )
}

export default Rewards
