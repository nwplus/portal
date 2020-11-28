import React from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import logo_lockup from '../../assets/logo_lockup.svg'
import holo from '../../assets/holo.svg'
import holo_end from '../../assets/holo2.svg'
import Footer from './Footer'
import { H1, P } from '../../components/Typography'
import { CenterHorizontally } from '../../components/Common'

const LandingContainer = styled.div`
  position: fixed;
  display: block;
  overflow-x: hidden;
  margin: 0 auto;
  // padding: 0 auto;
  // z-index: -1;
  color: white;
  ${p => !p.showFooter && 'overflow-y: hidden;'}
`

const HoloBackground = styled.img`
  position: absolute;
  float: left;
  display: block;
  opacity: 0.8;
  width: 100%;
  top: 18em;
  ${CenterHorizontally}
  z-index: -1;
`

const StyledLogoLockup = styled.img`
  position: absolute;
  top: 7em;
  margin: 0 50.5%;
  transform: translateX(-50%);
  z-index: 200;
`

const StyledBanner = styled(Banner)`
  && {
    position: absolute;
    top: 18em;
    padding: 56px 24px 24px;
    text-align: center;
    z-index: 1;
  }
`

// TODO: add sponsors if footer is shown
export default ({ heading, description, showFooter, children }) => (
  <>
    <StyledLogoLockup src={logo_lockup} />
    <StyledBanner>
      <H1 size="1.5em">{heading}</H1>
      <P>{description}</P>
      {children}
    </StyledBanner>
    <LandingContainer showFooter={showFooter}>
      {showFooter ? (
        <>
          <Footer /> <HoloBackground src={holo_end} />
        </>
      ) : (
        <HoloBackground src={holo} />
      )}
    </LandingContainer>
  </>
)
