import React from 'react'
import HackerCountdown from '../containers/HackerCountdown'
// import Announcements from '../components/Announcements'
// import { CommonLinks } from '../containers/Quicklinks'
import Livestream from '../components/Livestream'
import styled, { withTheme } from 'styled-components'
import head_decal from '../assets/cmdf_bannerdecal.svg'
import QrCode from '../components/QrCode'
import { useAuth } from '../utility/Auth'
// import Hackcamp2023BG from '../components/BackgroundImage'

//My Ticket
const HomeContainer = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TopDecal = styled.img`
  position: absolute;
  left: calc(256px - 2em);
  top: -3em;
  pointer-events: none;
  width: calc(100vw - 256px + 2em);
`

export default withTheme(({ announcements, theme }) => {
  const { user, isAuthed } = useAuth()

  return (
    <HomeContainer>
      {theme.name === 'cmdf' && <TopDecal src={head_decal} />}
      {/* {theme.name === 'hackCamp' && <Hackcamp2023BG />} */}
      <HackerCountdown />
      {/* 
      <CommonLinks />
      <Announcements announcements={announcements} /> */}
      {isAuthed && user.uid && <QrCode userInfo={user} userId={user.uid} />}
    </HomeContainer>
  )
})
