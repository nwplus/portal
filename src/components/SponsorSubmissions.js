import React from 'react'
import styled from 'styled-components'
import Accordion from '../components/Accordion'
import { H1, H3, P, A } from '../components/Typography'

export default ({ sponsorPrizes }) => (
  <div>
    <H1>Sponsor Judging</H1>
    {Object.keys(sponsorPrizes).map(prize => (
      <Accordion heading={prize} key={prize}>
        <ul>
          {sponsorPrizes[prize].map((submission, i) => (
            <li key={i}>{submission}</li>
          ))}
        </ul>
      </Accordion>
    ))}
  </div>
)
