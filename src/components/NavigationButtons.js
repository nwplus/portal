import React from 'react'
import styled from 'styled-components'

import { Button, SecondaryButton, screenBreakpoints } from './Common'
import { I } from './Typography'

const StyledButton = styled(Button)`
  margin: 0;

  @media (max-width: ${screenBreakpoints.xs}px) {
    margin-top: 0.5em;
  }
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1em;

  @media (max-width: ${screenBreakpoints.xs}px) {
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-end;
  }
`

const NavigationButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`

export default ({
  firstButtonText,
  firstButtonHref,
  secondButtonText,
  secondButtonHref,
  autosaveTime,
}) => {
  return (
    <NavigationButtonsContainer>
      <I>Answers have been autosaved at {autosaveTime}</I>
      <ButtonContainer>
        <StyledSecondaryButton href={firstButtonHref}>{firstButtonText}</StyledSecondaryButton>
        <StyledButton href={secondButtonHref}>{secondButtonText}</StyledButton>
      </ButtonContainer>
    </NavigationButtonsContainer>
  )
}
