import React from 'react';
import styled from 'styled-components';
import Accordion from './Accordion';
import { H2 } from './Typography';
import { DetailContainer, DetailColumn, DetailAnswer } from './Common'

const Sponsor = styled.img`
  // min-width: ${p => p.width * 0.75}px;
  // max-width: ${p => p.width}px; 
  width: ${p => p.width}px; 
`

const TierContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
`

const SponsorContainer = styled.div`
  margin: 10px;
`

const platWidth = 200;
const tierData = {
  platinum: { rank: 1, width: platWidth },
  gold: { rank: 2, width: platWidth * 0.9 },
  silver: { rank: 3, width: platWidth * 0.8 },
  bronze: { rank: 4, width: platWidth * 0.7 },
  inkind: { rank: 5, width: platWidth * 0.6 },
}

export default ({ sponsors }) => {
  const tiers = sponsors.reduce((accumulator, sponsor) => {
    accumulator[sponsor.tier] = [...accumulator[sponsor.tier] || [], sponsor];
    return accumulator; // group by tier
  }, {});

  // sort by rank
  const sortedTiers = Object.keys(tiers).sort((t1, t2) => {
    return tierData[t1].rank > tierData[t2].rank ? 1 : -1;
  })

  const createSponsorList = (tier, entries) => {
    const imgWidth = tierData[tier].width;
    return (
      <TierContainer>
        {
          entries.map((entry, i) =>
            <SponsorContainer>
              <Sponsor
                key={i}
                src={entry.imgURL}
                alt={entry.imgName}
                width={imgWidth}
              />
            </SponsorContainer>
          )
        }
      </TierContainer>
    );
  }

  return sortedTiers.map((tier, i) => {
    return (
      <div key={i}>
        {createSponsorList(tier, tiers[tier])}
      </div>
    );
  })
}