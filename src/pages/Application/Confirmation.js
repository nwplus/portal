import React from 'react'
import { useLocation } from 'wouter'
import { Button } from '../../components/Input'
import Landing from '../../containers/Landing'
import { ButtonContainer } from '../Login'

export default () => {
  const [, setLocation] = useLocation()
  return (
    <Landing
      heading="Thanks for Applying!"
      description="Stay tuned as your application gets assessed. Expect to hear from us soon."
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
