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
          First things first
          <span role="img" aria-label="Vaccine emoji">
            💉
          </span>
        </CenteredH1>
      </FormSpacing>
      <FormSpacing>
        <SubHeading>
          This year, {copyText.hackathonName} is back in-person! Due to MLH{`'`}s regulations and to
          ensure everyone{`'`}s safety, we will only be accepting hackers who are/will be
          double-vaccinated by the day of {copyText.hackathonName}. We will be checking your proof
          of vaccination and ID at sign-in. Thank you for your cooperation!
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
