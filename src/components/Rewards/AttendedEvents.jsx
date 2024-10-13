import styled, { useTheme } from 'styled-components'
import { TagLegendContainer, TagLegends } from '../Schedule/Tag'
import { H1 } from '../Typography'
import AttendedEventsCard from './AttendedEventsCard'

const AttendedEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;
`

const AttendedEventsHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const TagLegendsContainer = styled(TagLegendContainer)`
  justify-content: start;
  padding-right: 0;
`

const AttendedEvents = () => {
  const theme = useTheme()

  return (
    <AttendedEventsContainer>
      <AttendedEventsHeader>
        <H1>Attended events</H1>
        <TagLegendsContainer>
          <TagLegends theme={theme} />
        </TagLegendsContainer>
      </AttendedEventsHeader>
      <AttendedEventsCard />
    </AttendedEventsContainer>
  )
}

export default AttendedEvents
