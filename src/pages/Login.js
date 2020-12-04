import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import Landing from '../containers/Landing'
import { Button } from '../components/Input'
import google from '../assets/icons/google.svg'
import github from '../assets/icons/github.svg'
import { useAuth, googleSignIn, githubSignIn } from '../utility/Auth'
import { useLocation } from 'wouter'
import { ErrorBanner } from '../components/ErrorBanner'
import { A } from '../components/Typography'
import { copyText } from '../utility/Constants'

const ErrorMessage = (
  <>
    There was an issue logging you in. If this persists, please contact"
    <A href="mailto:info@nwplus.io">info@nwplus.io</A>.
  </>
)

const BoundingBox = styled.img`
  margin: 0 0.75em;
`

const StyledButton = styled(Button)`
  && {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));
    margin-bottom: 0.25em;
    display: inline-flex;
    align-items: center;
    padding-right: 1.5em;
  }
`

export const ButtonContainer = styled.div`
  margin: 0.5em 0;
`

// TODO: authentication
export default () => {
  const theme = useContext(ThemeContext)
  const { setUser } = useAuth()
  const [, setLocation] = useLocation()
  const [showError, setShowError] = useState(false)

  const showErrorMessage = error => {
    if (!error) return
    setShowError(true)
    setTimeout(() => {
      setShowError(false)
    }, 10000)
  }

  const signInWithGoogle = async () => {
    const error = await googleSignIn(setUser, setLocation)
    showErrorMessage(error)
  }

  const signInWithGithub = async () => {
    const error = await githubSignIn(setUser, setLocation)
    showErrorMessage(error)
  }

  return (
    <>
      <Landing
        heading={`Welcome to ${copyText.hackathonName}!`}
        description="Please continue with one of the following:"
        hackathon={theme.name}
      >
        <ButtonContainer>
          <StyledButton
            width="flex"
            color={theme.colors.text}
            hover={theme.colors.login.googleHover}
            onClick={signInWithGoogle}
          >
            <BoundingBox src={google} />
            Continue with Google
          </StyledButton>
          <StyledButton
            width="flex"
            labelColor={theme.colors.text}
            color={theme.colors.secondaryBackground}
            hover={theme.colors.login.githubHover}
            onClick={signInWithGithub}
          >
            <BoundingBox src={github} />
            Continue with GitHub
          </StyledButton>
        </ButtonContainer>
        <A href="/">Return to Portal</A>
      </Landing>
      <ErrorBanner shown={showError} message={ErrorMessage} />
    </>
  )
}
