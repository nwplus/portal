import React from 'react'
import { CenteredH1, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { Checkbox } from '../../components/Input'
import { FormSpacing, SubHeading } from './'
import { copyText } from '../../utility/Constants'

// form part 0 for vaccine info
export default ({ formInputs, onChange, error }) => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Western Canada’s largest hackathon is here
          <span role="img" aria-label="Party emoji">
            🎉
          </span>
          !
        </CenteredH1>
        <SubHeading>
          We’re excited to have you join us in January, 2024 for a 24-hour long hackathon filled
          with workshops and exciting new events. This year, we’re also giving you the opportunity
          to showcase your project live in front of a panel of judges and 750 hackers from around
          Canada! We focus on creating a quality hackathon experience all of our attendees, so
          please fill out the form so we can get a better idea of the amount of people attending,
          and of course, craft the best 24-hour hacker experience for you!
        </SubHeading>
        <Checkbox
          flex
          checked={formInputs.willBeDoubleVaxed}
          onChange={() =>
            onChange({
              willBeDoubleVaxed: !formInputs.willBeDoubleVaxed,
            })
          }
          required
        >
          <span>
            I confirm I am or will be double-vaccinated at {copyText.hackathonName}
            <Required />
          </span>
        </Checkbox>
        {error?.willBeDoubleVaxed && <ErrorMessage>{error?.willBeDoubleVaxed}</ErrorMessage>}
      </FormSpacing>
    </>
  )
}
