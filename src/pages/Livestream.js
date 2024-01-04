import React from 'react'
import HackerCountdown from '../containers/HackerCountdown'
// import Announcements from '../components/Announcements'
// import { CommonLinks } from '../containers/Quicklinks'
import Livestream from '../components/Livestream'
import styled, { withTheme } from 'styled-components'
import head_decal from '../assets/cmdf_bannerdecal.svg'
import QrCode from '../components/QrCode'
import { useAuth } from '../utility/Auth'
const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
export default withTheme(({ announcements, theme }) => {
  const { user, isAuthed } = useAuth()

  return (
    <Container>
      <HackerCountdown />
      <Livestream />
    </Container>
  )
})
