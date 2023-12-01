import React from 'react'
import styled from 'styled-components'
// import Hackcamp2023BG from '../components/BackgroundImage'

const SponsorListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1em;
`

const SponsorContainer = styled.div`
  margin: 1em;
`

const SponsorImage = styled.img`
  max-width: ${p => p.width}px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`

const maxSponsorWidth = 250
const tierRanks = {
  platinum: 0,
  gold: 1,
  silver: 2,
  bronze: 3,
  inkind: 4,
}

export default ({ sponsors }) => {
  const tiers = sponsors.reduce((accumulator, sponsor) => {
    const tierLowerCase = sponsor.tier.toLowerCase()
    accumulator[tierLowerCase] = [...(accumulator[tierLowerCase] || []), sponsor]
    return accumulator // group by tier
  }, {})

  // sort by rank (plat - inkind)
  const sortedTiers = Object.keys(tiers).sort((t1, t2) => {
    return tierRanks[t1] - tierRanks[t2]
  })

  const createSponsorList = entries => {
    return <SponsorListContainer>{entries.map(singleSponsor)}</SponsorListContainer>
  }

  const singleSponsor = (entry, i) => {
    const imgWidth = maxSponsorWidth * (1 - 0.1 * tierRanks[entry.tier.toLowerCase()])
    return (
      <SponsorContainer key={i}>
        {/* <Hackcamp2023BG /> */}
        <a href={entry.link}>
          <SponsorImage src={entry.imgURL} alt={entry.imgName} width={imgWidth} />
        </a>
      </SponsorContainer>
    )
  }

  return sortedTiers.map((tier, i) => {
    return <div key={i}>{createSponsorList(tiers[tier])}</div>
  })
}
