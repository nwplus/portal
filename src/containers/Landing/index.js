import React from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import logo_lockup from '../../assets/logo_lockup.svg'
import holo from '../../assets/holo.svg'
import Footer from './Footer'
import { H1, P } from '../../components/Typography'

const LandingContainer = styled.div`
  overflow-x: hidden;
  padding: 0 auto;
`

const HoloBackground = styled.img`
  position: absolute;
  float: left;
  overflow-x: hidden;
  display: block;
  opacity: 0.8;
  width: 125%;
  top: 18em;
  margin: 0 50%;
  transform: translateX(-50%);
  z-index: -1;
`

const StyledLogoLockup = styled.img`
  position: absolute;
  top: 7em;
  margin: 0 50%;
  transform: translateX(-50%);
  z-index: 200;
`

const StyledBanner = styled(Banner)`
  && {
    position: absolute;
    top: 18em;
    padding: 64px 24px 24px;
    text-align: center;
    z-index: 0;
  }
`

export default ({ heading, description, showFooter, children }) => {
  return (
    <LandingContainer>
      <StyledLogoLockup src={logo_lockup} />
      <StyledBanner>
        <H1>{heading}</H1>
        <P>{description}</P>
        {children}
      </StyledBanner>
      {showFooter && <Footer />}
      <HoloBackground src={holo} />
    </LandingContainer>
  )
}
