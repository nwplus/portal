import React from 'react'
import { FormSpacing } from '.'
import { A, CenteredH1, P } from '../Typography'

export default () => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          nwPlus is proud to present cmd-f 2024 - Western Canada's largest hackathon celebrating
          underrepresented genders in tech.
        </CenteredH1>
        <P>
          We are beyond excited to host the 6th iteration of our hackathon on March 9-10, 2024! 
          cmd-f is a hackathon focused on addressing gender inequality in technology. Our main
          purpose is to create a safe and dedicated space for gender minorities to hack together.
          We’re trying to create access for people who have historically been excluded. We encourage
          participation from women, trans, non-binary, Two-Spirit and gender diverse people. Thus,
          cmd-f is only open to individuals who identify as an underrepresented gender in
          technology. Please make sure your participation in this event is aligned with the
          intentions of the event. We also ask all participants who attend to trust that everyone
          attending is meant to be here.
        </P>
        <P>
          <span role="img" aria-label="Plant sprout emoji">
            🌱 
          </span>
          Time: March 9-10, 2024 
        </P>
        <P>
          <span role="img" aria-label="Plant sprout emoji">
            🌱 
          </span>
          Location: Life Sciences Institute, UBC
        </P>
        <P>
          Hacker application deadline: <b>March 1, 2024</b>
        </P>
        <P>
          If you have any questions, feel free to reach out to the team at{' '}
          <A href="mailto:cmd-f@nwplus.io" target="_blank">
            cmd-f@nwplus.io
          </A>
          !
        </P>
        <P>
          Learn more at{' '}
          <A href="https://cmd-f.nwplus.io/" target="_blank">
            cmd-f.nwplus.io
          </A>
          !
        </P>
      </FormSpacing>
    </>
  )
}
