import React from 'react'
import { useLocation } from 'wouter'
import { Button } from '../../components/Input'
import Landing from '../../containers/Landing'
import { ButtonContainer } from '../Login'
import { useHackathon } from '../../utility/HackathonProvider'

const Confirmation = () => {
  const [, setLocation] = useLocation()
  const { activeHackathon } = useHackathon()
  return (
    <Landing
      heading="Thanks for Applying!"
      description="Stay tuned as we assess your application. Expect to hear from us soon."
      hackathon={activeHackathon}
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

export default Confirmation
