import React from 'react'
import styled from 'styled-components'
import cmdf_logo from '../assets/cmdf_logo.svg'
import hc_logo from '../assets/hc_logo.svg'
import nwhacks_logo from '../assets/nwhacks_logo.svg'
import nwplus_logo from '../assets/nwplus_icon.svg'
import menu from '../assets/menu.svg'
import { useHackathon } from '../utility/HackathonProvider'

const chooseLogo = hackathon => {
  switch (hackathon) {
    case 'hackcamp':
      return hc_logo
    case 'cmd-f':
      return cmdf_logo
    case 'nwhacks':
      return nwhacks_logo
    default:
      return nwplus_logo
  }
}

const MobileMenuBarContainer = styled.div`
  display: none;
  z-index: 100;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 15px 0;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Logo = styled.img`
  height: 60px;
`

const Menu = styled.img`
  position: absolute;
  left: 20px;
  width: 30px;
  cursor: pointer;
`

const MobileMenuBar = ({ showMobileSidebar, setShowMobileSidebar }) => {
  const { activeHackathon } = useHackathon()

  return (
    <MobileMenuBarContainer>
      <Menu src={menu} alt="menu" onClick={() => setShowMobileSidebar(!showMobileSidebar)} />
      <a href="/">
        <Logo src={chooseLogo(activeHackathon)} alt="logo" />
      </a>
    </MobileMenuBarContainer>
  )
}

export default MobileMenuBar
