import React from 'react'
import { FormSpacing, SubHeading } from '.'
import { A, CenteredH1 } from '../Typography'

export default () => {
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
          We’re excited to have you join us January 20-21, 2024 for a 24-hour long hackathon filled
          with workshops and exciting new events. This year, we’re also giving you the opportunity
          to showcase your project live in front of a panel of judges and hundreds of hackers from
          around North America! We focus on creating a quality hackathon experience all of our
          attendees, so please fill out the form so we can get a better idea of the amount of people
          attending, and of course, craft the best 24-hour hacker experience for you!
        </SubHeading>
        <SubHeading>
          Learn more at{' '}
          <A href="https://nwhacks.io" target="_blank">
            https://nwhacks.io
          </A>
          !
        </SubHeading>
      </FormSpacing>
    </>
  )
}
