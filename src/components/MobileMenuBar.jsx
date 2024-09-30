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
    padding: 15px;
    display: inline-block;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    // -webkit-box-shadow: 0 6px 8px -8px #000;
    // -moz-box-shadow: 0 6px 8px -8px #000;
    // box-shadow: 0 6px 8px -8px #000;
  }
`

const Logo = styled.img`
  display: inline-block;
  margin-left: -50px;
  width: 40px;
`

const Menu = styled.img`
  float: left;
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
