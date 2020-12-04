import React from 'react'
import styled from 'styled-components'
import { P } from './Typography'
import icon from '../assets/nwhacks_icon.svg'
import { Button } from './Input'
import { maxWidthMediaQueries } from './Common'

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
  z-index: 100;
  ${maxWidthMediaQueries('mobile')} {
    height: 3em;
  }
`

const Icon = styled.img`
  margin-inline-start: auto;
  width: 30px;
  height: 42px;
  ${maxWidthMediaQueries('mobile')} {
    width: 15px;
    height: 21px;
  }
`
const Greeting = styled(P)`
  padding-right: 0.3em;
  font-weight: 700;
  font-size: 18px;
  z-index: 101;
  text-shadow: -1px 0 ${p => p.theme.colors.greetingBorder},
    0 1px ${p => p.theme.colors.greetingBorder}, 1px 0 ${p => p.theme.colors.greetingBorder},
    0 -1px ${p => p.theme.colors.greetingBorder};
  ${maxWidthMediaQueries('mobile')} {
    padding-right: 0.1em;
    font-weight: 700;
    font-size: 14px;
  }
`

export default ({ name, handleLogout, children }) => (
  <div>
    <NavContainer>
      {handleLogout && (
        <Button onClick={handleLogout} color="primary">
          Logout
        </Button>
      )}
      {name && (
        <>
          <span role="img" aria-label="tongue sticking out emoji">
            &#128540;
          </span>
          <Greeting>Hi, {name}</Greeting>
        </>
      )}
      <Icon src={icon} alt="nwHacks icon" />
    </NavContainer>
    {children}
  </div>
)
