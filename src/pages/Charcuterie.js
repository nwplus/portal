import React from 'react'
import { H1, H2, H3, P, A } from '../components/Typography'
import Countdown from '../containers/Countdown'

export default () => (
  <>
    <H1>Charcuturie</H1>
    <>
      <H1>This is an h1.</H1>
      <H2>This is an h2.</H2>
      <H3>This is an h3.</H3>
      <P><A href="https://en.wikipedia.org/wiki/Charcuterie">Charcuterie</A> most often consists of a variety of meats and cheeses, often paired with crackers, fruit, nuts, and spreads. An ideal charcuterie board has a good balance of flavors and textures and has foods that contrast and complement each other's taste. It's some really long text. I'm really writing this way later than I should be. Is this what it's like to sell your soul to nwPlus? </P>
      <Countdown countDownDate={new Date("Fri Aug 05 2020 00:01:22 GMT-0700 (Pacific Daylight Time)")} eventDurationHours={48} />
    </>
  </>
)
        