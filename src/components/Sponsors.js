import React from 'react';
import styled from 'styled-components';

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
  transition: transform .2s;

  &:hover {
    transform: scale(1.10);
  }
`

const platWidth = 250;
const tierData = {
  platinum: { rank: 1, width: platWidth },
  gold: { rank: 2, width: platWidth * 0.9 },
  silver: { rank: 3, width: platWidth * 0.8 },
  bronze: { rank: 4, width: platWidth * 0.7 }
}

export default ({ sponsors }) => {
  const tiers = sponsors.reduce((accumulator, sponsor) => {
    if (sponsor.tier !== 'inkind') { // no inkind logos on livesite
      accumulator[sponsor.tier] = [...accumulator[sponsor.tier] || [], sponsor];
    }
    return accumulator; // group by tier
  }, {});

  // sort by rank (plat - bronze)
  const sortedTiers = Object.keys(tiers).sort((t1, t2) => {
    return tierData[t1].rank - tierData[t2].rank;
  })

  const createSponsorList = (entries) => {
    return (
      <SponsorListContainer>
        {entries.map(singleSponsor)}
      </SponsorListContainer>
    );
  }

  const singleSponsor = (entry, i) => {
    const imgWidth = tierData[entry.tier].width
    return (
      <SponsorContainer key={i}>
        <a href={entry.link}>
          <SponsorImage
            src={entry.imgURL}
            alt={entry.imgName}
            width={imgWidth}
          />
        </a>
      </SponsorContainer>
    );
  }

  return sortedTiers.map((tier, i) => {
    return (
      <div key={i}>
        {createSponsorList(tiers[tier])}
      </div>
    );
  })
}