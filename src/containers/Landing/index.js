import React from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import hc_logo from '../../assets/hc_logo.svg'
import nwhacks_logo from '../../assets/nwhacks_logo.svg'
import cmdf_logo from '../../assets/cmdf_logo.svg'
import cmdf_plants from '../../assets/cmdf_splash.svg'
import Footer from './Footer'
import { H1, P } from '../../components/Typography'

const LandingContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  ${p => !p.showFooter && 'overflow-y: hidden;'}
`

const StyledLogoLockup = styled.img`
  position: absolute;
  top: 7em;
  margin: 0 50%;
  transform: translateX(-50%);
  z-index: 9999;

  ${p =>
    p.theme.name !== 'nwPlus' &&
    `
      top: 15em;
  `}
  ${p =>
    p.theme.name === 'cmdf' &&
    `
      top: 15em;
    `}
  ${p => p.theme.mediaQueries.tabletLarge} {
    top: 18%;
    width: 80%;
    ${p => p.theme.name !== 'nwPlus' && `top: 15%; width: 20%;`}
  }
  ${p => p.theme.mediaQueries.tablet} {
    top: 15%;
    width: 82%;
    ${p => p.theme.name !== 'nwPlus' && `top:22%; width: 20%;`}
  }
  ${p => p.theme.mediaQueries.xs} {
    width: 90%;
    top: 19%;
    ${p => p.theme.name !== 'nwPlus' && `top: 15%; width: 35%;`}
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

const StyledLandingDecal = styled.img`
  pointer-events: none;
  ${p =>
    p.theme.name === 'cmdf' &&
    `
      position: absolute;
      z-index: 9999;
      display: block;
      width: 100%;
      object-fit: cover;
    `}
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
    case 'cmdf':
      return (
        <LandingContainer showFooter={showFooter}>
          <StyledLandingDecal src={cmdf_plants} />
          <StyledLogoLockup src={cmdf_logo} />
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
          <StyledLogoLockup src={nwhacks_logo} />
          <StyledBanner>
            <H1 size="1.5em">{heading}</H1>
            <P>{description}</P>
            {children}
          </StyledBanner>
          {showFooter && <Footer />}
        </LandingContainer>
      )
  }
}
