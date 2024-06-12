import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { H1, P, A } from '../../components/Typography'
import { SOCIAL_LINKS } from '../../utility/Constants'
import { CenterHorizontally } from '../../components/Common'
import Icon from '../../components/Icon'
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

const SocialIconContainer = styled.div`
  ${CenterHorizontally}
  z-index: 100;
  top: 55em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  padding: 0 560px;
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

const Footer = () => {
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
        {sponsors.length > 0 && (
          <>
            <H1 size="1.5em">Sponsored by</H1>
            <LogoContainer>{SponsorList}</LogoContainer>
          </>
        )}
      </SponsorsContainer>
      <SocialIconContainer>
        <Icon href={SOCIAL_LINKS.FB} icon="facebook" brand size="2x" />
        <Icon href={SOCIAL_LINKS.IG} icon="instagram" brand size="2x" />
        <Icon href={SOCIAL_LINKS.MEDIUM} icon="medium" brand size="2x" />
        <Icon href={SOCIAL_LINKS.TW} icon="twitter" brand size="2x" />
      </SocialIconContainer>
      <CopyrightBlurb>
        Copyright &copy; {new Date().getFullYear()} <A href={SOCIAL_LINKS.WEBSITE}>nwPlus</A>
      </CopyrightBlurb>
    </>
  )
}

export default Footer
