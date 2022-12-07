import React from 'react'
import styled from 'styled-components'
import { H1, A } from './Typography'
import { Button } from './Input/Button'
import { ANALYTICS_EVENTS, APPLICATION_STATUS, SOCIAL_LINKS, copyText } from '../utility/Constants'
import Icon from '../components/Icon'
import { ReactComponent as HandWave } from '../assets/hand-wave.svg'
import { analytics } from '../utility/firebase'

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
  color: ${p => p.theme.colors.text};
  margin-top: 1.55em;
`

const EditAppButton = styled(Button)`
  width: 250px;
  margin-right: 0;
  float: right;
  margin-top: 0px;
  background: ${p => p.theme.colors.button.grey600};
  border: solid 2px ${p => p.theme.colors.button.grey700};
  color: ${p => p.theme.colors.button.grey700};

  ${p => p.theme.mediaQueries.desktop} {
    position: relative;
    left: -10px;
    float: left;
    margin-top: 20px;
  }
`

const StatusContainer = styled.div`
  padding: 3em 3em 2em;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 2em;
  }
  border-radius: 21px;
  background-color: ${p => p.theme.colors.secondaryBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AppStatusText = styled.p`
  color: ${p => p.theme.colors.text};
  font-size: 1.25em;
  font-weight: 700;
  margin-top: 0;
`

const StatusBlurbText = styled.p`
  color: ${p => p.theme.colors.text};
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

const SocialIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  float: left;
`

const RSVPButton = styled(Button)`
  margin-right: 0;
  ${p => p.theme.mediaQueries.mobile} {
    margin: 1em;
  }
  ${p => !p.shouldDisplay && 'display: none'}
`

export const hackerStatuses = (relevantDates, hackerName = null) => ({
  applied: {
    sidebarText: 'In Review',
    cardText: 'Awaiting assessment',
    blurb: `We will send out all acceptances by ${relevantDates?.sendAcceptancesBy}. In the meantime, get connected with our community of hackers on Medium, Twitter, and Facebook to stay up to date with the latest news on sponsors, prizes and workshops!`,
  },
  waitlisted: {
    sidebarText: 'Waitlisted',
    cardText: 'Waitlisted',
    blurb: `Hi ${hackerName}, we had a lovely time reading your application, and were very impressed with your commitment to joining the technology community. We would love to see you at ${copyText.hackathonName} this year, however, at the moment, we can not confirm a spot for you. You have been put in our waitlist, and will be notified ${relevantDates?.offWaitlistNotify} if we found a spot for you, so please check your email then!`,
  },
  rejected: {
    sidebarText: 'Rejected',
    cardText: 'Rejected',
    blurb: (
      <>
        Hi {hackerName}, we are sorry to inform you that we won't be able to give you a spot at{' '}
        {copyText.hackathonName}. We had a lot of amazing applicants this year, and we are very
        grateful to have gotten yours, but we can't take everyone. We do hope to see your
        application next year and that this setback isn't the end of your tech career. Please visit
        our site{' '}
        <A bolded color="primary" href={SOCIAL_LINKS.WEBSITE}>
          nwplus.io
        </A>{' '}
        to learn about more events and other ways to engage with the technology community.
      </>
    ),
  },
  acceptedNoResponseYet: {
    sidebarText: 'Accepted, Awaiting RSVP',
    cardText: 'Accepted & Awaiting RSVP',
    blurb: `Congratulations! We loved the passion and drive we saw in your application, and we'd love even more for you to join us at ${copyText.hackathonName} over the weekend of ${relevantDates?.hackathonWeekend}! Please RSVP before ${relevantDates?.rsvpBy} to confirm your spot.`,
  },
  acceptedAndAttending: {
    cardText: (
      <>
        Accepted &amp; RSVP'd{' '}
        <span role="img" aria-label="celebrate emoji">
          🎊
        </span>
      </>
    ),
    blurb: `We can't wait to see you at ${copyText.hackathonName}! You'll be receiving another email closer to the event date with more information regarding the schedule and other logistics. If you find out you can't make it to ${copyText.hackathonName} anymore due to a change in your schedule, please update your RSVP status so we can allocate spots for waitlisted hackers!`,
  },
  acceptedUnRSVP: {
    sidebarText: "Un-RSVP'd",
    cardText: "Un-RSVP'd",
    blurb: (
      <>
        We're sorry you won't be attending {copyText.hackathonName}. We do hope to see you at our
        future events, visit our site{' '}
        <A bolded color="primary" href={SOCIAL_LINKS.WEBSITE}>
          nwplus.io
        </A>{' '}
        or follow us on social media to learn about our events and other ways to engage with the
        technology community!
      </>
    ),
  },
  acceptedNoRSVP: {
    sidebarText: 'No RSVP',
    cardText: 'No RSVP',
    blurb: (
      <>
        We're sorry you won't be attending {copyText.hackathonName}. We do hope to see you at our
        future events, visit our site{' '}
        <A bolded color="primary" href={SOCIAL_LINKS.WEBSITE}>
          nwplus.io
        </A>{' '}
        or follow us on social media to learn about our events and other ways to engage with the
        technology community!
      </>
    ),
  },
  inProgress: {
    sidebarText: 'Not Submitted',
    cardText: 'Not Submitted',
    blurb: `Your application has not been submitted. Please complete your application and submit before the deadline on ${relevantDates?.applicationDeadline} in order to join us at ${copyText.hackathonName}!`,
  },
})

export const SocialMediaLinks = () => {
  // TODO: Color of icons for HackCamp TBD
  const UpdateAnalytics = socialName => {
    analytics.logEvent(ANALYTICS_EVENTS.SocialMediaConversion, { socialMedia: socialName })
  }
  return (
    <SocialIconContainer>
      <Icon
        href={SOCIAL_LINKS.FB}
        icon="facebook"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('facebook')}
      />
      <Icon
        href={SOCIAL_LINKS.IG}
        icon="instagram"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('instagram')}
      />
      <Icon
        href={SOCIAL_LINKS.MEDIUM}
        icon="medium"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('medium')}
      />
      <Icon
        href={SOCIAL_LINKS.TW}
        icon="twitter"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('twitter')}
      />
    </SocialIconContainer>
  )
}

const Dashboard = ({
  hackerStatus,
  isApplicationOpen,
  canRSVP,
  setRSVP,
  username,
  editApplication,
  relevantDates,
  isRsvpOpen,
}) => {
  return (
    <Container>
      <WelcomeHeader>
        <WelcomeMessage>Welcome Back, {username}</WelcomeMessage>
        <StyledHandWave />
      </WelcomeHeader>
      <AppLinks>
        <HackerAppText>YOUR HACKER REGISTRATION</HackerAppText>
      </AppLinks>
      <StatusContainer>
        <div>
          <AppStatusText>
            Registration status: {hackerStatuses()[hackerStatus]?.cardText}
          </AppStatusText>
          <StatusBlurbText>
            {hackerStatuses(relevantDates, username)[hackerStatus]?.blurb}
          </StatusBlurbText>
        </div>
        <div>
          <SocialMediaLinks />
          <EditAppButton
            height="short"
            onClick={
              isApplicationOpen &&
              hackerStatus === APPLICATION_STATUS.inProgress &&
              (() => editApplication())
            }
            disabled={!(isApplicationOpen && hackerStatus === APPLICATION_STATUS.inProgress)}
          >
            Complete Your Registration
          </EditAppButton>
        </div>
        {/* <SocialMediaLinks /> */}
        <FooterContainer>
          <RSVPButton
            width="flex"
            onClick={isRsvpOpen && (() => setRSVP(canRSVP))}
            shouldDisplay={canRSVP || hackerStatus === 'acceptedAndAttending'}
            color={canRSVP ? 'primary' : 'secondary'}
            disabled={!isRsvpOpen}
          >
            {canRSVP ? 'RSVP' : 'un-RSVP'}
          </RSVPButton>
        </FooterContainer>
      </StatusContainer>
    </Container>
  )
}

export default Dashboard
