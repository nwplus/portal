import React, { useState } from 'react'
import styled from 'styled-components'
import HandWave from '../assets/hand-wave.svg?react'
import Icon from './Icon'
import {
  ANALYTICS_EVENTS,
  APPLICATION_STATUS,
  SOCIAL_LINKS,
  WAIVER_LINKS,
  copyText,
} from '../utility/Constants'
import { analytics } from '../utility/firebase'
import { Button } from './Input/Button'
import Checkbox from './Input/Checkbox'
import { A, H1, HR, P, ErrorSpan as Required } from './Typography'

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
  background: ${p => p.theme.colors.button.grey500};
  color: ${p => p.theme.colors.button.grey700};
  border: 2px solid ${p => p.theme.colors.button.grey500};

  &:hover {
    background: transparent;
    color: ${p => p.theme.colors.button.grey500};
    border: 2px solid ${p => p.theme.colors.button.grey700};
  }

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
  padding-top: 2rem;
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

const UnRSVPModelContainer = styled.div`
  position: absolute;
`

const UnRSVPModelTint = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.6;
  z-index: 1;
`

const UnRSVPModel = styled.div`
  position: absolute;
  display: block;
  margin: 0 auto;
  margin-top: -300px;
  width: 40vw;
  border-radius: 20px;
  padding: 10px;
  background: ${p => p.theme.colors.secondaryBackground};
  z-index: 2;

  ${p => p.theme.mediaQueries.mobile} {
    width: 70vw;
    top: -400px;
    margin: 0;
  }
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

export const hackerStatuses = (relevantDates, hackerName = null) => ({
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
        your commitment to joining the technology community. We would love to see you at
        {copyText.hackathonName} this year; however, at the moment, we cannot confirm a spot for
        you. You have been put on our waitlist and will be notified{' '}
        {relevantDates?.offWaitlistNotify} if we find a spot for you, so please check your email
        then!
        <HR />
        We are currently at full capacity, but everyone is welcome to attend our{' '}
        <A
          href="https://nwplus.notion.site/PUBLIC-cmd-f-2024-Pre-Hackathon-Workshops-b2429635e65a4e79957a63bfd3d8b27d?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          alt="link to cmd-f 2024 pre-hackathon workshops Notion page"
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
    // blurb: `Congratulations! We loved the passion and drive we saw in your application, and we'd love even more for you to join us at ${copyText.hackathonName} over the weekend of ${relevantDates?.hackathonWeekend}! Please RSVP before ${relevantDates?.rsvpBy} to confirm your spot.`,
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
    // blurb: `Your application has not been submitted. Please complete your application and submit before the deadline on ${relevantDates?.applicationDeadline} in order to join us at ${copyText.hackathonName}!`,
    blurb: `Your application has not been submitted. Please complete your application and submit before February 22, 2024 in order to join us at ${copyText.hackathonName}!`,
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
        icon="twitter"
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
  ageOfMajoritySelect,
  setAgeOfMajoritySelect,
  willBeAttendingSelect,
  setWillBeAttendingSelect,
  safewalkSelect,
  setSafewalkSelect,
  nwMentorshipSelect,
  setNwMentorshipSelect,
  username,
  editApplication,
  relevantDates,
  isRsvpOpen,
  handleWaiver,
  waiverName,
  waiverLoading,
}) => {
  // const [safewalk, setSafewalkCheckbox] = useState(safewalkNote || false)
  const [covidWaiver, setCovidWaiver] = useState(covidWaiverCheck || undefined)
  const [releaseLiability, setReleaseLiability] = useState(releaseLiabilityCheck || undefined)
  const [mediaConsent, setMediaConsent] = useState(mediaConsentCheck || undefined)
  // const [ageOfMajority, setAgeOfMajority] = useState(ageOfMajoritySelect || undefined)
  const [willBeAttending, setWillBeAttending] = useState(willBeAttendingSelect || undefined)
  const [safewalk, setSafewalk] = useState(safewalkSelect || undefined)
  const [nwMentorship, setNwMentorship] = useState(nwMentorshipSelect || undefined)

  const hackerRSVPStatus = hackerStatuses()[hackerStatus]?.sidebarText

  const [displayUnRSVPModel, setdisplayUnRSVPModel] = useState('none')
  // const handleChange = () => {
  //   setSafewalkCheckbox(!safewalk)
  //   setSafewalkInput(!safewalkNote)
  // }

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

  // const handleAgeOfMajoritySelectChange = e => {
  //   setAgeOfMajority(e.target.value)
  //   setAgeOfMajoritySelect(e.target.value)
  // }

  const handleWillBeAttendingSelectChange = e => {
    setWillBeAttending(e.target.value)
    setWillBeAttendingSelect(e.target.value)
  }

  const handleSafewalkSelectChange = e => {
    setSafewalk(e.target.value)
    setSafewalkSelect(e.target.value)
  }

  const handleNwMentorshipSelectChange = e => {
    setNwMentorship(e.target.value)
    setNwMentorshipSelect(e.target.value)
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
          <AppStatusText>
            cmd-f 2024 is Western Canada's largest hackathon celebrating underrepresented genders in
            tech!
          </AppStatusText>
          <AppStatusText>
            Registration status: {hackerStatuses()[hackerStatus]?.cardText}
          </AppStatusText>
          <StatusBlurbText>
            {hackerStatuses(relevantDates, username)[hackerStatus]?.blurb}
          </StatusBlurbText>
        </div>
        <div>
          <SocialMediaLinks />
          {isApplicationOpen && (
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
          )}
        </div>

        {/* Hides this option if a user unRSVP'd */}
        {hackerRSVPStatus !== "Un-RSVP'd" && canRSVP && (
          <>
            <SelectContainer>
              <QuestionLabel>
                Will you be attending the upcoming cmd-f event scheduled for March 9 - March 10?{' '}
                <Required />
              </QuestionLabel>
              <SelectOptionContainer>
                <input
                  type="radio"
                  id="willBeAttendingYes"
                  name="willBeAttendingYes"
                  value="willBeAttendingYes"
                  checked={willBeAttending === 'willBeAttendingYes'}
                  onChange={handleWillBeAttendingSelectChange}
                />
                <label htmlFor="willBeAttendingYes">Yes</label>
              </SelectOptionContainer>
            </SelectContainer>

            <SelectContainer>
              <QuestionLabel>
                Safewalk option <Required />
              </QuestionLabel>
              <P>
                While cmd-f is a 24 hour hackathon, you are not required to sleep there. If you live
                closeby, we recommend that you sleep at home on the night of March 9. For safety, we
                are offering a service where cmd-f organizers or volunteers walk hackers anywhere on
                campus.
              </P>
              <P>Would you like to request this service?</P>
              <SelectOptionContainer>
                <input
                  type="radio"
                  id="safewalkYes"
                  name="safewalkYes"
                  value="safewalkYes"
                  checked={safewalk === 'safewalkYes'}
                  onChange={handleSafewalkSelectChange}
                />
                <label htmlFor="safewalkYes">Yes</label>
              </SelectOptionContainer>

              <SelectOptionContainer>
                <input
                  type="radio"
                  id="safewalkNo"
                  name="safewalkNo"
                  value="safewalkNo"
                  checked={safewalk === 'safewalkNo'}
                  onChange={handleSafewalkSelectChange}
                />
                <label htmlFor="safewalkNo">No</label>
              </SelectOptionContainer>
            </SelectContainer>

            {/* <SafeWalkContainer>
              <QuestionLabel>Safewalk option</QuestionLabel>
              <P>
                While cmd-f is a 24 hour hackathon, you are not required to sleep there. If you live
                closeby, we recommend that you sleep at home on the night of March 9. For safety, we
                are offering a service where cmd-f organizers or volunteers walk hackers anywhere on
                campus.
              </P>
              <Checkbox
                checked={safewalk}
                onChange={handleChange}
                label="Would you like to request this service?"
              />
            </SafeWalkContainer> */}

            <QuestionContainer>
              <QuestionLabel>
                Waivers <Required />
              </QuestionLabel>
              <P>
                Please read the waivers carefully. Checking the box is equivalent to signing the
                waiver. If you will be under 19 on March 9, please print and bring a physical copy
                of the waivers.
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
                <A bolded color="primary" width="130px" href={WAIVER_LINKS.RELEASE_LIABILITY}>
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
                <A bolded color="primary" width="130px" href={WAIVER_LINKS.COVID}>
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
                <A bolded color="primary" width="130px" href={WAIVER_LINKS.MEDIA}>
                  Read Full Waiver.
                </A>{' '}
              </WaiverLinkContainer>
              <Checkbox
                checked={mediaConsent}
                onChange={handleMediaConsentChange}
                label="I have read the Media Consent Waiver and agree to its terms."
              />
            </QuestionContainer>

            {/* <div style={{ marginTop: '30px' }}>
              <QuestionLabel>
                For Minors (Under 19) - REQUIRED IF YOU ARE UNDER 19 <Required />
              </QuestionLabel>
              <P>
                If you are under 19, please download the waivers, and have them signed by your
                parent or legal guardian. Bring the signed forms with you to the event.
              </P>
              <div>
                <input
                  type="radio"
                  id="under19"
                  name="under19"
                  value="under19"
                  checked={ageOfMajority === 'under19'}
                  onChange={handleAgeOfMajoritySelectChange}
                />
                <label htmlFor="under19">
                  I am under 19 and will bring the signed waivers on the day of the event.
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="over19"
                  name="over19"
                  value="over19"
                  checked={ageOfMajority === 'over19'}
                  onChange={handleAgeOfMajoritySelectChange}
                />
                <label htmlFor="over19">I am over the age of 19.</label>
              </div>
            </div> */}

            {/* <WaiverUpload>
              <QuestionLabel>Waiver upload</QuestionLabel>
              <WaiverUploadContext>
                Please upload the signed copies of your waivers here. Merge all three waivers into a
                single document. Waivers are required before you can RSVP.
              </WaiverUploadContext>
              <P>File size must be max 2 MB</P>
              <ResumeUploadBtn
                onChange={e => {
                  if (e.target.files[0]) {
                    handleWaiver(e.target.files[0])
                  }
                }}
                hint={waiverName || ''}
              />
            </WaiverUpload> */}

            {/* <QuestionContainer>
              <QuestionLabel>nwMentorship Program</QuestionLabel>
              <P>
                Looking to widen your network and find an experienced mentor who can answer your
                industry and career related questions?
              </P>
              <P>
                Connect with industry mentors from various companies, such as LinkedIn and Bloomberg
                by participating in the nwMentorship program!
              </P>
              <P>
                Applications are reviewed on a rolling basis so be sure to apply ASAP through this{' '}
                <A bolded color="primary" href={WAIVER_LINKS.NWMENTORSHIP}>
                  Google Form
                </A>{' '}
                <b>by March 2nd at 11:59pm!</b>
              </P>
            </QuestionContainer> */}

            <SelectContainer>
              <QuestionLabel>nwMentorship Program</QuestionLabel>
              <P>
                I would like to participate in the nwMentorship program to connect with an industry
                mentor and have submitted my interest through this{' '}
                <A bolded color="primary" href={WAIVER_LINKS.NWMENTORSHIP}>
                  Google Form
                </A>{' '}
              </P>
              <SelectOptionContainer>
                <input
                  type="radio"
                  id="nwMentorshipYes"
                  name="nwMentorshipYes"
                  value="nwMentorshipYes"
                  checked={nwMentorship === 'nwMentorshipYes'}
                  onChange={handleNwMentorshipSelectChange}
                />
                <label htmlFor="nwMentorshipYes">Yes</label>
              </SelectOptionContainer>

              <SelectOptionContainer>
                <input
                  type="radio"
                  id="nwMentorshipNo"
                  name="nwMentorshipNo"
                  value="nwMentorshipNo"
                  checked={nwMentorship === 'nwMentorshipNo'}
                  onChange={handleNwMentorshipSelectChange}
                />
                <label htmlFor="nwMentorshipNo">No</label>
              </SelectOptionContainer>
            </SelectContainer>
          </>
        )}

        <FooterContainer>
          {/* Only show button if a user hasn't unRSVPed yet and can still RSVP*/}
          {hackerRSVPStatus !== "Un-RSVP'd" && canRSVP && (
            <RSVPButton
              width="flex"
              onClick={
                isRsvpOpen &&
                canRSVP &&
                willBeAttending &&
                safewalk &&
                covidWaiver &&
                releaseLiability &&
                (() => setRSVP(canRSVP))
              }
              shouldDisplay={canRSVP || hackerStatus === 'acceptedAndAttending'}
              color={canRSVP ? 'primary' : 'secondary'}
              disabled={
                !(isRsvpOpen && willBeAttending && safewalk && covidWaiver && releaseLiability)
              }
            >
              RSVP
            </RSVPButton>
          )}

          {/* If the user can unRSVP, pop up the placeholder button which pops up a modal */}
          {hackerStatus !== 'acceptedUnRSVP' && hackerStatus === 'acceptedAndAttending' && (
            <>
              <Button
                width="flex"
                color={canRSVP ? 'primary' : 'secondary'}
                onClick={() => setdisplayUnRSVPModel('block')}
              >
                un-RSVP
              </Button>

              {displayUnRSVPModel === 'block' && (
                <UnRSVPModelContainer>
                  <UnRSVPModelTint onClick={() => setdisplayUnRSVPModel('none')} />
                  <UnRSVPModel>
                    <p style={{ marginTop: '30px', marginLeft: '10px' }}>
                      Are you sure that you want to un-RSVP? You won’t be able to RSVP again.
                    </p>

                    <Button width="flex" onClick={() => setdisplayUnRSVPModel('none')}>
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
                  </UnRSVPModel>
                </UnRSVPModelContainer>
              )}
            </>
          )}
        </FooterContainer>
      </StatusContainer>
    </Container>
  )
}

export default Dashboard
