import React from 'react'
import styled from 'styled-components'
import { P } from './Typography'
import icon from '../assets/nwhacks_logo_white.svg'
import poweredBy from '../assets/powered_by_livepeer.svg'
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
  //background: linear-gradient(to bottom, #544d92, rgba(33, 30, 57, 0));
  background: ${p => p.theme.colors.primary};
`

const Icon = styled.img`
  width: 30px;
  height: 42px;
  ${p => p.theme.mediaQueries.mobile} {
    width: 15px;
    height: 21px;
  }
`
const SponsorIcon = styled.img`
  width: 100px;
  height: 42px;
  ${p => p.theme.mediaQueries.mobile} {
    width: 35px;
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

const LogoContainer = styled.div`
  margin-inline-start: auto;
  display: flex;
  gap: 0.5rem;
`

const NavBar = ({ name, handleLogout, children, theme }) => {
  return (
    <div>
      <NavContainer>
        {handleLogout && (
          <Button onClick={handleLogout} color="secondary" nav>
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
        {theme.name === 'nwHacks' && (
          <LogoContainer>
            <SponsorIcon src={poweredBy} alt="powered by Livepeer" />
            <Icon src={icon} alt={theme.name} />
          </LogoContainer>
        )}
      </NavContainer>
      {children}
    </div>
  )
}

export default withTheme(NavBar)
