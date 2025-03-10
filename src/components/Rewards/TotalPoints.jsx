import styled from 'styled-components'
import { getEvents } from '../../utility/firebase'
import { useHackathon } from '../../utility/HackathonProvider'
import { useState, useEffect } from 'react'

// const TotalPointsName = styled.h2`
//   color: ${p => p.theme.colors.highlight};
//   font-weight: 700;
//   font-size: 30px;
// `

const TotalPointsCard = styled.div`
  background: ${p => p.theme.colors.backgroundTertiary};
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding-left: 29px;
  border-radius: 5px;
  width: 302px;
  height: 113px;
`

const PointsTitle = styled.div`
  color: ${p => p.theme.colors.text};
  font-size: 18px;
  font-weight: 700;
`

const PointsValue = styled.div`
  color: ${p => p.theme.colors.text};
  font-size: 40px;
  font-weight: 700;
`

const TotalPoints = ({ userDetails }) => {
  const { dbHackathonName } = useHackathon()
  // const [name, setName] = useState('')
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (userDetails && dbHackathonName) {
        const userCheckedIn = userDetails.dayOf.checkedIn
        const eventIds = userDetails.dayOf.events.map(event => event.eventId)
        const events = await getEvents(dbHackathonName)
        const filteredEvents = events.filter(event => eventIds.includes(event.key))
        console.log(filteredEvents)
        // setName(`${userDetails.basicInfo.preferredName} ${userDetails.basicInfo.legalLastName}`)
        const points = filteredEvents.reduce((accumulator, event) => {
          const points = parseInt(event.points) // Attempt to convert to integer
          if (!isNaN(points)) {
            // Only add valid numbers
            console.log('Adding Points:', points)
            return accumulator + points
          } else {
            console.log('Skipping Invalid Points:', event.points)
            return accumulator
          }
        }, 0)

        setTotalPoints(userCheckedIn ? points + 15 : points)
      }
    })()
  }, [userDetails, dbHackathonName])

  return (
    <div>
      {/* <TotalPointsName>{name}</TotalPointsName> */}
      <TotalPointsCard>
        <PointsTitle>TOTAL POINTS</PointsTitle>
        <PointsValue>{totalPoints ? totalPoints : 0} pts</PointsValue>
      </TotalPointsCard>
    </div>
  )
}

export default TotalPoints
