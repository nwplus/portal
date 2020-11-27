import React from 'react'
import styled from 'styled-components'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'
import medium from '../../assets/icons/medium.svg'
import twitter from '../../assets/icons/twitter.svg'
import { P, A } from '../../components/Typography'
import { SOCIAL_LINKS } from '../../utility/Constants'

const StyledFooterContainer = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  bottom: 8em;
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
    bottom: 5em;
  }
`

export default () => (
  <>
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
