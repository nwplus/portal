import React from 'react'
import styled from 'styled-components'
import Accordion from '../components/Accordion'
import { H1 } from '../components/Typography'
import { CardLike } from '../components/Common'

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
    <H1>Sponsor Judging</H1>
    {Object.keys(sponsorPrizes).map(prize => (
      <SponsorPrize>
        <Accordion heading={prize} key={prize}>
          <EntriesList>
            {sponsorPrizes[prize].map((submission, i) => (
              <li key={i}>{submission}</li>
            ))}
          </EntriesList>
        </Accordion>
      </SponsorPrize>
    ))}
  </div>
)
