import React from 'react'
import Announcements from '../components/Announcements'
import HackerCountdown from '../containers/HackerCountdown'
import { CommonLinks } from '../containers/Quicklinks'
import Livestream from '../components/Livestream'
import styled, { withTheme } from 'styled-components'
import head_decal from '../assets/cmdf_bannerdecal.svg'
import footer_decal from '../assets/cmdf_footerdecal.svg'

const Decal = styled.img`
  pointer-events: none;
  object-fit: cover;
  overflow: hidden;
  z-index: -1;
`

const TopDecal = styled(Decal)`
  position: absolute;
  left: calc(275px - 2em);
  top: -3em;
  width: calc(100vw - 275px + 2em);
`

const BottomDecal = styled(Decal)`
  position: relative;
  bottom: -2em;
  left: -3em;
  width: calc(100% + 6em);
`

export default withTheme(({ announcements, theme }) => {
  return (
    <>
      {theme.name === 'cmdf' && <TopDecal src={head_decal} />}
      <HackerCountdown />
      <CommonLinks />
      <Livestream />
      <Announcements announcements={announcements} />
      {theme.name === 'cmdf' && <BottomDecal src={footer_decal} />}
    </>
  )
})
