import React from 'react'
import styled from 'styled-components'
import { P } from './Typography'
import icon from '../assets/nwhacks_icon.svg'
import { Button } from './Input'
import { withTheme } from 'styled-components'

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
  ${p => p.theme.mediaQueries.mobile} {
    height: 3em;
  }
`

const Icon = styled.img`
  margin-inline-start: auto;
  width: 30px;
  height: 42px;
  ${p => p.theme.mediaQueries.mobile} {
    width: 15px;
    height: 21px;
  }
`
const Greeting = styled(P)`
  padding-right: 0.3em;
  font-weight: 700;
  font-size: 18px;
  z-index: 101;
  ${p => p.theme.mediaQueries.mobile} {
    padding-right: 0.1em;
    font-weight: 700;
    font-size: 14px;
  }
`

const NavBar = ({ name, handleLogout, children, theme }) => {
  return (
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
        {theme.name === 'nwHacks' && <Icon src={icon} alt={theme.name} />}
      </NavContainer>
      {children}
    </div>
  )
}

export default withTheme(NavBar)
