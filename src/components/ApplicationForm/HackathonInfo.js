import React from 'react'
import { FormSpacing } from '.'
import { A, CenteredH1, P } from '../Typography'

export default () => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Western Canada’s largest hackathon is here! {''}
          <span role="img" aria-label="Party emoji">
            🎉
          </span>
        </CenteredH1>
        <P>
          Join us on January 20-21, 2024, for a thrilling 24-hour hackathon of innovation and
          collaboration. Immerse yourself in a dynamic atmosphere with engaging workshops and
          events, and seize the chance to showcase your project live in front of a distinguished
          panel of judges and a vibrant community of hackers from across North America. Apply now
          and explore the exciting opportunities that await you at nwHacks 2024!{' '}
          <span role="img" aria-label="Rocket emoji">
            🚀
          </span>
        </P>
        <P>
          Learn more at{' '}
          <A href="https://nwhacks.io" target="_blank">
            https://nwhacks.io
          </A>
          !
        </P>
      </FormSpacing>
    </>
  )
}
