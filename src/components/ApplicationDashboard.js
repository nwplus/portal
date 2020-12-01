import React from 'react'
import styled from 'styled-components'
import { H1 } from './Typography'
import { Button } from './Input/Button'
import { SOCIAL_LINKS } from '../utility/Constants'
import facebook from '../assets/icons/facebook.svg'
import instagram from '../assets/icons/instagram.svg'
import medium from '../assets/icons/medium.svg'
import twitter from '../assets/icons/twitter.svg'
import { ReactComponent as HandWave } from '../assets/hand-wave.svg'

const Container = styled.div`
  margin: 5em auto;
  width: 70%;
`

const WelcomeHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1em;
`

const WelcomeMessage = styled(H1)`
  text-align: center;
`

const StyledHandWave = styled(HandWave)`
  margin-left: 10px;
  margin-top: 20px;
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
  padding: 2.5em 4.5em 2.5em 3em;
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
`

const SocialMediaIcons = styled.img`
  margin: 24px;
`

const RSVPButton = styled(Button)`
  width = 100px;
  margin-right: 0;
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

const Dashboard = () => {
  return (
    <Container>
      <WelcomeHeader>
        <WelcomeMessage>Welcome Back, INSERT_NAME!</WelcomeMessage>
        <StyledHandWave />
      </WelcomeHeader>
      <AppLinks>
        <HackerAppText>YOUR HACKER APPLICATION</HackerAppText>
        <EditAppButton color="secondary">Edit Your Application</EditAppButton>
      </AppLinks>
      <StatusContainer>
        <div>
          <AppStatusText>Application status: APP_STATUS</AppStatusText>
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
          <RSVPButton color="primary">RSVP</RSVPButton>
        </FooterContainer>
      </StatusContainer>
    </Container>
  )
}

export default Dashboard
