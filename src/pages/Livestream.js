import React from 'react'
import HackerCountdown from '../containers/HackerCountdown'
// import Announcements from '../components/Announcements'
// import { CommonLinks } from '../containers/Quicklinks'
import Livestream from '../components/Livestream'
import styled, { withTheme } from 'styled-components'
const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
export default withTheme(() => {
  return (
    <Container>
      <HackerCountdown />
      <Livestream />
    </Container>
  )
})
