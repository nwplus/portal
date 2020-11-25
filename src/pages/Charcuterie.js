import React, { useState } from 'react'
import { H1, H2, H3, P, A } from '../components/Typography'
import { Card, Button, SecondaryButton } from '../components/Common.js'
import Accordion from '../components/Accordion'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import Countdown from '../containers/Countdown'
import Livestream from '../components/Livestream'
import JudgingCard from '../components/JudgingCard'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'

const toggleTheme = () => {
  const oldTheme = window.localStorage.getItem('localTheme')
  if (oldTheme === 'nwTheme') {
    window.localStorage.setItem('localTheme', 'hackcampTheme')
  } else {
    window.localStorage.setItem('localTheme', 'nwTheme')
  }
  window.location.reload()
}

export default () => {
  const [states, setStates] = useState({
    checkbox: false,
    radio: 'selected',
    multiselect: { option1: false, option2: false, selected: false, disabled: false },
  })
  const [textAreaValue, setTextAreaValue] = useState('')

  return (
    <>
      <SecondaryButton href={`javascript:(${toggleTheme})()`}>Toggle Theme</SecondaryButton>
      <P>
        Theme switcher. Drag the bookmarklet button from the page to your Bookmarks Toolbar. It
        should appear on the toolbar
      </P>

      <H1>Charcuturie</H1>
      <>
        <H1>This is an h1.</H1>
        <H2>This is an h2.</H2>
        <H3>This is an h3.</H3>
        <P>
          <A href="https://en.wikipedia.org/wiki/Charcuterie">Charcuterie</A> most often consists of
          a variety of meats and cheeses, often paired with crackers, fruit, nuts, and spreads. An
          ideal charcuterie board has a good balance of flavors and textures and has foods that
          contrast and complement each other's taste. It's some really long text. I'm really writing
          this way later than I should be. Is this what it's like to sell your soul to nwPlus?{' '}
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
        <TextInput placeholder="Default" />
        <TextInput value="With Value" />
        <TextInput value="With Value Disabled" disabled={true} />
        <TextInput placeholder="Disabled" disabled={true} />
        <TextInput placeholder="Invalid" invalid={true} errorMsg={'Pls try again lol'} />
        <TextInput placeholder="Medium" size="medium" />
        <TextInput placeholder="Large" size="large" />
      </Card>
      <TextArea
        placeholder="TextArea with placeholder."
        maxLength="10"
        value={textAreaValue}
        onChange={setTextAreaValue}
      />
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
      <H2>Checkbox</H2>
      <Checkbox
        label="Default state"
        checked={states.checkbox}
        onChange={() => setStates({ ...states, checkbox: !states.checkbox })}
      />
      <Checkbox label="Selected state" checked readOnly />
      <H2>Selects</H2>
      <H3>Radio</H3>
      <Select
        type="radio"
        name="radioSelect"
        label="Default state"
        checked={states.radio === 'default'}
        onChange={e => setStates({ ...states, radio: e.target.value })}
        value="default"
      />
      <Select
        type="radio"
        name="radioSelect"
        label="Selected state"
        checked={states.radio === 'selected'}
        onChange={e => setStates({ ...states, radio: e.target.value })}
        value="selected"
      />
      <Select type="radio" name="selects" label="Disabled state" disabled />
      <H3>Multiselects (Select all that apply)</H3>
      <Select
        type="checkbox"
        label="Option 1"
        checked={states.multiselect.option1}
        onChange={() =>
          setStates({
            ...states,
            multiselect: { ...states.multiselect, option1: !states.multiselect.option1 },
          })
        }
      />
      <Select
        type="checkbox"
        label="Option 2"
        checked={states.multiselect.option2}
        onChange={() =>
          setStates({
            ...states,
            multiselect: { ...states.multiselect, option2: !states.multiselect.option2 },
          })
        }
      />
      <Select type="checkbox" label="Selected state" checked readOnly />
      <Select type="checkbox" label="Disabled state" disabled />
    </>
  )
}
