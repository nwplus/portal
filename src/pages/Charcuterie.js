import React from 'react'
import { H1, H2, H3, P, A } from '../components/Typography'
import { Card, Button, SecondaryButton } from '../components/Common.js'
import Accordion from '../components/Accordion'
import Countdown from '../containers/Countdown'
import Livestream from '../components/Livestream'
import JudgingCard from '../components/JudgingCard'

export default () => (
  <>
    <H1>Charcuturie</H1>
    <>
      <H1>This is an h1.</H1>
      <H2>This is an h2.</H2>
      <H3>This is an h3.</H3>
      <P>
        <A href="https://en.wikipedia.org/wiki/Charcuterie">Charcuterie</A> most often consists of a
        variety of meats and cheeses, often paired with crackers, fruit, nuts, and spreads. An ideal
        charcuterie board has a good balance of flavors and textures and has foods that contrast and
        complement each other's taste. It's some really long text. I'm really writing this way later
        than I should be. Is this what it's like to sell your soul to nwPlus?{' '}
      </P>
    </>
    <>
      <H2>Countdown</H2>
      <Countdown
        countDownDate={new Date('Fri Aug 05 2020 00:01:22 GMT-0700 (Pacific Daylight Time)')}
        eventDurationHours={48}
        eventName="Hacking ends in..."
      />
    </>
    <Card>
      <H2>Card Element</H2>
      <P>It can contain content. And even buttons!</P>
      <Button>Primary</Button>
      <SecondaryButton>Secondary</SecondaryButton>
    </Card>
    <Accordion heading="Accordion Component">
      Some hidden content. This can get pretty long too, and even contain other stuff like headers
      or images.
    </Accordion>
    <H2>Livestream Component</H2>
    <Livestream />
    <JudgingCard
      title="Imposter"
      imgUrl="https://img.youtube.com/vi/PQgHXPGoKwg/maxresdefault.jpg"
      teamName="H4ckH0use"
      description="Imposter is a productivity timer designed to keep friends on task together even when working remotely. It aims to create a productive and social environment for all of us working from home."
    />
  </>
)
