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

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const StyledErrorMessage = styled(ErrorMessage)`
  font-weight: 600;
  color: ${p => p.theme.colors.warning};
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
        <StyledErrorMessage>
          Caution! You cannot edit your application after submitting.
        </StyledErrorMessage>
      )}
      <ButtonContainer>
        {firstButtonText && firstButtonOnClick ? (
          <StyledButton color="secondary" width="flex" onClick={firstButtonOnClick}>
            {firstButtonText}
          </StyledButton>
        ) : (
          <div></div>
        )}
        <RightContainer>
          <MoonLoader color="#fff" size="30px" loading={loading} />
          <StyledButton color="primary" width="flex" onClick={secondButtonOnClick}>
            {secondButtonText}
          </StyledButton>
        </RightContainer>
      </ButtonContainer>
    </NavigationButtonsContainer>
  )
}

export default NavigationButtons
