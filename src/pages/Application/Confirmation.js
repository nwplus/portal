import React from 'react'
import Landing from '../../containers/Landing'
import { Button } from '../../components/Input'
import { ButtonContainer } from '../Login'
import { useLocation } from 'wouter'

export default () => {
  const [, setLocation] = useLocation()
  return (
    <Landing
      heading="Thanks for Applying!"
      description="Stay tuned as your application gets assessed. Expect to hear from us by end of December."
      showFooter
    >
      <ButtonContainer>
        <Button color="primary" width="flex" onClick={() => setLocation('/application')}>
          Go to Dashboard
        </Button>
      </ButtonContainer>
    </Landing>
  )
}
