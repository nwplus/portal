import React from 'react'
import HackerCountdown from '../containers/HackerCountdown'
// import Announcements from '../components/Announcements'
// import { CommonLinks } from '../containers/Quicklinks'
import styled, { withTheme } from 'styled-components'
// import head_decal from '../assets/cmdf_bannerdecal.svg'
import QrCode from '../components/QrCode'
import { useAuth } from '../utility/Auth'
// import Hackcamp2023BG from '../components/BackgroundImage'
import { APPLICATION_STATUS } from '../utility/Constants'
import backgroundImage from '../assets/hc_background.png'
import mobileBackgroundImage from '../assets/cmdf_mobilebg.svg'
import { copyText } from '../utility/Constants'
import { useHackathon } from '../utility/HackathonProvider'
import { css } from 'styled-components'

//My Ticket
const HomeContainer = styled.div`
  height: 100vh;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  z-index: 3;
  background-color: ${p => p.theme.colors.background};
  ${p => p.theme.mediaQueries.mobile} {
    gap: 1em;
  }
`
const HomeContainerBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  ${props =>
    props.backgroundImage &&
    css`
      background-image: url(${props.backgroundImage});
      background-size: cover;
      background-position: right bottom;

      ${p => p.theme.mediaQueries.mobile} {
        background-image: none;
        background-size: cover;
        background-position: center;
      }
    `}

  ${p => p.theme.mediaQueries.mobile} {
    z-index: -1;
  }
`
// temporary comment out for lint fix
// const TopDecal = styled.img`
//   position: absolute;
//   left: calc(256px - 2em);
//   top: -3em;
//   pointer-events: none;
//   width: calc(100vw - 256px + 2em);
// `

export default withTheme(({ announcements, theme }) => {
  const { user, isAuthed } = useAuth()
  const { activeHackathon } = useHackathon()

  return (
    <>
      <HomeContainerBackground backgroundImage={backgroundImage} />
      <HomeContainer>
        {/* {activeHackathon === 'hackcamp' && <Hackcamp2023BG />} */}
        <HackerCountdown />
        {/* 
      <CommonLinks />
      <Announcements announcements={announcements} /> */}

        {/* Only display QR Code if logged in */}
        {user?.status === APPLICATION_STATUS.accepted && isAuthed && user.uid && (
          <QrCode userInfo={user} userId={user.uid} />
        )}
      </HomeContainer>
    </>
  )
})
