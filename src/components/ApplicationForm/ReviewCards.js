import React from 'react'
import styled from 'styled-components'
import holo from '../../assets/holo_review.svg'
import Banner from '../Banner'
import { H1, P, QuestionHeading, A, ErrorSpan as Required } from '../Typography'
import { Button, Checkbox } from '../Input'
import { CenterHorizontally } from '../Common'

const HoloBackground = styled.img`
  position: absolute;
  text-align: center;
  display: block;
  float: left;
  overflow-x: hidden;
  margin: 0 auto;
  opacity: 0.8;
  width: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  height: min-content;
  ${CenterHorizontally}
`

const ReviewContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 3em auto;
`

const ContentWrapper = styled.div`
  ${p =>
    p.grid &&
    `display: grid;
grid-template-columns: auto auto;
grid-template-rows: auto auto auto auto auto auto;
grid-gap: 0;`}
  padding: ${p => (p.textBlock ? `0.5em 0` : `2em`)};
`

const InfoGroupWrapper = styled.div`
  padding: 0.5em;
`

const StyledH1 = styled(H1)`
  color: ${p => p.theme.colors.primary};
  overflow-wrap: break-word;
`

const StyledBanner = styled(Banner)`
  && {
    top: 18em;
    padding: 0;
    z-index: 0;
    border-radius: 21px;
  }
`

const JohnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const CenterH1 = styled(H1)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const InfoGroup = ({ heading, data }) => (
  <InfoGroupWrapper>
    <H1 size="1.2em">{heading}</H1>
    <StyledH1 size="1.5em">{data}</StyledH1>
  </InfoGroupWrapper>
)

const ethnicityOptions = {
  asian: 'Asian',
  black: 'Black or African American',
  caucasian: 'Caucasian or European',
  hispanic: 'Hispanic or Latinx',
  middleEastern: 'Middle Eastern',
  nativeHawaiian: 'Native Hawaiian or Pacific Islander',
  northAmerica: 'North American Indigenous',
  other: 'Other',
  preferNot: 'Prefer not to say',
}

const eventOptions = {
  option1: 'Local Hack Day / HackCamp',
  option2: 'nwHacks',
  option3: 'cmd-f',
  option4: 'cmd-f Phases',
  option5: 'nwPlus Workshop Series',
  option6: 'nwPlus Boothing',
}

const getEthnicities = obj => Object.keys(obj).filter(key => obj[key])
const getEvents = obj => Object.keys(obj).filter(key => obj[key])
const capitalizeFirstLetter = val => val.charAt(0).toUpperCase() + val.slice(1)

export default ({ formInputs, handleEdit, onChange, errors }) => {
  // since they're lowercase in firebase
  const gender = capitalizeFirstLetter(formInputs.basicInfo.gender)
  const contributionRole = capitalizeFirstLetter(formInputs.basicInfo.contributionRole)
  const educationLevel = capitalizeFirstLetter(formInputs.basicInfo.educationLevel)

  const ethnicities = getEthnicities(formInputs.basicInfo.ethnicity).map(e => ethnicityOptions[e])
  var ethnicitiesValues = []

  for (var i = 0; i < ethnicities.length; i++) {
    ethnicitiesValues.push(ethnicities[i])

    if (i < ethnicities.length - 1) {
      ethnicitiesValues.push(', ')
    }
  }

  const events = getEvents(formInputs.questionnaire.eventsAttended).map(e => eventOptions[e])
  var attendedValues = []

  for (var j = 0; j < events.length; j++) {
    attendedValues.push(events[j])

    if (j < events.length - 1) {
      attendedValues.push(', ')
    }
  }

  return (
    <>
      <CenterH1>
        Review Your Application&nbsp;
        <span role="img" aria-label="eyes">
          &#128064;
        </span>
      </CenterH1>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Tell us about yourself</QuestionHeading>
          <Button
            onClick={() => handleEdit('/application/part-1')}
            height="short"
            color="secondary"
          >
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper grid>
            <InfoGroup
              heading="Full Name:"
              data={formInputs.basicInfo.firstName
                .concat(' ')
                .concat(formInputs.basicInfo.lastName)}
            />
            <InfoGroup heading="Gender:" data={gender} />
            <InfoGroup heading="Race/Ethnicity:" data={ethnicitiesValues} />
            <InfoGroup
              heading="19 Years Old or Older"
              data={
                formInputs.basicInfo.isOfLegalAge
                  ? 'Yes'
                  : formInputs.basicInfo.isOfLegalAge === null
                  ? ''
                  : 'No'
              }
            />
            <InfoGroup heading="Phone number:" data={formInputs.basicInfo.phoneNumber} />
            <InfoGroup heading="School:" data={formInputs.basicInfo.school} />
            <InfoGroup heading="Intended Major:" data={formInputs.basicInfo.major} />
            <InfoGroup heading="Level of Education" data={educationLevel} />
            <InfoGroup
              heading="Graduation Year:"
              data={formInputs.basicInfo.graduation === 0 ? '' : formInputs.basicInfo.graduation}
            />
            <InfoGroup heading="Prior Hackathons:" data={formInputs.basicInfo.hackathonsAttended} />
            <InfoGroup heading="Contribution at nwHacks:" data={contributionRole} />
            <InfoGroup heading="Currently Located:" data={formInputs.basicInfo.location} />
          </ContentWrapper>
        </StyledBanner>
      </ReviewContainer>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Flex your skills</QuestionHeading>
          <Button
            onClick={() => handleEdit('/application/part-2')}
            height="short"
            color="secondary"
          >
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper>
            <InfoGroup heading="Resume" data={formInputs.skills.resume ?? ''} />
            <InfoGroup heading="Portfolio" data={formInputs.skills.portfolio} />
            <InfoGroup heading="LinkedIn" data={formInputs.skills.linkedin} />
            <InfoGroup heading="GitHub" data={formInputs.skills.github} />
            <InfoGroup heading="Answer one of the two questions:" />
            <InfoGroup heading="1. Describe how you became interested in the world of technology and where you hope to go from here on out!" />
            <InfoGroup
              heading="2. How would you like to challenge yourself during this hackathon?"
              data={formInputs.skills.longAnswers}
            />
          </ContentWrapper>
        </StyledBanner>
      </ReviewContainer>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Almost there</QuestionHeading>
          <Button
            onClick={() => handleEdit('/application/part-3')}
            height="short"
            color="secondary"
          >
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper>
            <InfoGroup
              heading="You Heard about nwHacks From"
              data={
                formInputs.questionnaire.engagementSource !== 'Other'
                  ? formInputs.questionnaire.engagementSource
                  : formInputs.questionnaire.otherEngagementSource
              }
            />
            <InfoGroup heading="nwPlus Events Attended:" data={attendedValues} />
          </ContentWrapper>
        </StyledBanner>
      </ReviewContainer>

      <ReviewContainer>
        <QuestionHeading>Terms &amp; conditions</QuestionHeading>
        <ContentWrapper textBlock>
          <P>
            We participate in Major League Hacking (MLH) as a MLH Member Event. You authorize us to
            share certain application/registration information for event administration, ranking,
            MLH administration, and occasional messages about hackathons in line with the{' '}
            <A bolded color="primary" href="https://mlh.io/privacy" target="_blank">
              MLH Privacy Policy
            </A>
            .
          </P>
        </ContentWrapper>
        <ContentWrapper textBlock>
          <P>
            We also use your (anonymized!) data to help you get the best sponsors and continuously
            improve nwHacks with each iteration. Our hackathon aims to connect you with industry
            professionals, recruiters, and career opportunities. In doing so, information about our
            hackers is needed in order for attending companies to contact you.
          </P>
        </ContentWrapper>
        <ContentWrapper textBlock>
          <Checkbox
            checked={formInputs.termsAndConditions.MLHCodeOfConduct}
            onChange={() =>
              onChange({
                MLHCodeOfConduct: !formInputs.termsAndConditions.MLHCodeOfConduct,
              })
            }
            required
          >
            I have read and agree to the{' '}
            <A
              bolded
              color="primary"
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
              target="_blank"
            >
              MLH Code of Conduct
            </A>
            .<Required />
          </Checkbox>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.MLHPrivacyPolicy}
            onChange={() =>
              onChange({
                MLHPrivacyPolicy: !formInputs.termsAndConditions.MLHPrivacyPolicy,
              })
            }
          >
            <span>
              I authorize you to share my application/registration information for event
              administration, ranking, MLH administration, pre- and post-event informational
              e-mails, and occasional messages about hackathons in-line with the{' '}
              <A bolded color="primary" href="https://mlh.io/privacy" target="_blank">
                MLH Privacy Policy
              </A>
              . I further agree to the terms of both the{' '}
              <A
                bolded
                color="primary"
                href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                target="_blank"
              >
                MLH Contest Terms and Conditions
              </A>{' '}
              and the MLH Privacy Policy.
              <Required />
            </span>
          </Checkbox>
          <Checkbox
            checked={formInputs.termsAndConditions.shareWithnwPlus}
            onChange={() =>
              onChange({
                shareWithnwPlus: !formInputs.termsAndConditions.shareWithnwPlus,
              })
            }
            required
          >
            I agree to allow my anonymized data to be used for nwPlus data reporting.
            <Required />
          </Checkbox>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.shareWithSponsors}
            onChange={() =>
              onChange({
                shareWithSponsors: !formInputs.termsAndConditions.shareWithSponsors,
              })
            }
            label="I would like to share my resume and supporting links (Linkedin, GitHub, Portfolio) to event sponsors and recruiters."
          />
        </ContentWrapper>
      </ReviewContainer>
      <HoloBackground src={holo} />
    </>
  )
}
