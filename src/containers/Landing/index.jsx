import React from 'react'
import styled from 'styled-components'
import cmdf_logo from '../../assets/cmdf_logo.png'
import hc_logo from '../../assets/hc_logo.svg'
import nwhacks_logo from '../../assets/nwhacks_logo.svg'
import nwplus_logo from '../../assets/nwplus_icon.svg'
import Banner from '../../components/Banner'
import { H1, P } from '../../components/Typography'
import Footer from './Footer'
import hackcampLoginBackground from '../../assets/hc_login.svg'
import nwHacksLoginBackground from '../../assets/nwHacksLogin.svg'
import cmdfLoginBackground from '../../assets/cmdf_loginbg.svg'
import { useHackathon } from '../../utility/HackathonProvider'

const LandingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  z-index: 101;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledLogoLockup = styled.img`
  position: absolute;
  margin: 0 50%;
  transform: translateX(-50%);
  z-index: 9999;

  top: 10em;
  height: ${p => (p.theme.name === 'hackcamp' ? '100px' : '150px')};
`

const StyledBanner = styled(Banner)`
  && {
    text-align: center;
    z-index: 0;
    display: block;
    padding: 0;
    width: 75%;
  }
`

const BackgroundContainer = styled.img`
  height: 100%;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
`

const Landing = ({ heading, description, showFooter, children }) => {
  const { activeHackathon } = useHackathon()

  const options = {
    'hackcamp': { logo: hc_logo, background: hackcampLoginBackground },
    'cmd-f': { logo: cmdf_logo, background: cmdfLoginBackground },
    'nwhacks': { logo: nwhacks_logo, background: nwHacksLoginBackground },
    'default': { logo: nwplus_logo, background: nwHacksLoginBackground },
  }

  const { logo, background } = options[activeHackathon] || options.default

  return (
    <LandingContainer showFooter={showFooter}>
      {background && <BackgroundContainer src={background} />}
      <StyledLogoLockup src={logo} />
      <StyledBanner>
        <H1 size="1.5em">{heading}</H1>
        <P>{description}</P>
        {children}
      </StyledBanner>
      {showFooter && <Footer />}
    </LandingContainer>
  )
}

export default Landing
