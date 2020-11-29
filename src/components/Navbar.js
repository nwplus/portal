import React from 'react'
import styled from 'styled-components'
import { P } from './Typography'
import icon from '../assets/nwhacks_icon.svg'
import Button from './Button'

const NavContainer = styled.div`
  display: flex;
  height: 60px;
  padding: 15px 145px;
  position: relative;
  align-items: center;
`

const Icon = styled.img`
  display: flex;
  width: 30px;
  height: 42px;
`
const Greeting = styled(P)`
  justify-self: flex-end;
  display: flex;
  margin-left: auto;
  font-weight: 700;
  font-size: 18px;
`

export default ({ name, handleLogout }) => (
  <NavContainer>
    <Icon src={icon} alt="nwHacks icon" />
    <Greeting>Hi, {name} &#128540;</Greeting>
    <Button onClick={handleLogout} color="primary">
      Logout
    </Button>
  </NavContainer>
)
