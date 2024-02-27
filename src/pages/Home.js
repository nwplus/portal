import React from 'react'
import HackerCountdown from '../containers/HackerCountdown'
// import Announcements from '../components/Announcements'
// import { CommonLinks } from '../containers/Quicklinks'
import styled, { withTheme } from 'styled-components'
import head_decal from '../assets/cmdf_bannerdecal.svg'
// import Hackcamp2023BG from '../components/BackgroundImage'
import { APPLICATION_STATUS } from '../utility/Constants'
import { P } from '../../src/components/Typography'
import backgroundImage from '../assets/cmdf_homebg.svg'
import mobileBackgroundImage from '../assets/cmdf_mobilebg.svg'


//My Ticket
const HomeContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  z-index: 3;
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
  background-image: url(${backgroundImage});
  background-size: 120%;
  background-position: right bottom;
  ${p => p.theme.mediaQueries.mobile} {
    background-image: url(${mobileBackgroundImage});
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`

const TopDecal = styled.img`
  position: absolute;
  left: calc(256px - 2em);
  top: -3em;
  pointer-events: none;
  width: calc(100vw - 256px + 2em);
`

// const StyledP = styled(P)`
//   text-align: center;
// `

export default withTheme(({ announcements, theme }) => {
  // const { user, isAuthed } = useAuth()

  return (
    <>
      <HomeContainerBackground />
      <HomeContainer>
        {theme.name === 'cmdf'}
        {/* {theme.name === 'hackCamp' && <Hackcamp2023BG />} */}
        <HackerCountdown />
        {/* 
      <CommonLinks />
      <Announcements announcements={announcements} /> */}

        {/* Only display QR Code if logged in */}
        {user?.status === APPLICATION_STATUS.accepted && isAuthed && user.uid ? (
          <QrCode userInfo={user} userId={user.uid} />
        ) : (
          <StyledP>Please login with the email you used to apply to {copyText.hackathonName}.</StyledP>
        )}
      </HomeContainer>
    </>
  )
})
