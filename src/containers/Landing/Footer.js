import React from 'react'
import styled from 'styled-components'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'
import medium from '../../assets/icons/medium.svg'
import twitter from '../../assets/icons/twitter.svg'
import { H1, P, A } from '../../components/Typography'
import { SOCIAL_LINKS } from '../../utility/Constants'
import { CenterHorizontally } from '../../components/Common'

const SponsorsContainer = styled.div`
  position: absolute;
  width: 80vw;
  top: 40em;
  ${CenterHorizontally}
  display: block;
  text-align: center;
  justify-content: center;
`

const StyledFooterContainer = styled.div`
  position: absolute;
  ${CenterHorizontally}
  z-index: 100;
  top: 60em;
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
    position: absolute;
    display: block;
    width: 100%;
    text-align: center;
    top: 66em;
    padding-bottom: 2.5em;
  }
`

export default () => (
  <>
    <SponsorsContainer>
      <H1 size="1.5em">Sponsored by</H1>
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
