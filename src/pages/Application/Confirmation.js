import React from 'react'
import Landing from '../../containers/Landing'
import Button from '../../components/Button'
import { ButtonContainer } from '../Login'

// TODO: add redirect to the button
export default () => {
  return (
    <Landing
      heading="Thanks for Applying!"
      description="Stay tuned as your application gets assessed. Expect to hear from us by end of December."
      showFooter
    >
      <ButtonContainer>
        <Button color="primary" width="flex">
          Back to Home
        </Button>
      </ButtonContainer>
    </Landing>
  )
}
