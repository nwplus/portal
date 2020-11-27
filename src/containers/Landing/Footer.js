import React from 'react'
import styled from 'styled-components'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'
import medium from '../../assets/icons/medium.svg'
import twitter from '../../assets/icons/twitter.svg'
import { H1, P } from '../../components/Typography'

const StyledFooterContainer = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  bottom: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 560px;
`

const BoundingBox = styled.img`
  display: flex;
  margin: 24px;
`

export default () => (
  <StyledFooterContainer>
    <a href="https://www.facebook.com/nwplusubc/">
      <BoundingBox src={facebook} alt="nwPlus Facebook" />
    </a>
    <a href="https://www.instagram.com/nwplusubc">
      <BoundingBox src={instagram} alt="nwPlus Instagram" />
    </a>
    <a href="https://www.medium.com/nwplusubc">
      <BoundingBox src={medium} alt="nwPlus Medium" />
    </a>
    <a href="https://www.twitter.com/nwplusubc">
      <BoundingBox src={twitter} alt="nwPlus Twitter" />
    </a>
  </StyledFooterContainer>
)
