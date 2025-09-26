import React from 'react'
import styled, { withTheme } from 'styled-components'
import cmdfIcon from '../assets/cmdf_logo.svg'
import nwhacks_logo from '../assets/nwhacks_logo.svg'
import hc_logo from '../assets/hc_logo.svg'
import { Button } from './Input'
import { P } from './Typography'
import { useHackathon } from '../utility/HackathonProvider'

const NavContainer = styled.div`
  direction: rtl;
  position: fixed;
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  top: 0;
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
  background: ${p => p.theme.colors.backgroundSecondary};
`

const Icon = styled.img`
  object-fit: cover;
  height: 42px;
  ${p => p.theme.mediaQueries.mobile} {
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

const Wrapper = styled.div`
  padding-top: 1rem;
`

const NavBar = ({ name, handleLogout, children }) => {
  const { activeHackathon } = useHackathon()

  return (
    <Wrapper>
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
        {activeHackathon === 'hackcamp' && (
          <LogoContainer>
            <Icon src={hc_logo} alt={'HackCamp'} />
          </LogoContainer>
        )}
        {activeHackathon === 'nwhacks' && (
          <LogoContainer>
            {/* <SponsorIcon src={poweredBy} alt="powered by Livepeer" /> */}
            <Icon src={nwhacks_logo} alt={'nwHacks'} />
          </LogoContainer>
        )}
        {activeHackathon === 'cmd-f' && (
          <LogoContainer>
            <Icon src={cmdfIcon} alt={'cmd-f'} />
          </LogoContainer>
        )}
      </NavContainer>
      {children}
    </Wrapper>
  )
}

export default withTheme(NavBar)
