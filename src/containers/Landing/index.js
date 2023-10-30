import React from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import hc_logo from '../../assets/hc_logo.svg'
import nwhacks_logo from '../../assets/nwhacks_logo.svg'
import cmdf_logo from '../../assets/cmdf_logo.png'
import Footer from './Footer'
import { H1, P } from '../../components/Typography'
import hcloginbc from '../../assets/hc2023login.svg'

const LandingContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-image: url(${hcloginbc});
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  z-index: 101;
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
      top: 15em;
      width: 160px;
  `}
  ${p =>
    p.theme.name === 'cmdf' &&
    `
      top: 15em;
    `}
  ${p => p.theme.mediaQueries.tabletLarge} {
    top: 18%;
    width: 60px;
    ${p => p.theme.name !== 'nwHacks' && `top: 15%; width: 20%;`}
  }
  ${p => p.theme.mediaQueries.tablet} {
    top: 30%;
    width: 60px;
    ${p => p.theme.name !== 'nwHacks' && `top:22%; width: 20%; `}
  }
  ${p => p.theme.mediaQueries.xs} {
    top: 25%;
    width: 60px;
    ${p => p.theme.name !== 'nwHacks' && `top: 15%; width: 35%;`}
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

const StyledP = styled(P)`
  color: ${p => p.theme.colors.login.text};
  font-weight: 600;
  padding-top: 1rem;
  font-size: 1.5rem;
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
