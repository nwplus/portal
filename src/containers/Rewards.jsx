import styled from 'styled-components'
import TotalPoints from '../components/Rewards/TotalPoints'
import { useAuth } from '../utility/Auth'
import { getUserApplication } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'
import { useState } from 'react'
import { useEffect } from 'react'

const RewardsContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  ${p => p.theme.mediaQueries.mobile} {
    flex-direction: column;
  }
`

const RewardsSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  flex-shrink: 0;
`

const RewardsContentContainer = styled.div``

const Rewards = () => {
  const { user } = useAuth()
  const { dbHackathonName } = useHackathon()
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    getUserApplication(user.uid, dbHackathonName).then(user => {
      setUserDetails(user)
    })
  }, [user, dbHackathonName])

  return (
    <RewardsContainer>
      <RewardsSummaryContainer>
        <TotalPoints userDetails={userDetails} />
      </RewardsSummaryContainer>
      <RewardsContentContainer></RewardsContentContainer>
    </RewardsContainer>
  )
}

export default Rewards
