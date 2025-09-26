import React, { useState, useEffect } from 'react'
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
import nwHacksMobileLoginBackground from '../../assets/nwHacksMobileLogin.svg'
import cmdfLoginBackground from '../../assets/cmdf_loginbg.svg'
import cmdfLoginBackgroundAlt from '../../assets/cmdf_loginbg_alt.svg'
import cmdfMobileLoginBackground from '../../assets/cmdf_mobile_loginbg.svg'
import { useHackathon } from '../../utility/HackathonProvider'

const LandingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  z-index: -1;
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

  top: 20vh;

  height: ${p => (p.theme.name === 'hackcamp' || p.theme.name === 'cmd-f' ? '100px' : '150px')};

  ${p => p.theme.mediaQueries.mobile} {
    top: 10vh;
    height: ${p => (p.theme.name === 'hackcamp' || p.theme.name === 'cmd-f' ? '75px' : '100px')};
  }
`

const StyledBanner = styled(Banner)`
  && {
    text-align: center;
    z-index: 0;
    display: block;
    padding: 0;
    width: 50%;

    ${p => p.theme.mediaQueries.mobile} {
      width: 80%;
    }
  }
`

// If we have a header, we want to bring down the background graphic below the header
const BackgroundContainer = styled.img`
  height: ${p => (p.hasHeader ? '80%' : '100%')};
  width: 100vw;
  object-fit: contain;
  ${p => (!p.hasHeader ? 'object-position: center top;' : '')}
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;

  ${p => p.theme.mediaQueries.mobile} {
    height: 100%;
    object-fit: cover;
  }
`

// TODO we can't be absolutely positioning everything T_T
const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 40vh;

  ${p => p.theme.mediaQueries.mobile} {
    bottom: -10vh;
  }
`

/**
 * @param {boolean} hasHeader - If true, the heading/description will be offset downwards to account for the header
 * @param {boolean} showAltBackground - Whether to show the alternate background. For cmd-f 2025, the alternate background has less elements in the lower half to account for sponsor logos
 */
const Landing = ({ heading, description, showFooter, hasHeader, showAltBackground, children }) => {
  const { activeHackathon } = useHackathon()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const options = {
    'hackcamp': {
      // logo: hc_logo,
      background: hackcampLoginBackground,
      mobileBackground: hackcampLoginBackground,
      altBackground: hackcampLoginBackground,
    },
    'cmd-f': {
      logo: cmdf_logo,
      background: cmdfLoginBackground,
      mobileBackground: cmdfMobileLoginBackground,
      altBackground: cmdfLoginBackgroundAlt,
    },
    'nwhacks': {
      logo: nwhacks_logo,
      background: nwHacksLoginBackground,
      mobileBackground: nwHacksMobileLoginBackground,
      altBackground: nwHacksLoginBackground,
    },
    'default': {
      logo: nwplus_logo,
      background: nwHacksLoginBackground,
      mobileBackground: nwHacksMobileLoginBackground,
      altBackground: nwHacksLoginBackground,
    },
  }

  const { logo, background, mobileBackground, altBackground } =
    options[activeHackathon] || options.default

  return (
    <LandingContainer showFooter={showFooter}>
      {background && (
        <BackgroundContainer
          src={isMobile ? mobileBackground : showAltBackground ? altBackground : background}
          hasHeader={hasHeader}
        />
      )}
      <StyledLogoLockup src={logo} />
      <StyledBanner>
        <H1 size="1.5em">{heading}</H1>
        <P>{description}</P>
        {children}
      </StyledBanner>
      {showFooter && (
        <FooterContainer>
          <Footer />
        </FooterContainer>
      )}
    </LandingContainer>
  )
}

export default Landing
