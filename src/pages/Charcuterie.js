import React from 'react'
import { H1, H2, H3, P, A } from '../components/Typography'
import { Card, Button, SecondaryButton } from '../components/Common.js'
import Accordion from '../components/Accordion'
import Countdown from '../containers/Countdown'
import Livestream from '../components/Livestream'
import JudgingCard from '../components/JudgingCard'
import Dropdown from '../components/Dropdown'

const options = [
  { value: 'chocolate', label: 'Chocolatewerwerwheirwheifuhwieufhwieuhfiu' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: '1', label: 'Vanilla' },
  { value: '2', label: 'NwPlus' },
  { value: '3', label: 'UBC' },
  { value: '4', label: 'hi' },
  { value: '5', label: 'Banilla' },
  { value: '6', label: 'Van' },
  { value: '1', label: 'Vanilla' },
  { value: '2', label: 'NwPlus' },
  { value: '3', label: 'UBC' },
  { value: '4', label: 'hi' },
  { value: '5', label: 'Banilla' },
  { value: '6', label: 'Van' },
  { value: '1', label: 'High school' },
  { value: '2', label: 'Undergraduate' },
  { value: '3', label: 'Graduate' },
  { value: '4', label: 'Other' },
  { value: '5', label: 'Banilla' },
  { value: '6', label: 'Van' },
]

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
    <Dropdown
      options={options}
      placeholder={'I am a placeholder'}
      isSearchable={false}
      onChange={inputValue => console.log(inputValue)}
    />
    <Dropdown
      options={options}
      placeholder={'Hi I am a placeholder'}
      isSearchable={true}
      formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
      onChange={inputValue => console.log(inputValue)}
      emptySearchDefaultOption={'Start typing to search'}
      noOptionsMessage={() => 'u messed up'}
      canCreateNewOption
    />
    <Dropdown
      options={options}
      placeholder={'im tired'}
      isSearchable={true}
      formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
      onChange={inputValue => console.log(inputValue)}
      emptySearchDefaultOption={'Start typing to search'}
      noOptionsMessage={() => 'u messed up'}
      canCreateNewOption={false}
    />
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
