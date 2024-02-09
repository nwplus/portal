import React from 'react'
import styled from 'styled-components'
import menu from '../assets/menu.svg'
import logo from '../assets/nwplus_icon.svg'

const MobileMenuBarContainer = styled.div`
  display: none;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 15px;
    display: inline-block;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    -webkit-box-shadow: 0 6px 8px -8px #000;
    -moz-box-shadow: 0 6px 8px -8px #000;
    box-shadow: 0 6px 8px -8px #000;
  }
`

const Logo = styled.img`
  display: inline-block;
  margin-left: -50px;
  width: 20px;
`

const Menu = styled.img`
  float: left;
  width: 30px;
`

export default ({ showMobileSidebar, setShowMobileSidebar }) => {
  return (
    <MobileMenuBarContainer>
      <Menu src={menu} alt="menu" onClick={() => setShowMobileSidebar(!showMobileSidebar)} />
      <a href="/">
        <Logo src={logo} alt="logo" />
      </a>
    </MobileMenuBarContainer>
  )
}
