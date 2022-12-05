import React from 'react'
import styled from 'styled-components'
import Banner from '../Banner'
import { H1, P, QuestionHeading, A, ErrorSpan as Required } from '../Typography'
import { Button, Checkbox } from '../Input'
import { FormSpacing, SubHeading } from './'
import { copyText, EVENTS_ATTENDED, ETHNICITY_OPTIONS } from '../../utility/Constants'
import { SocialMediaLinks } from '../ApplicationDashboard'

const ReviewContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 3em auto;
  ${p => p.theme.mediaQueries.tabletLarge} {
    margin: 1em auto;
  }
`

const ContentWrapper = styled.div`
  ${p =>
    p.grid &&
    `display: grid;
grid-template-columns: auto auto;
grid-template-rows: auto auto auto auto auto auto;
grid-gap: 0;`}
  padding: ${p => (p.textBlock ? `0.5em 0` : `2em`)};
  ${p => p.theme.mediaQueries.tabletLarge} {
    padding: 1em;
  }
  ${p => p.theme.mediaQueries.xs} {
    padding: 1.5em;
  }
`

const InfoGroupWrapper = styled.div`
  padding: 0.5em;
`

const StyledH1 = styled(H1)`
  color: ${p => p.theme.colors.default};
  overflow-wrap: break-word;
  font-size: ${p => (p.heading ? `1.2em` : `1.5em`)};
  ${p => p.theme.mediaQueries.tabletLarge} {
    font-size: ${p => (p.heading ? `1em` : `1.1em`)};
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  ${p => p.theme.mediaQueries.xs} {
    margin-top: 0;
    font-size: ${p => (p.heading ? `1em` : `1.2em`)};
    margin-bottom: 0.5em;
  }
`

const StyledBanner = styled(Banner)`
  background-color: ${p => p.theme.colors.secondaryBackground};
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
    <StyledH1 heading>{heading}</StyledH1>
    <P>{data || 'No response'}</P>
  </InfoGroupWrapper>
)

const getEthnicities = obj => Object.keys(obj).filter(key => obj[key])
const getEvents = obj => Object.keys(obj).filter(key => obj[key])
const capitalizeFirstLetter = val => val.charAt(0).toUpperCase() + val.slice(1)

export default ({ formInputs, handleEdit, onChange }) => {
  // since they're lowercase in firebase
  const gender = capitalizeFirstLetter(formInputs.basicInfo.gender)
  const contributionRole = capitalizeFirstLetter(formInputs.basicInfo.contributionRole)
  const educationLevel = capitalizeFirstLetter(formInputs.basicInfo.educationLevel)

  const ethnicities = getEthnicities(formInputs.basicInfo.ethnicity).map(e => ETHNICITY_OPTIONS[e])
  var ethnicitiesValues = []

  for (var i = 0; i < ethnicities.length; i++) {
    if (ethnicities[i] === 'Multiple ethnicity/Other') {
      ethnicitiesValues.push(formInputs.basicInfo?.otherEthnicity || 'Multiple ethnicity/Other')
    } else {
      ethnicitiesValues.push(ethnicities[i])
    }

    if (i < ethnicities.length - 1) {
      ethnicitiesValues.push(', ')
    }
  }

  const events = getEvents(formInputs.questionnaire.eventsAttended).map(e => EVENTS_ATTENDED[e])
  var attendedValues = []

  for (var j = 0; j < events.length; j++) {
    attendedValues.push(events[j])

    if (j < events.length - 1) {
      attendedValues.push(', ')
    }
  }

  return (
    <>
      <FormSpacing>
        <CenterH1>
          Review Your Submission&nbsp;
          <span role="img" aria-label="eyes">
            &#128064;
          </span>
        </CenterH1>
      </FormSpacing>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Vaccination Status</QuestionHeading>
          <Button
            onClick={() => handleEdit('/application/part-0')}
            height="short"
            color="secondary"
          >
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper grid>
            <InfoGroup
              heading="Will be double-vaccinated"
              data={
                formInputs.vaccineInfo.willBeDoubleVaxed
                  ? 'Yes'
                  : formInputs.vaccineInfo.willBeDoubleVaxed === null
                  ? ''
                  : 'No'
              }
            />
          </ContentWrapper>
        </StyledBanner>
      </ReviewContainer>

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
              heading="Full Legal Name:"
              data={
                formInputs.basicInfo.middleName
                  ? formInputs.basicInfo.firstName.concat(' ').concat(formInputs.basicInfo.lastName)
                  : formInputs.basicInfo.firstName
                      .concat(' ')
                      .concat(formInputs.basicInfo.middleName)
                      .concat(' ')
                      .concat(formInputs.basicInfo.lastName)
              }
            />
            <InfoGroup heading="Gender:" data={gender} />
            <InfoGroup heading="Race/Ethnicity:" data={ethnicitiesValues} />
            <InfoGroup
              heading="19 Years Old or Older:"
              data={
                formInputs.basicInfo.isOfLegalAge
                  ? 'Yes'
                  : formInputs.basicInfo.isOfLegalAge === null
                  ? ''
                  : 'No'
              }
            />
            <InfoGroup heading="Phone Number:" data={formInputs.basicInfo.phoneNumber} />
            <InfoGroup heading="School:" data={formInputs.basicInfo.school} />
            <InfoGroup heading="Intended Major:" data={formInputs.basicInfo.major} />
            <InfoGroup heading="Level of Education:" data={educationLevel} />
            <InfoGroup
              heading="Graduation Year:"
              data={formInputs.basicInfo.graduation === 0 ? '' : formInputs.basicInfo.graduation}
            />
            <InfoGroup
              heading={`Contribution at ${copyText.hackathonName}:`}
              data={contributionRole}
            />
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
            <InfoGroup heading="Prior Hackathons" data={formInputs.skills.hackathonsAttended} />
            <InfoGroup heading="Resume" data={formInputs.skills.resume} />
            <InfoGroup
              heading="Personal Website/Portfolio Link"
              data={formInputs.skills.portfolio}
            />
            <InfoGroup heading="LinkedIn" data={formInputs.skills.linkedin} />
            <InfoGroup heading="GitHub/BitBucket/GitLab" data={formInputs.skills.github} />
            <InfoGroup
              heading="In your own words, describe your definition of a hackathon, and what it means to you."
              data={formInputs.skills.longAnswers1}
            />
            <InfoGroup
              heading="How would you like to challenge yourself during this hackathon? / What should technology be used for?"
              data={formInputs.skills.longAnswers2}
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
              heading={`You heard about ${copyText.hackathonName} from`}
              data={
                formInputs.questionnaire.engagementSource !== 'Other'
                  ? formInputs.questionnaire.engagementSource
                  : formInputs.questionnaire.otherEngagementSource
              }
            />
            <InfoGroup
              heading="Previous events attended:"
              data={attendedValues.length > 0 ? attendedValues : 'None'}
            />
            {/* Commenting out for nwHacks 2023 */}
            {/* <InfoGroup
              heading="Email of friend you're applying with:"
              data={formInputs.questionnaire.friendEmail}
            /> */}
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
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.MLHCodeOfConduct}
            onChange={() =>
              onChange({
                MLHCodeOfConduct: !formInputs.termsAndConditions.MLHCodeOfConduct,
              })
            }
            required
          >
            <span>
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
            </span>
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
              I authorize nwPlus to share my application/registration information for event
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
        </ContentWrapper>
        <ContentWrapper textBlock>
          <P>
            We also use your (anonymized!) data to help you get the best sponsors and continuously
            improve {copyText.hackathonNameShort} with each iteration. Our hackathon aims to connect
            you with industry professionals, recruiters, and career opportunities. In doing so,
            information about our hackers is needed in order for attending companies to contact you.
          </P>
        </ContentWrapper>
        <ContentWrapper textBlock>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.shareWithnwPlus}
            onChange={() =>
              onChange({
                shareWithnwPlus: !formInputs.termsAndConditions.shareWithnwPlus,
              })
            }
            required
          >
            <span>
              I agree to allow my anonymized data to be used for nwPlus data reporting.
              <Required />
            </span>
          </Checkbox>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.shareWithSponsors}
            onChange={() =>
              onChange({
                shareWithSponsors: !formInputs.termsAndConditions.shareWithSponsors,
              })
            }
          >
            I would like to share my resume and supporting links (Linkedin, GitHub, Portfolio) to
            event sponsors and recruiters.
          </Checkbox>
        </ContentWrapper>
      </ReviewContainer>

      <ReviewContainer>
        <QuestionHeading>Social Media</QuestionHeading>
        <SubHeading>
          Connect with the community of nwHacks on Medium, Twitter, and Facebook! Share your story
          and excitement with us!
        </SubHeading>
        <ContentWrapper textBlock>
          <SocialMediaLinks />
        </ContentWrapper>
      </ReviewContainer>
    </>
  )
}
