import React from 'react'
import styled from 'styled-components'
import { H1 } from './Typography'
import { Button } from './Input/Button'
import { SOCIAL_LINKS, hackerStatuses } from '../utility/Constants'
import facebook from '../assets/icons/facebook.svg'
import instagram from '../assets/icons/instagram.svg'
import medium from '../assets/icons/medium.svg'
import twitter from '../assets/icons/twitter.svg'
import { ReactComponent as HandWave } from '../assets/hand-wave.svg'

const Container = styled.div`
  margin: 5em auto;
  width: 70%;
  ${p => p.theme.mediaQueries.mobile} {
    width: 100%;
    margin: 0;
  }
`

const WelcomeHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1em;
`

const WelcomeMessage = styled(H1)`
  text-align: center;
  ${p => p.theme.mediaQueries.mobile} {
    font-size: 1.5em;
  }
`

const StyledHandWave = styled(HandWave)`
  margin-left: 10px;
  margin-top: 20px;
  ${p => p.theme.mediaQueries.mobile} {
    margin-top: 10px;
  }
`

const AppLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HackerAppText = styled.p`
  color: ${p => p.theme.colors.primary};
  margin-top: 1.55em;
`

const EditAppButton = styled(Button)`
  width: 250px;
  margin-right: 0;
`

const StatusContainer = styled.div`
  min-height: 350px;
  padding: 2.5em 4.5em;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 2em;
  }
  border-radius: 21px;
  background-color: ${p => p.theme.colors.applicationCard};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AppStatusText = styled.p`
  font-size: 1.25em;
  font-weight: 700;
  margin-top: 0;
`

const StatusBlurbText = styled.p`
  color: ${p => p.theme.colors.primary};
  font-weight: 700;
  line-height: 2em;
  margin-top: 0.75em;
`

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -24px;
  ${p => p.theme.mediaQueries.mobile} {
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`

const SocialMediaIcons = styled.img`
  margin: 24px;
  ${p => p.theme.mediaQueries.mobile} {
    width: 24px;
    height: 24px;
    margin: 16px;
  }
`

const RSVPButton = styled(Button)`
  margin-right: 0;
  ${p => p.theme.mediaQueries.mobile} {
    margin: 1em;
  }
  ${p => !p.shouldDisplay && 'display: none'}
`

const SocialMediaLinks = () => {
  // TODO: Color of icons for HackCamp TBD
  return (
    <div>
      <a href={SOCIAL_LINKS.FB}>
        <SocialMediaIcons src={facebook} alt="nwPlus Facebook" />
      </a>
      <a href={SOCIAL_LINKS.IG}>
        <SocialMediaIcons src={instagram} alt="nwPlus Instagram" />
      </a>
      <a href={SOCIAL_LINKS.MEDIUM}>
        <SocialMediaIcons src={medium} alt="nwPlus Medium" />
      </a>
      <a href={SOCIAL_LINKS.TW}>
        <SocialMediaIcons src={twitter} alt="nwPlus Twitter" />
      </a>
    </div>
  )
}

const Dashboard = ({
  hackerStatus,
  isApplicationOpen,
  canRSVP,
  setRSVP,
  username,
  editApplication,
}) => {
  return (
    <Container>
      <WelcomeHeader>
        <WelcomeMessage>Welcome Back, {username}</WelcomeMessage>
        <StyledHandWave />
      </WelcomeHeader>
      <AppLinks>
        <HackerAppText>YOUR HACKER APPLICATION</HackerAppText>
        <EditAppButton
          color="secondary"
          onClick={isApplicationOpen && (() => editApplication())}
          disabled={!isApplicationOpen}
        >
          Edit Your Application
        </EditAppButton>
      </AppLinks>
      <StatusContainer>
        <div>
          <AppStatusText>
            Application status: {hackerStatuses[hackerStatus]['cardText']}
          </AppStatusText>
          <StatusBlurbText>{hackerStatuses[hackerStatus]['blurb']}</StatusBlurbText>
        </div>
        <FooterContainer>
          <SocialMediaLinks />
          <RSVPButton
            width="flex"
            onClick={isApplicationOpen && (() => setRSVP(canRSVP))}
            shouldDisplay={canRSVP || hackerStatus === 'acceptedAndAttending'}
            color={canRSVP ? 'primary' : 'secondary'}
            disabled={!isApplicationOpen}
          >
            {canRSVP ? 'RSVP' : 'un-RSVP'}
          </RSVPButton>
        </FooterContainer>
      </StatusContainer>
    </Container>
  )
}

export default Dashboard
