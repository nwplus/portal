import React from 'react'
import styled from 'styled-components'
import Landing from '../../containers/Landing'
import Button from '../../components/Button'

const ButtonContainer = styled.div`
  margin: 0.5em 0;
`

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
