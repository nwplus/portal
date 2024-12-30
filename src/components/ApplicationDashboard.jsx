import React, { useState } from 'react'
import styled from 'styled-components'
import HandWave from '../assets/hand-wave.svg?react'
import Icon from './Icon'
import { ANALYTICS_EVENTS, APPLICATION_STATUS, SOCIAL_LINKS, copyText } from '../utility/Constants'
import { analytics } from '../utility/firebase'
import { Button } from './Input/Button'
import Checkbox from './Input/Checkbox'
import { A, H1, HR, P, ErrorSpan as Required, ErrorMessage } from './Typography'
import { useHackathon } from '../utility/HackathonProvider'

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
  width: auto;
  margin-left: auto;
`

const StatusContainer = styled.div`
  padding: 48px 48px 36px 48px;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 2em;
  }
  border-radius: 21px;
  background-color: ${p => p.theme.colors.backgroundSecondary};
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
  line-height: 2em;
  margin-top: 0.75em;
`

const FooterContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  margin-left: 0;
  ${p => p.theme.mediaQueries.mobile} {
    margin: 1em;
  }
  ${p => !p.shouldDisplay && 'display: none'}
`

const UnRSVPButton = styled(Button)`
  margin-left: auto;
`

// const SafeWalkContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   padding-top: 2rem;
// `

// const CheckboxContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   padding-top: 2rem;
// `

const SelectContainer = styled.div`
  margin-top: 30px;
`

const SelectOptionContainer = styled.div`
  margin-top: 8px;
`

const WaiverLinkContainer = styled.div`
  width: 250px;
`

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 2rem;
`

const UnRSVPModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const UnRSVPModalTint = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`

const UnRSVPModal = styled.div`
  position: relative;
  width: 40vw;
  max-width: 500px;
  border-radius: 20px;
  background: ${p => p.theme.colors.backgroundSecondary};
  padding: 20px;
  z-index: 1001;

  ${p => p.theme.mediaQueries.mobile} {
    width: 90%;
    max-width: none;
  }
`

const UnRSVPButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const SectionLabel = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 20px;
`

const QuestionLabel = styled.div`
  font-weight: bold;
`

// const WaiverUpload = styled.div`
//   padding-top: 2rem;
//   display: flex;
//   gap: 0.5rem;
//   flex-direction: column;
// `

// const WaiverUploadContext = styled.div`
//   line-height: 150%;
// `

export const hackerStatuses = (relevantDates, hackerName = null, activeHackathon, notionLinks) => ({
  applied: {
    sidebarText: 'In Review',
    cardText: 'Awaiting assessment',
    blurb: `We will send out all acceptances by ${relevantDates?.sendAcceptancesBy}. In the meantime, get connected with our community of hackers on Instagram, Facebook, Medium, and Twitter to stay up to date with the latest news on sponsors, prizes and workshops!`,
  },
  waitlisted: {
    sidebarText: 'Waitlisted',
    cardText: 'Waitlisted',
    blurb: (
      <>
        Hi {hackerName}, we had a lovely time reading your application, and were very impressed with
        your commitment to joining the technology community. We would love to see you at{' '}
        {copyText[activeHackathon]?.hackathonName} this year; however, at the moment, we cannot
        confirm a spot for you. You have been put on our waitlist and will be notified by{' '}
        {relevantDates?.offWaitlistNotify} if we find a spot for you, so please check your email
        then!
        <HR />
        We are currently at full capacity, but everyone is welcome to attend our{' '}
        <A
          href={notionLinks?.preHackathonWorkshops}
          target="_blank"
          rel="noopener noreferrer"
          bolded
          color="primary"
        >
          pre-hackathon workshops
        </A>
        .
      </>
    ),
  },

  rejected: {
    sidebarText: 'Rejected',
    cardText: 'Rejected',
    blurb: (
      <>
        Hi {hackerName}, we are sorry to inform you that we won't be able to give you a spot at{' '}
        {copyText[activeHackathon]?.hackathonName}. We had a lot of amazing applicants this year,
        and we are very grateful to have gotten yours, but we can't take everyone. We do hope to see
        your application next year and that this setback isn't the end of your tech career. Please
        visit our site{' '}
        <A bolded href={SOCIAL_LINKS.WEBSITE}>
          nwplus.io
        </A>{' '}
        to learn about more events and other ways to engage with the technology community.
        <HR />
        While we are currently at full capacity, we'd love to still have you join our community!
        Join us for Learn Day - a jam-packed day of workshops that's open to everyone, regardless of
        your application status. Everyone is welcome to attend our{' '}
        <A
          href={notionLinks?.preHackathonWorkshops}
          target="_blank"
          rel="noopener noreferrer"
          bolded
          color="primary"
        >
          pre-hackathon workshops
        </A>
        , where you can expand your technical and career knowledge while connecting with other
        students. Visit the workshop page to find detailed descriptions and pre-requisite
        information for each session!
      </>
    ),
  },
  acceptedNoResponseYet: {
    sidebarText: 'Accepted, Awaiting RSVP',
    cardText: 'Accepted & Awaiting RSVP',
    blurb: `Congratulations! We loved the passion and drive we saw in your application, and we'd love even more for you to join us at ${copyText[activeHackathon]?.hackathonName} over the weekend of ${relevantDates?.hackathonWeekend}! Please RSVP before ${relevantDates?.rsvpBy} to confirm your spot.`,
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
    blurb: `We can't wait to see you at ${copyText[activeHackathon]?.hackathonName}! You'll be receiving another email closer to the event date with more information regarding the schedule and other logistics. If you find out you can't make it to ${copyText[activeHackathon]?.hackathonName} anymore due to a change in your schedule, please update your RSVP status so we can allocate spots for waitlisted hackers!`,
  },
  acceptedUnRSVP: {
    sidebarText: "Un-RSVP'd",
    cardText: "Un-RSVP'd",
    blurb: (
      <>
        We're sorry you won't be attending {copyText[activeHackathon]?.hackathonName}. We do hope to
        see you at our future events, visit our site{' '}
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
        We're sorry you won't be attending {copyText[activeHackathon]?.hackathonName}. We do hope to
        see you at our future events, visit our site{' '}
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
    blurb: `Your application has not been submitted. Please complete your application and submit before ${relevantDates?.applicationDeadline} in order to join us at ${copyText[activeHackathon]?.hackathonName}!`,
  },
})

const headerText = {
  'hackcamp': 'HackCamp 2024 is the largest beginner-only hackathon in Western Canada!',
  'nwhacks': 'nwHacks 2025 is the largest hackathon in Western Canada!',
  'cmd-f':
    "cmd-f 2025 is Western Canada's largest hackathon celebrating underrepresented genders in tech!",
}

export const SocialMediaLinks = () => {
  // TODO: Color of icons for HackCamp TBD
  const UpdateAnalytics = socialName => {
    analytics.logEvent(ANALYTICS_EVENTS.SocialMediaConversion, { socialMedia: socialName })
  }
  return (
    <SocialIconContainer>
      <Icon
        href={SOCIAL_LINKS.IG}
        icon="instagram"
        color="#FFF"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('instagram')}
      />
      <Icon
        href={SOCIAL_LINKS.FB}
        icon="facebook"
        color="#FFF"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('facebook')}
      />
      <Icon
        href={SOCIAL_LINKS.MEDIUM}
        icon="medium"
        color="#FFF"
        brand
        size="2x"
        onClick={() => UpdateAnalytics('medium')}
      />
      <Icon
        href={SOCIAL_LINKS.TW}
        icon="x-twitter"
        color="#FFF"
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
  safewalkNote,
  setSafewalkInput,
  covidWaiverCheck,
  setCovidWaiverCheck,
  releaseLiabilityCheck,
  setReleaseLiabilityCheck,
  mediaConsentCheck,
  setMediaConsentCheck,
  sponsorEmailConsentCheck,
  setSponsorEmailConsentCheck,
  ageOfMajoritySelect,
  setAgeOfMajoritySelect,
  willBeAttendingCheck,
  setWillBeAttendingCheck,
  safewalkSelect,
  setSafewalkSelect,
  nwMentorshipSelect,
  setNwMentorshipSelect,
  marketingFeatureSelect,
  setMarketingFeatureSelect,
  username,
  editApplication,
  relevantDates,
  waiversAndForms,
  notionLinks,
  isRsvpOpen,
  handleWaiver,
  waiverName,
  waiverLoading,
}) => {
  const { activeHackathon } = useHackathon()
  // const [safewalk, setSafewalkCheckbox] = useState(safewalkNote || false)
  const [covidWaiver, setCovidWaiver] = useState(covidWaiverCheck || undefined)
  const [releaseLiability, setReleaseLiability] = useState(releaseLiabilityCheck || undefined)
  const [mediaConsent, setMediaConsent] = useState(mediaConsentCheck || undefined)
  const [sponsorEmailConsent, setSponsorEmailConsent] = useState(sponsorEmailConsentCheck || false)
  // const [ageOfMajority, setAgeOfMajority] = useState(ageOfMajoritySelect || undefined)
  const [willBeAttending, setWillBeAttending] = useState(willBeAttendingCheck || false)
  const [safewalk, setSafewalk] = useState(safewalkSelect || false)
  const [nwMentorship, setNwMentorship] = useState(nwMentorshipSelect || false)
  const [marketingFeature, setMarketingFeature] = useState(marketingFeatureSelect || false)

  const hackerRSVPStatus = hackerStatuses()[hackerStatus]?.sidebarText

  const [displayUnRSVPModal, setDisplayUnRSVPModal] = useState('none')
  const [rsvpErrorMessage, setRsvpErrorMessage] = useState('')

  const askSafewalk = activeHackathon === 'nwhacks' || activeHackathon === 'cmd-f'

  const handleSafewalkChange = () => {
    setSafewalk(!safewalk)
    setSafewalkSelect(!safewalk)
  }

  const handleCovidWaiverChange = () => {
    setCovidWaiver(!covidWaiver)
    setCovidWaiverCheck(!covidWaiverCheck)
  }

  const handleReleaseLiabilityChange = () => {
    setReleaseLiability(!releaseLiability)
    setReleaseLiabilityCheck(!releaseLiabilityCheck)
  }

  const handleMediaConsentChange = () => {
    setMediaConsent(!mediaConsent)
    setMediaConsentCheck(!mediaConsentCheck)
  }

  const handleSponsorEmailConsentChange = () => {
    setSponsorEmailConsent(!sponsorEmailConsent)
    setSponsorEmailConsentCheck(!sponsorEmailConsentCheck)
  }

  // const handleAgeOfMajoritySelectChange = e => {
  //   setAgeOfMajority(e.target.value)
  //   setAgeOfMajoritySelect(e.target.value)
  // }

  const handleWillBeAttendingChange = () => {
    setWillBeAttending(!willBeAttending)
    setWillBeAttendingCheck(!willBeAttendingCheck)
  }

  const handleNwMentorshipChange = () => {
    setNwMentorship(!nwMentorship)
    setNwMentorshipSelect(!nwMentorship)
  }

  const handleMarketingFeatureChange = () => {
    setMarketingFeature(!marketingFeature)
    setMarketingFeatureSelect(!marketingFeature)
  }

  const handleRSVPClick = () => {
    if (isRsvpOpen && willBeAttending && covidWaiver && releaseLiability) {
      setRSVP(canRSVP)
    }
    if (!isRsvpOpen) {
      setRsvpErrorMessage('RSVPs are not open yet!')
    } else {
      setRsvpErrorMessage("Please check all required fields before RSVP'ing!")
    }
  }

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
          <AppStatusText>{headerText[activeHackathon]}</AppStatusText>
          <AppStatusText>
            Registration status: {hackerStatuses()[hackerStatus]?.cardText}
          </AppStatusText>
          <StatusBlurbText>
            {
              hackerStatuses(relevantDates, username, activeHackathon, notionLinks)[hackerStatus]
                ?.blurb
            }
          </StatusBlurbText>
        </div>
        <SocialMediaLinks />

        {/* Hides this option if a user unRSVP'd */}
        {hackerRSVPStatus !== "Un-RSVP'd" && canRSVP && (
          <>
            <SelectContainer>
              <QuestionLabel>
                Will you be attending {copyText[activeHackathon].hackathonName} on the weekend of{' '}
                {relevantDates.hackathonWeekend}? <Required />
              </QuestionLabel>
              <SelectOptionContainer>
                <Checkbox
                  checked={willBeAttending}
                  onChange={handleWillBeAttendingChange}
                  label="Yes, I will be attending"
                />
              </SelectOptionContainer>
            </SelectContainer>

            <QuestionContainer>
              <SectionLabel>
                Waivers <Required />
              </SectionLabel>
              <P>
                Please read the waivers carefully. Checking the box is equivalent to signing the
                waiver. If you will be under 19 on {relevantDates.hackathonWeekend.split('-')[0]},
                please print and bring a physical copy of the waivers.
              </P>
            </QuestionContainer>

            <QuestionContainer>
              <QuestionLabel>
                Release of Liability <Required />
              </QuestionLabel>
              <P>
                This waiver allows nwPlus to use any photos or videos taken during the event for
                promotional purposes.
              </P>
              <WaiverLinkContainer>
                <A
                  bolded
                  width="130px"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={waiversAndForms.releaseLiability}
                >
                  Read Full Waiver.
                </A>{' '}
              </WaiverLinkContainer>
              <Checkbox
                checked={releaseLiability}
                onChange={handleReleaseLiabilityChange}
                label="I have read the Release of Liability Waiver and agree to its terms."
              />
            </QuestionContainer>

            <QuestionContainer>
              <QuestionLabel>
                COVID Liability <Required />
              </QuestionLabel>
              <P>This waiver clarifies that nwPlus is not liable for any COVID-19 related risks.</P>
              <WaiverLinkContainer>
                <A
                  bolded
                  width="130px"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={waiversAndForms.covid}
                >
                  Read Full Waiver.
                </A>{' '}
              </WaiverLinkContainer>
              <Checkbox
                checked={covidWaiver}
                onChange={handleCovidWaiverChange}
                label="I have read the COVID Liability Waiver and agree to its terms."
              />
            </QuestionContainer>

            <QuestionContainer>
              <QuestionLabel>Media Consent</QuestionLabel>
              <P>
                This waiver allows nwPlus to use any photos or videos taken during the event for
                promotional purposes.
              </P>
              <WaiverLinkContainer>
                <A
                  bolded
                  color="primary"
                  width="130px"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={waiversAndForms.media}
                >
                  Read Full Waiver.
                </A>{' '}
              </WaiverLinkContainer>
              <Checkbox
                checked={mediaConsent}
                onChange={handleMediaConsentChange}
                label="I have read the Media Consent Waiver and agree to its terms."
              />
            </QuestionContainer>

            <QuestionContainer>
              <SectionLabel>Other information</SectionLabel>
            </QuestionContainer>

            {askSafewalk && (
              <SelectContainer>
                <QuestionLabel>Safewalk</QuestionLabel>
                <P>
                  While {copyText[activeHackathon].hackathonNameShort} is a 24 hour hackathon, you
                  are not required to sleep there. If you live closeby, we recommend that you sleep
                  at home on the night of {relevantDates.hackathonWeekend.split('-')[0]}. For
                  safety, we are offering a service where nwPlus organizers or volunteers walk
                  hackers anywhere on campus.
                </P>
                <Checkbox
                  checked={safewalk}
                  onChange={handleSafewalkChange}
                  label="Yes, I would like to request this service"
                />
              </SelectContainer>
            )}

            <QuestionContainer>
              <QuestionLabel>Sponsor Email Consent</QuestionLabel>
              <P>
                Would you like to receive hiring opportunities, promotions, and information from
                participating {copyText[activeHackathon].hackathonNameShort} sponsors?
              </P>
              <Checkbox
                checked={sponsorEmailConsent}
                onChange={handleSponsorEmailConsentChange}
                label={`I authorize the use of my email to receive emails from ${copyText[activeHackathon].hackathonNameShort} sponsors`}
              />
            </QuestionContainer>

            <SelectContainer>
              <QuestionLabel>
                {copyText[activeHackathon].hackathonName} Feature Preference
              </QuestionLabel>
              <P>
                We are looking for people to be featured in interview videos about their experience
                at {copyText[activeHackathon].hackathonNameShort}. Filming will take ~10 mins and
                will take place during the hackathon. If chosen, our team will reach out with
                further instructions.
              </P>
              <Checkbox
                checked={marketingFeature}
                onChange={handleMarketingFeatureChange}
                label="Yes, I am interested in participating in feature videos"
              />
            </SelectContainer>

            <SelectContainer>
              <QuestionLabel>nwMentorship Program</QuestionLabel>
              <P>
                nwMentorship is a program that runs from January 2025 to March 2025 designed to
                foster professional and personal growth by connecting experienced mentors with
                hackers seeking guidance and industry insight.
              </P>
              {/* hardcoded for nwHacks */}
              <P>
                If interested in participating in nwMentorship as a mentee and can commit 3-5 hours
                per month to the program, please fill out this {'  '}
                <A
                  bolded
                  color="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={waiversAndForms.nwMentorship}
                >
                  Google Form
                </A>
                {'  '} by Jan 8th, 11:59pm.
              </P>
              <Checkbox
                checked={nwMentorship}
                onChange={handleNwMentorshipChange}
                label="Yes, I would like to participate in the nwMentorship program and have filled out the form"
              />
            </SelectContainer>
          </>
        )}

        <FooterContainer>
          {isApplicationOpen && hackerStatus === APPLICATION_STATUS.inProgress && (
            <EditAppButton color="primary" onClick={editApplication}>
              Complete Your Registration
            </EditAppButton>
          )}
          {/* Only show button if a user hasn't unRSVPed yet and can still RSVP*/}
          {hackerRSVPStatus !== "Un-RSVP'd" && canRSVP && (
            <>
              <RSVPButton
                onClick={handleRSVPClick}
                shouldDisplay={canRSVP || hackerStatus === 'acceptedAndAttending'}
                color={canRSVP ? 'primary' : 'secondary'}
                disabled={!(isRsvpOpen && willBeAttending && covidWaiver && releaseLiability)}
              >
                RSVP
              </RSVPButton>
              {rsvpErrorMessage && <ErrorMessage>{rsvpErrorMessage}</ErrorMessage>}
            </>
          )}

          {/* If the user can unRSVP, pop up the placeholder button which pops up a modal */}
          {hackerStatus !== 'acceptedUnRSVP' && hackerStatus === 'acceptedAndAttending' && (
            <>
              <UnRSVPButton
                width="flex"
                color={canRSVP ? 'primary' : 'secondary'}
                onClick={() => setDisplayUnRSVPModal('block')}
              >
                un-RSVP
              </UnRSVPButton>

              {displayUnRSVPModal === 'block' && (
                <UnRSVPModalContainer>
                  <UnRSVPModalTint onClick={() => setDisplayUnRSVPModal('none')} />
                  <UnRSVPModal>
                    <StatusBlurbText>
                      Are you sure that you want to un-RSVP? You won't be able to RSVP again.
                    </StatusBlurbText>

                    <UnRSVPButtonContainer>
                      <Button width="flex" onClick={() => setDisplayUnRSVPModal('none')}>
                        Cancel
                      </Button>
                      <RSVPButton
                        width="flex"
                        onClick={isRsvpOpen && (() => setRSVP(canRSVP))}
                        shouldDisplay={canRSVP || hackerStatus === 'acceptedAndAttending'}
                        color={canRSVP ? 'primary' : 'secondary'}
                        disabled={!isRsvpOpen}
                      >
                        Yes, I would like to un-RSVP
                      </RSVPButton>
                    </UnRSVPButtonContainer>
                  </UnRSVPModal>
                </UnRSVPModalContainer>
              )}
            </>
          )}
        </FooterContainer>
      </StatusContainer>
    </Container>
  )
}

export default Dashboard
