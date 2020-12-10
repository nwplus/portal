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
import { useAuth } from '../utility/Auth'
import { useHackerApplication } from '../utility/HackerApplicationContext'
import { useLocation } from 'wouter'

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

const Dashboard = ({ hackerStatus }) => {
  const { user } = useAuth()
  const { updateApplication } = useHackerApplication()
  const [, setLocation] = useLocation()
  const canRSVP =
    hackerStatus === 'acceptedNoResponseYet' || hackerStatus === 'acceptedNotAttending'
  const setRSVP = canRSVP => {
    updateApplication({
      status: {
        responded: true,
        attending: canRSVP,
      },
    })
  }
  return (
    <Container>
      <WelcomeHeader>
        <WelcomeMessage>Welcome Back, {user.displayName}</WelcomeMessage>
        <StyledHandWave />
      </WelcomeHeader>
      <AppLinks>
        <HackerAppText>YOUR HACKER APPLICATION</HackerAppText>
        <EditAppButton color="secondary" onClick={() => setLocation('/application/part-1')}>
          Edit Your Application
        </EditAppButton>
      </AppLinks>
      <StatusContainer>
        <div>
          <AppStatusText>
            Application status: {hackerStatuses[hackerStatus]['cardText']}
          </AppStatusText>
          <StatusBlurbText>
            We will send out all acceptances by XX, XX, XXXX. In the mean time, get connected with
            our community of hackers on Medium, Twitter, and Facebook to stay up to date with the
            latest news on sponsors, prizes and workshops. We will send out all acceptances by XX,
            XX, XXXX. In the mean time, get connected with our community of hackers on Medium,
            Twitter, and Facebook to stay up to date with the latest news on sponsors, prizes and
            workshops. We will send out all acceptances by XX, XX, XXXX. In the mean time, get
            connected with our community of hackers on Medium, Twitter, and Facebook to stay up to
            date with the latest news on sponsors, prizes and workshops. We will send out all
            acceptances by XX, XX, XXXX. In the mean time, get connected with our community of
            hackers on Medium, Twitter, and Facebook to stay up to date with the latest news on
            sponsors, prizes and workshops.
          </StatusBlurbText>
        </div>
        <FooterContainer>
          <SocialMediaLinks />
          <RSVPButton
            width="flex"
            onClick={() => setRSVP(canRSVP)}
            shouldDisplay={canRSVP || hackerStatus === 'acceptedAndAttending'}
            color={canRSVP ? 'primary' : 'secondary'}
          >
            {canRSVP ? 'RSVP' : 'un-RSVP'}
          </RSVPButton>
        </FooterContainer>
      </StatusContainer>
    </Container>
  )
}

export default Dashboard
