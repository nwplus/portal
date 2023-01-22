import React from 'react'
import styled from 'styled-components'
import Accordion from '../../Accordion'
import { H1 } from '../../Typography'
import { CardLike } from '../../Common'

const SponsorPrize = styled.div`
  ${CardLike};
  padding: 0.25em 0.5em;
  margin: 0.5em;
`

const EntriesList = styled.ul`
  margin-top: 0;
`

export default ({ sponsorPrizes }) => (
  <div>
    <H1>Projects by Sponsor Prizes</H1>
    {Object.keys(sponsorPrizes).map(
      (prize, i) =>
        sponsorPrizes[prize].length > 0 && (
          <SponsorPrize key={i}>
            <Accordion heading={prize} key={prize}>
              <EntriesList>
                {sponsorPrizes[prize].map((submission, i) => (
                  <li key={i}>{submission.title}</li>
                ))}
              </EntriesList>
            </Accordion>
          </SponsorPrize>
        )
    )}
  </div>
)
