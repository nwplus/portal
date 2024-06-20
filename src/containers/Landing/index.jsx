import React from 'react'
import styled from 'styled-components'
import cmdf_logo from '../../assets/cmdf_logo.png'
import hc_logo from '../../assets/hc_logo.svg'
import nwplus_logo from '../../assets/nwplus_icon.svg'
import Banner from '../../components/Banner'
import { H1, P } from '../../components/Typography'
import Footer from './Footer'
import nwHacksLoginBackground from '../../../src/assets/nwHacksLogin.svg'
import cmdfLoginBackground from '../../../src/assets/cmdf_loginbg.svg'

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
`

// temporary comment out for lint fix
// const FlexLandingContainer = styled.div`
//   width: 100%;
//   height: 98vh;
//   overflow-x: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   ${p => p.background && `background: ${p.background};`}
// `

// temporary comment out for lint fix
// const Flex = styled.div`
//   max-width: 50%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   gap: 20px;
// `

const StyledLogoLockup = styled.img`
  position: absolute;
  margin: 0 50%;
  transform: translateX(-50%);
  z-index: 9999;

  ${p =>
    p.theme.name !== 'nwPlus' &&
    `
      top: 7em;
      width: 120px;
  `}

  ${p => p.theme.mediaQueries.tabletLarge} {
    top: 20%;
    width: 15%;
  }
  ${p => p.theme.mediaQueries.tablet} {
    top: 30%;
    width: 20%;
  }
  ${p => p.theme.mediaQueries.xs} {
    top: 30%;
    width: 30%;
  }
`

const StyledBanner = styled(Banner)`
  && {
    position: absolute;
    top: 45%;
    text-align: center;
    z-index: 0;
    display: block;
    padding: 0;
    width: 100%;

    ${p => p.theme.mediaQueries.xs} {
      top: 45%;
    }
  }
`
// temporary comment out for lint fix
// const StyledP = styled(P)`
//   color: ${p => p.theme.colors.login.text};
//   font-weight: 600;
//   padding-top: 1rem;
//   font-size: 1.5rem;
// `

const BackgroundContainer = styled.img`
  height: 100%;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  ${p => p.theme.mediaQueries.xs} {
    height: 100vh;
    width: auto;
  }
`

// TODO: add sponsors if footer is shown
const Landing = ({ heading, description, showFooter, hackathon, children, background }) => {
  switch (hackathon) {
    case 'hackcamp':
      return (
        <LandingContainer showFooter={showFooter}>
          <StyledLogoLockup src={hc_logo} />
          <StyledBanner>
            <H1 size="1.5em">{heading}</H1>
            <P>{description}</P>
            {children}
          </StyledBanner>
          {showFooter && <Footer />}
        </LandingContainer>
      )
    case 'cmd-f':
      return (
        <LandingContainer showFooter={showFooter}>
          <BackgroundContainer src={cmdfLoginBackground} />
          <StyledLogoLockup src={cmdf_logo} />
          <StyledBanner>
            <H1 size="1.5em">{heading}</H1>
            <P>{description}</P>
            {children}
          </StyledBanner>
          {showFooter && <Footer />}
        </LandingContainer>
      )
    case 'nwhacks':
    default:
      return (
        <LandingContainer showFooter={showFooter}>
          <BackgroundContainer src={nwHacksLoginBackground} />

          <StyledLogoLockup src={nwplus_logo} />
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

export default Landing
