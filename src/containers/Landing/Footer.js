import React from 'react'
import styled from 'styled-components'
import kabam from '../../assets/sponsor_kabam.png'
import groundswell from '../../assets/sponsor_groundswell.svg'
import deloitte from '../../assets/sponsor_deloitte.svg'
import kpmg from '../../assets/sponsor_kpmg.svg'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'
import medium from '../../assets/icons/medium.svg'
import twitter from '../../assets/icons/twitter.svg'
import { H1, P, A } from '../../components/Typography'
import { SOCIAL_LINKS } from '../../utility/Constants'
import { CenterHorizontally } from '../../components/Common'

const SponsorsContainer = styled.div`
  width: 100%;
  margin-top: 38em;
  display: block;
  text-align: center;
  justify-content: center;
  align-items: center;
  ${p => p.theme.mediaQueries.tabletLarge} {
    margin-top: 80%;
  }
  ${p => p.theme.mediaQueries.tablet} {
    margin-top: 88%;
  }
  ${p => p.theme.mediaQueries.xs} {
    margin-top: 145%;
  }
`

const LogoContainer = styled.div`
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  top: 2.5em;
`

const SponsorLogo = styled.img`
  max-width: 230px;
  max-height: 45px;
  width: auto;
  height: auto;
  float: left;
  margin: 16px 32px;
`

const StyledFooterContainer = styled.div`
  ${CenterHorizontally}
  z-index: 100;
  top: 55em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 560px;
`

const BoundingBox = styled.img`
  display: flex;
  margin: 24px;
`

const CopyrightBlurb = styled(P)`
  && {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 3em;
    padding-bottom: 2.5em;
  }
`

export default () => (
  <>
    <SponsorsContainer>
      <H1 size="1.5em">Sponsored by</H1>
      <LogoContainer>
        <SponsorLogo src={kabam} />
        <SponsorLogo src={groundswell} />
        <SponsorLogo src={deloitte} />
        <SponsorLogo src={kpmg} />
      </LogoContainer>
    </SponsorsContainer>
    <StyledFooterContainer>
      <a href={SOCIAL_LINKS.FB}>
        <BoundingBox src={facebook} alt="nwPlus Facebook" />
      </a>
      <a href={SOCIAL_LINKS.IG}>
        <BoundingBox src={instagram} alt="nwPlus Instagram" />
      </a>
      <a href={SOCIAL_LINKS.MEDIUM}>
        <BoundingBox src={medium} alt="nwPlus Medium" />
      </a>
      <a href={SOCIAL_LINKS.TW}>
        <BoundingBox src={twitter} alt="nwPlus Twitter" />
      </a>
    </StyledFooterContainer>
    <CopyrightBlurb>
      Copyright &copy; 2020 <A href={SOCIAL_LINKS.WEBSITE}>nwPlus</A>
    </CopyrightBlurb>
  </>
)
