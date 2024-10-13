import styled from 'styled-components'
import AttendedEvents from '../components/Rewards/AttendedEvents'

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
  return (
    <RewardsContainer>
      <RewardsSummaryContainer>
        <AttendedEvents />
      </RewardsSummaryContainer>
      <RewardsContainer></RewardsContainer>
    </RewardsContainer>
  )
}

export default Rewards
