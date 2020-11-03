import React from 'react';
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import menu from '../assets/menu.svg'


const MobileMenuBarContainer = styled.div`
  display: none; 
  padding: 20px;
  @media only screen and (max-width: 600px) {
    display: inline-block;
    text-align: center;
    width: 100%;
    -webkit-box-shadow: 0 6px 8px -8px #000;
    -moz-box-shadow: 0 6px 8px -8px #000;
    box-shadow: 0 6px 8px -8px #000;
  }
`;

const Logo = styled.img`
  display: inline-block;
  margin-left: -30px;
  width: 20px;
`;

const Menu = styled.img`
  float: left;
  width: 30px;
`;

export default ({ openSidebar }) => {
  return (
    <MobileMenuBarContainer>
      <Menu src={menu} alt="menu" onClick={openSidebar} />
      <a href="/">
        <Logo src={logo} alt="logo" />
      </a>
    </MobileMenuBarContainer>
  );
}