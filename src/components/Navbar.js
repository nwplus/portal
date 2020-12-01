import React from 'react'
import styled from 'styled-components'
import { P } from './Typography'
import icon from '../assets/nwhacks_icon.svg'
import Button from './Button'

const NavContainer = styled.div`
  direction: rtl;
  position: fixed;
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  height: 5em;
  padding: 3vh 10vw;
  margin-right: auto;
  align-items: center;
  background: transparent;
  backdrop-filter: blur(5px);
  z-index: 100;
`

const Icon = styled.img`
  margin-inline-start: auto;
  width: 30px;
  height: 42px;
`
const Greeting = styled(P)`
  padding-right: 1vw;
  font-weight: 700;
  font-size: 18px;
  z-index: 101;
`

export default ({ name, handleLogout }) => (
  <NavContainer>
    {handleLogout && (
      <Button onClick={handleLogout} color="primary">
        Logout
      </Button>
    )}
    {name && <Greeting>&#128540; Hi, {name}</Greeting>}
    <Icon src={icon} alt="nwHacks icon" />
  </NavContainer>
)
