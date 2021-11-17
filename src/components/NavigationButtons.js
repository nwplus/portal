import React from 'react'
import styled from 'styled-components'
import { Button } from './Input'
import { I, P } from './Typography'
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

const StyledAsterisk = styled.span`
  color: ${p => p.theme.colors.warning};
`

export default ({
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
      {autosaveTime && <I>Answers have been autosaved on {autosaveTime}</I>}
      <ButtonContainer>
        <StyledButton color="secondary" width="flex" onClick={firstButtonOnClick}>
          {firstButtonText}
        </StyledButton>
        <div style={{ display: 'flex' }}>
          <MoonLoader css={{ margin: '0 10px' }} color="#fff" size="30" loading={loading} />
          <StyledButton width="flex" onClick={secondButtonOnClick}>
            {secondButtonText}
          </StyledButton>
        </div>
      </ButtonContainer>
      {showSubmitWarning && (
        <P>
          <StyledAsterisk>**</StyledAsterisk> Caution! You cannot edit your application after
          submitting.
        </P>
      )}
    </NavigationButtonsContainer>
  )
}
