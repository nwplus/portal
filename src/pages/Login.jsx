import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import Landing from '../containers/Landing'
import { Button } from '../components/Input'
import google from '../assets/icons/google.svg'
import github from '../assets/icons/github.svg'
import { useAuth, googleSignIn, githubSignIn } from '../utility/Auth'
import { FIREBASE_AUTH_ERROR } from '../utility/Constants'
import { useLocation } from 'wouter'
import Toast from '../components/Toast'
import { A } from '../components/Typography'
import { useHackathon } from '../utility/HackathonProvider'
import { copyText } from '../utility/Constants'

import hackcampLoginTicket from '../assets/hc_login_ticket.svg'

const ErrorMessage = ({ message }) => (
  <div>
    There was an issue logging you in{' '}
    <span role="img" aria-label="dizzy face">
      😵
    </span>
    <br />
    {message}
    <br />
    If this persists, please contact <A href="mailto:info@nwplus.io">info@nwplus.io</A>.
  </div>
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
  border-radius: 5px;

  && {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));
    margin-bottom: 0.25em;
    display: inline-flex;
    align-items: center;
    padding-right: 1.5em;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5em 0;
`

const StyledWelcomeImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin-top: -30px;

  ${p => p.theme.mediaQueries.mobile} {
    width: 80%;
  }
`

const getHeading = activeHackathon => {
  if (!copyText[activeHackathon]) {
    return `Welcome to nwPlus!`
  }
  if (activeHackathon !== 'hackcamp') {
    return `Welcome to ${copyText[activeHackathon]?.hackathonName}!`
  }
  return null
}

const getWelcomeImage = activeHackathon => {
  if (activeHackathon === 'hackcamp') {
    return hackcampLoginTicket
  }
  return null
}

const Login = () => {
  const theme = useContext(ThemeContext)
  const { setUser } = useAuth()
  const [, setLocation] = useLocation()
  const [error, setError] = useState(null)
  const { activeHackathon, dbHackathonName } = useHackathon()

  const signInWithGoogle = async () => {
    const error = await googleSignIn(setUser, setLocation, activeHackathon, dbHackathonName)
    setError(error)
  }

  const signInWithGithub = async () => {
    const error = await githubSignIn(setUser, setLocation, activeHackathon, dbHackathonName)
    setError(error)
  }

  return (
    <>
      <Landing heading={getHeading(activeHackathon)} background={theme.colors.background}>
        <StyledWelcomeImage src={getWelcomeImage(activeHackathon)} />
        <ButtonContainer>
          <StyledButton
            width="flex"
            labelColor={theme.colors.login.googleAuthText}
            color={theme.colors.login.googleAuthBackground}
            hover={theme.colors.login.googleAuthBackgroundHover}
            onClick={signInWithGoogle}
          >
            <BoundingBox src={google} />
            Sign in with Google
          </StyledButton>
          <StyledButton
            width="flex"
            labelColor={theme.colors.login.githubAuthText}
            color={theme.colors.login.githubAuthBackground}
            hover={theme.colors.login.githubAuthBackgroundHover}
            onClick={signInWithGithub}
          >
            <BoundingBox src={github} />
            Sign in with GitHub
          </StyledButton>
        </ButtonContainer>
      </Landing>
      <Toast>{error ? handleAuthError(error.code, error.message) : null}</Toast>
    </>
  )
}

export default Login
