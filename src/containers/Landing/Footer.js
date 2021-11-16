import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'
import medium from '../../assets/icons/medium.svg'
import twitter from '../../assets/icons/twitter.svg'
import { H1, P, A } from '../../components/Typography'
import { SOCIAL_LINKS } from '../../utility/Constants'
import { CenterHorizontally } from '../../components/Common'
import { getSponsors } from '../../utility/firebase'

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

export default () => {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getSponsors().then(docs => {
      // only keep non-inkind sponsors
      const filteredDocs = docs.filter(
        doc => doc.data().tier && doc.data().tier.toLowerCase() !== 'inkind'
      )
      setSponsors(filteredDocs.map(doc => doc.data()))
    })
  }, [setSponsors])

  const SponsorList = sponsors.map(sponsor => <SponsorLogo src={sponsor.imgURL} />)

  return (
    <>
      <SponsorsContainer>
        <H1 size="1.5em">Sponsored by</H1>
        <LogoContainer>{SponsorList}</LogoContainer>
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
}
