import React from 'react'
import styled from 'styled-components'
import { Button } from './Input'
import { ErrorMessage } from './Typography'
import MoonLoader from 'react-spinners/MoonLoader'

const StyledButton = styled(Button)`
  margin: 0;

  ${p => p.theme.mediaQueries.mobile} {
    margin-bottom: 0.5em;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1em;

  ${p => p.theme.mediaQueries.mobile} {
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

const NavigationButtons = ({
  firstButtonText,
  firstButtonOnClick,
  secondButtonText,
  secondButtonOnClick,
  autosaveTime,
  loading = false,
  showSubmitWarning,
}) => {
  return (
    <NavigationButtonsContainer>
      {autosaveTime && <b>Answers have been autosaved on {autosaveTime}</b>}
      {showSubmitWarning && (
        <ErrorMessage>Caution! You cannot edit your application after submitting.</ErrorMessage>
      )}
      <ButtonContainer>
        {firstButtonText && firstButtonOnClick ? (
          <StyledButton color="secondary" width="flex" onClick={firstButtonOnClick}>
            {firstButtonText}
          </StyledButton>
        ) : (
          <div></div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MoonLoader css={{ margin: '0 10px' }} color="#fff" size="30" loading={loading} />
          <StyledButton width="flex" onClick={secondButtonOnClick}>
            {secondButtonText}
          </StyledButton>
        </div>
      </ButtonContainer>
    </NavigationButtonsContainer>
  )
}

export default NavigationButtons
