import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import Landing from '../containers/Landing'
import { Button } from '../components/Input'
import google from '../assets/icons/google.svg'
import github from '../assets/icons/github.svg'
import { useAuth, googleSignIn, githubSignIn } from '../utility/Auth'
import { useLocation } from 'wouter'

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

  const signInWithGoogle = () => {
    googleSignIn(setUser, setLocation)
  }

  const signInWithGithub = () => {
    githubSignIn(setUser, setLocation)
  }

  return (
    <Landing
      heading="Welcome to nwHacks 2021!"
      description="Please continue with one of the following:"
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
          color={theme.colors.foreground}
          hover={theme.colors.login.githubHover}
          onClick={signInWithGithub}
        >
          <BoundingBox src={github} />
          Continue with GitHub
        </StyledButton>
      </ButtonContainer>
    </Landing>
  )
}
