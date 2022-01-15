import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import Landing from '../containers/Landing'
import { Button } from '../components/Input'
import google from '../assets/icons/google.svg'
import github from '../assets/icons/github.svg'
import { useAuth, googleSignIn, githubSignIn } from '../utility/Auth'
import { DB_HACKATHON, FIREBASE_AUTH_ERROR } from '../utility/Constants'
import { useLocation } from 'wouter'
import Toast from '../components/Toast'
import { A } from '../components/Typography'
import { copyText } from '../utility/Constants'

const ErrorMessage = ({ message }) => (
  <>
    There was an issue logging you in{' '}
    <span role="img" aria-label="dizzy face">
      😵
    </span>
    <br />
    {message}
    <br />
    If this persists, please contact <A href="mailto:info@nwplus.io">info@nwplus.io</A>.
  </>
)

// custom handling of errors
const handleAuthError = (code, message) => {
  switch (code) {
    case FIREBASE_AUTH_ERROR.EXPIRED_POPUP_REQUEST:
      return null
    case FIREBASE_AUTH_ERROR.POPUP_CLOSED_BY_USER:
      return null
    default:
      return <ErrorMessage message={message} />
  }
}

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

export default () => {
  const theme = useContext(ThemeContext)
  const { setUser } = useAuth()
  const [, setLocation] = useLocation()
  const [error, setError] = useState(null)

  const signInWithGoogle = async () => {
    const error = await googleSignIn(setUser, setLocation)
    setError(error)
  }

  const signInWithGithub = async () => {
    const error = await githubSignIn(setUser, setLocation)
    setError(error)
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
            labelColor={theme.colors.login.googleText}
            color={theme.colors.login.googleBg}
            hover={theme.colors.login.googleBgHover}
            onClick={signInWithGoogle}
          >
            <BoundingBox src={google} />
            Continue with Google
          </StyledButton>
          <StyledButton
            width="flex"
            labelColor={theme.colors.login.githubText}
            color={theme.colors.login.githubBg}
            hover={theme.colors.login.githubBgHover}
            onClick={signInWithGithub}
          >
            <BoundingBox src={github} />
            Continue with GitHub
          </StyledButton>
        </ButtonContainer>
        {DB_HACKATHON === 'LHD2021' && <A href="/">Return to Portal</A>}
      </Landing>
      <Toast>{error ? handleAuthError(error.code, error.message) : null}</Toast>
    </>
  )
}
