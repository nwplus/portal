import React from 'react'
import { H1, H2, H3, P } from '../components/Typography'
import Countdown from '../containers/Countdown'

export default () => (
  <>
    <H1>Live website.</H1>
    <>
      <H1>This is an h1.</H1>
      <H2>This is an h2.</H2>
      <H3>This is an h3.</H3>
      <P>Here's your regular Lorem Ipsum shpeel. It's some really long text. I'm really writing this way later than I should be. Is this what it's like to sell your soul to nwPlus? </P>
      <Countdown countDownDate={new Date("Fri Aug 05 2020 00:01:22 GMT-0700 (Pacific Daylight Time)")} eventDurationHours={48} />
    </>
  </>
)
        