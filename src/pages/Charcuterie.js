import React, { useState } from 'react'
import { H1, H2, H3, P, A, QuestionHeading } from '../components/Typography'
import { Card } from '../components/Common.js'
import { Button, TextInput, TextArea, Checkbox, Select, Dropdown } from '../components/Input'
import Accordion from '../components/Accordion'
import Countdown from '../containers/Countdown'
import Livestream from '../components/Livestream'
import JudgingCard from '../components/JudgingCard'
import FormContainer from '../components/ApplicationForm'
import VerticalProgressBar from '../components/VerticalProgressBar'
import ResumeUploadBtn from '../components/ResumeUploadBtn'
import styled from 'styled-components'
import NavigationButtons from '../components/NavigationButtons'
import Loading from '../components/Loading'

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
  const [textArea1Value, setTextArea1Value] = useState('')
  const [textArea2Value, setTextArea2Value] = useState('')
  const [hint, setHint] = useState()
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const ResumeContainer = styled.div`
    display: flex;
    align-items: center;
  `
  const StyledQuestionHeading = styled(QuestionHeading)`
    margin-right: 9em;
  `
  return (
    <>
      <Button color="secondary" width="flex" href={`javascript:(${toggleTheme})()`}>
        Toggle Theme
      </Button>
      <Button color="secondary" width="flex" onClick={() => setIsLoading(!isLoading)}>
        {!isLoading ? `Show Spinner` : `Hide Spinner`}
      </Button>
      <Loading loading={isLoading} />
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
        <br></br>
        <QuestionHeading>this is a question heading</QuestionHeading>
        <QuestionHeading>question 14</QuestionHeading>
        <H1>How did you hear about nwHacks?</H1>
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
        <P>Colors</P>
        <Button color="primary">Primary</Button>
        <Button color="primary" disabled>
          Primary
        </Button>
        <Button color="secondary" width="flex">
          Secondary
        </Button>
        <Button color="secondary" width="flex" disabled>
          Secondary
        </Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="tertiary" disabled>
          Tertiary
        </Button>
        <P>Widths</P>
        <Button width="small" color="secondary">
          Small
        </Button>
        <Button color="secondary">Default</Button>
        <Button width="flex" color="secondary">
          Flex (ie. as wide as the label)
        </Button>
        <Button width="large" color="secondary">
          Large
        </Button>
        <P>Heights</P>
        <Button height="short" color="secondary">
          Short
        </Button>
        <Button height="tall" color="secondary">
          Tall
        </Button>
        <TextInput placeholder="Default" />
        <TextInput value="With Value" />
        <TextInput value="With Value Disabled" disabled />
        <TextInput placeholder="Disabled" disabled />
        <TextInput placeholder="Invalid" invalid errorMsg={'Pls try again lol'} />
        <TextInput placeholder="Medium" size="medium" />
        <TextInput placeholder="Large" size="large" />
      </Card>
      <TextArea
        placeholder="TextArea with placeholder."
        maxLength="10"
        value={textArea1Value}
        onChange={setTextArea1Value}
      />
      <TextArea
        placeholder="TextArea with placeholder but no maxLength."
        value={textArea2Value}
        onChange={setTextArea2Value}
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
        buttonLabel="Judge this submission"
        description="Imposter is a productivity timer designed to keep friends on task together even when working remotely. It aims to create a productive and social environment for all of us working from home."
      />
      <H1>Form Wrapper</H1>
      <FormContainer>
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
        <Select type="radio" name="selects" label="Can't select this" disabled />
        <Select type="radio" name="selects" label="Other" readOnly />
        <TextInput placeholder="Please Specify" size="small" noOutline inline />
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
        <H2>Dropdowns</H2>
        <H3>Normal dropdown</H3>
        <Dropdown
          options={options}
          placeholder={'I am a placeholder'}
          isSearchable={false}
          onChange={inputValue => console.log(inputValue)}
          isValid
        />
        <H3>Searchable dropdown</H3>
        <Dropdown
          options={options}
          placeholder={'im tired'}
          isSearchable
          formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
          onChange={inputValue => console.log(inputValue)}
          emptySearchDefaultOption={'Start typing to search'}
          noOptionsMessage={() => 'u messed up'}
          canCreateNewOption={false}
          isValid
        />
        <H3>Searchable and creatable dropdown</H3>
        <Dropdown
          options={options}
          placeholder={'Hi I am a placeholder'}
          isSearchable
          formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
          onChange={inputValue => console.log(inputValue)}
          emptySearchDefaultOption={'Start typing to search'}
          noOptionsMessage={() => 'u messed up'}
          canCreateNewOption
          isValid
        />
        <H3>Invalid dropdown</H3>
        <Dropdown
          options={options}
          placeholder={'im tired'}
          isSearchable
          formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
          onChange={inputValue => console.log(inputValue)}
          emptySearchDefaultOption={'Start typing to search'}
          noOptionsMessage={() => 'u messed up'}
          canCreateNewOption={false}
          isValid={false}
          errorMessage={'Please select something!'}
        />
        <H3>Debounced dropdown</H3>
        <Dropdown
          options={options}
          placeholder={'im tired'}
          isSearchable
          formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
          onChange={inputValue => console.log(inputValue)}
          emptySearchDefaultOption={'Start typing to search'}
          noOptionsMessage={() => 'u messed up'}
          canCreateNewOption={false}
          isValid
          errorMessage={'Please select something!'}
          debounceEnabled
          throttleTime={1000}
        />
        <H3>Debounced creatable dropdown</H3>
        <Dropdown
          options={options}
          placeholder={'im tired'}
          isSearchable={true}
          formatCreateLabel={inputValue => `Cant find this!!! Use "${inputValue}" instead`}
          onChange={inputValue => console.log(inputValue)}
          emptySearchDefaultOption={'Start typing to search'}
          noOptionsMessage={() => 'u messed up'}
          canCreateNewOption
          isValid
          errorMessage={'Please select something!'}
          debounceEnabled
          throttleTime={1000}
        />
      </FormContainer>
      <H2>Change Progress Bar</H2>
      <Button width="flex" onClick={() => progress < 100 && setProgress(progress + 10)}>
        Increase!
      </Button>
      <Button width="flex" onClick={() => progress >= 10 && setProgress(progress - 10)}>
        Decrease!
      </Button>
      <VerticalProgressBar percent={progress} />
      <QuestionHeading>question 12</QuestionHeading>
      <ResumeContainer>
        <StyledQuestionHeading>resume</StyledQuestionHeading>
        <ResumeUploadBtn
          onChange={e => setHint(e.target.value)}
          hint={hint}
          errorMsg="Please upload your resume"
        />
      </ResumeContainer>
      <H3>Navigation button group (with autosave time)</H3>
      <NavigationButtons
        firstButtonText="Back"
        firstButtonHref="https://www.linkedin.com/in/kevin-zou/"
        secondButtonText="Next"
        secondButtonHref="https://www.linkedin.com/in/kevin-zou/"
        autosaveTime="4:20 pm"
      />
      <H3>Navigation button group (without autosave time)</H3>
      <NavigationButtons
        firstButtonText="Back"
        firstButtonHref="https://www.linkedin.com/in/kevin-zou/"
        secondButtonText="Next"
        secondButtonHref="https://www.linkedin.com/in/kevin-zou/"
      />
    </>
  )
}
