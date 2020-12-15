import React from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import logo_lockup from '../../assets/logo_lockup.svg'
import hc_logo from '../../assets/hc_logo.svg'
import holo from '../../assets/holo.svg'
import holo_end from '../../assets/holo2.svg'
import Footer from './Footer'
import { H1, P } from '../../components/Typography'
import { CenterHorizontally } from '../../components/Common'

const LandingContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  ${p => !p.showFooter && 'overflow-y: hidden;'}
`

const HoloBackground = styled.img`
  position: absolute;
  float: left;
  overflow-x: hidden;
  display: block;
  opacity: 0.8;
  width: 100%;
  top: 18em;
  ${CenterHorizontally}
  z-index: -1;
  ${p => p.theme.mediaQueries.tabletLarge} {
    width: 200%;
    top: 40%;
  }
  ${p => p.theme.mediaQueries.tablet} {
    width: 200%;
    top: 40%;
  }
  ${p => p.theme.mediaQueries.xs} {
    width: 300%;
    top: 50%;
  }
`

const StyledLogoLockup = styled.img`
  position: absolute;
  top: 7em;
  margin: 0 50.5%;
  transform: translateX(-50%);
  z-index: 1;

  ${p =>
    p.theme.name === 'hackCamp' &&
    `
      top: 14em;
    `}
  ${p => p.theme.mediaQueries.tabletLarge} {
    top: 18%;
    width: 80%;
  }
  ${p => p.theme.mediaQueries.tablet} {
    top: 15%;
    width: 82%;
  }
  ${p => p.theme.mediaQueries.xs} {
    width: 90%;
    top: 19%;
  }
`

const StyledBanner = styled(Banner)`
  && {
    position: absolute;
    top: 18em;
    padding: 56px 24px 24px;
    text-align: center;
    z-index: 0;
    ${p => p.theme.mediaQueries.tabletLarge} {
      top: 37%;
      width: 45%;
    }
    ${p => p.theme.mediaQueries.tablet} {
      padding: 15% 3% 5%;
      top: 30%;
      width: 45%;
    }
    ${p => p.theme.mediaQueries.xs} {
      padding: 12% 3% 5%;
      width: 85%;
      top: 31%;
    }
  }
`

// TODO: add sponsors if footer is shown
export default ({ heading, description, showFooter, hackathon, children }) => {
  switch (hackathon) {
    case 'hackCamp':
      return (
        <LandingContainer showFooter={showFooter}>
          <StyledLogoLockup src={hc_logo} />
          <StyledBanner>
            <H1 size="1.5em">{heading}</H1>
            <P>{description}</P>
            {children}
          </StyledBanner>
        </LandingContainer>
      )
    default:
    case 'nwHacks':
      return (
        <LandingContainer showFooter={showFooter}>
          <StyledLogoLockup src={logo_lockup} />
          <StyledBanner blur>
            <H1 size="1.5em">{heading}</H1>
            <P>{description}</P>
            {children}
          </StyledBanner>
          {showFooter ? (
            <>
              <Footer /> <HoloBackground src={holo_end} />
            </>
          ) : (
            <HoloBackground src={holo} />
          )}
        </LandingContainer>
      )
  }
}
