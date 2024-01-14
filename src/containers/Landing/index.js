import React from 'react'
import styled from 'styled-components'
import cmdf_logo from '../../assets/cmdf_logo.png'
import hc_logo from '../../assets/hc_logo.svg'
import nwhacks_logo from '../../assets/nwhacks2024logo.png'
import Banner from '../../components/Banner'
import { H1, P } from '../../components/Typography'
import Footer from './Footer'
import nwHacksLoginBackground from '../../../src/assets/nwHacksLogin.svg'

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

const FlexLandingContainer = styled.div`
  width: 100%;
  height: 98vh;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${p => p.background && `background: ${p.background};`}
`

const Flex = styled.div`
  max-width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
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
      top: 7em;
      width: 80px;
  `}
  ${p =>
    p.theme.name === 'cmdf' &&
    `
      top: 15em;
    `}
  ${p => p.theme.mediaQueries.tabletLarge} {
    top: 10%;
    width: 60px;
    ${p => p.theme.name !== 'nwHacks' && `top: 15%; width: 20%;`}
  }
  ${p => p.theme.mediaQueries.tablet} {
    width: 60px;
    ${p => p.theme.name !== 'nwHacks' && `top:22%; width: 20%; `}
  }
  ${p => p.theme.mediaQueries.xs} {
    top: 20%;
    width: 60px;
    ${p => p.theme.name !== 'nwHacks' && `top: 15%; width: 35%;`}
  }
`

const StyledBanner = styled(Banner)`
  && {
    position: absolute;
    top: 18em;
    text-align: center;
    z-index: 0;
    display: block;
    margin: 0 auto;
    padding: 0;
    width: 100%;

    ${p => p.theme.mediaQueries.xs} {
      top: 45%;
    }
  }
`

const StyledP = styled(P)`
  color: ${p => p.theme.colors.login.text};
  font-weight: 600;
  padding-top: 1rem;
  font-size: 1.5rem;
`

const NwHacksLoginBackgroundContainer = styled.img`
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
export default ({ heading, description, showFooter, hackathon, children, background }) => {
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
          {showFooter && <Footer />}
        </LandingContainer>
      )
    case 'cmdf':
      return (
        <FlexLandingContainer background={background}>
          <Flex>
            <img src={cmdf_logo} alt="cmd-f 2022 logo" />
            <StyledP>{heading}</StyledP>
            {description && <StyledP>{description}</StyledP>}
            {children}
          </Flex>
        </FlexLandingContainer>
      )
    default:
    case 'nwHacks':
      return (
        <LandingContainer showFooter={showFooter}>
          <NwHacksLoginBackgroundContainer src={nwHacksLoginBackground} />

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
