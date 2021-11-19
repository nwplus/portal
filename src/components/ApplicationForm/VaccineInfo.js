import React from 'react'
import { CenteredH1, ErrorMessage, ErrorSpan as Required } from '../Typography'
import { Checkbox } from '../../components/Input'
import { FormSpacing, SubHeading } from './'

// form part 0 for vaccine info
export default ({ formInputs, onChange, error }) => {
  return (
    <>
      <FormSpacing>
        <CenteredH1>
          First things first
          <span role="img" aria-label="Vaccine emoji">
            💉
          </span>
        </CenteredH1>
      </FormSpacing>
      <FormSpacing>
        <SubHeading>
          This year, nwHacks is back in-person! Due to British Columbia's Provincial Health
          Regulation and to ensure everyone's safety, we are only accepting hackers who are/will be
          double-vaccinated by the day of nwHacks. We will be checking for the proof of vaccination
          and your ID at sign-in.
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
            I confirm I will be double-vaccinated at nwHacks
            <Required />
          </span>
        </Checkbox>
        {error?.willBeDoubleVaxed && <ErrorMessage>{error?.willBeDoubleVaxed}</ErrorMessage>}
      </FormSpacing>
    </>
  )
}
