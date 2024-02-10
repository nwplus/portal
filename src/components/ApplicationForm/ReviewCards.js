import React from 'react'
import styled from 'styled-components'
import {
  CONTRIBUTION_ROLE_OPTIONS,
  CULTURAL_BG_OPTIONS,
  DIETARY_RESTRICTION_OPTIONS,
  ENGAGEMENT_SOURCES,
  EVENTS_ATTENDED,
  MAJOR_OPTIONS,
  PRONOUN_OPTIONS,
  RACE_OPTIONS,
  copyText,
} from '../../utility/Constants'
import { SocialMediaLinks } from '../ApplicationDashboard'
import Banner from '../Banner'
import { Button, Checkbox } from '../Input'
import { A, H1, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import { FormSpacing, SubHeading } from './'

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

const getMajors = obj => Object.keys(obj).filter(key => obj[key])
const getEngagementSources = obj => Object.keys(obj).filter(key => obj[key])
const getPronouns = obj => Object.keys(obj).filter(key => obj[key])
const getRaces = obj => Object.keys(obj).filter(key => obj[key])
const getCulturalBackgrounds = obj => Object.keys(obj).filter(key => obj[key])
const getDietaryRestrictions = obj => Object.keys(obj).filter(key => obj[key])
const getEvents = obj => Object.keys(obj).filter(key => obj[key])
const getContribution = obj => Object.keys(obj).filter(key => obj[key])
const capitalizeFirstLetter = val => val.charAt(0).toUpperCase() + val.slice(1)

export default ({ formInputs, handleEdit, onChange }) => {
  // since they're lowercase in firebase
  const gender = capitalizeFirstLetter(formInputs.basicInfo.gender)
  const countryOfResidence = capitalizeFirstLetter(formInputs.basicInfo.countryOfResidence)
  const educationLevel = capitalizeFirstLetter(formInputs.basicInfo.educationLevel)
  let identifyAsUnderrepresented = capitalizeFirstLetter(
    formInputs.basicInfo.identifyAsUnderrepresented
  )
  if (identifyAsUnderrepresented === 'PreferNotToAnswer') {
    identifyAsUnderrepresented = 'Prefer not to answer'
  }

  let canadianStatus = formInputs.basicInfo.canadianStatus

  if (canadianStatus === 'other') {
    canadianStatus = formInputs.basicInfo.otherCanadianStatus
      ? formInputs.basicInfo.specifiedIndigenousIdentification
      : 'Other Canadian Status'
  } else {
    canadianStatus = capitalizeFirstLetter(formInputs.basicInfo.canadianStatus)
  }

  let indigenousIdentification = capitalizeFirstLetter(
    formInputs.basicInfo.indigenousIdentification
  )

  if (indigenousIdentification === 'Yes') {
    indigenousIdentification += formInputs.basicInfo.specifiedIndigenousIdentification
      ? ': ' + formInputs.basicInfo.specifiedIndigenousIdentification
      : ' Identified as Indigenous/First Nations'
  }

  const dietaryRestrictions = getDietaryRestrictions(formInputs.basicInfo.dietaryRestriction).map(
    e => DIETARY_RESTRICTION_OPTIONS[e]
  )
  var dietaryRestrictionValues = []

  for (var i = 0; i < dietaryRestrictions.length; i++) {
    if (dietaryRestrictions[i] === 'Other (Please Specify)') {
      dietaryRestrictionValues.push(
        formInputs.basicInfo?.otherDietaryRestriction || 'Other Dietary Restriction'
      )
    } else {
      dietaryRestrictionValues.push(dietaryRestrictions[i])
    }
    if (i < dietaryRestrictions.length - 1) {
      dietaryRestrictionValues.push(', ')
    }
  }

  const majors = getMajors(formInputs.basicInfo.major).map(e => MAJOR_OPTIONS[e])
  var majorValues = []

  for (var j = 0; j < majors.length; j++) {
    if (majors[j] === 'Other (Please Specify)') {
      majorValues.push(formInputs.basicInfo?.otherMajor || 'Other Major')
    } else {
      majorValues.push(majors[j])
    }
    if (j < majors.length - 1) {
      majorValues.push(', ')
    }
  }

  const engagementSources = getEngagementSources(formInputs.questionnaire.engagementSource).map(
    e => ENGAGEMENT_SOURCES[e]
  )

  var engagementSourcesValues = []

  for (var k = 0; k < engagementSources.length; k++) {
    if (engagementSources[k] === 'Other (Please Specify)') {
      engagementSourcesValues.push(
        formInputs.questionnaire?.otherEngagementSource || 'Other Engagement Source'
      )
    } else {
      engagementSourcesValues.push(engagementSources[k])
    }

    if (k < engagementSources.length - 1) {
      engagementSourcesValues.push(', ')
    }
  }

  const events = getEvents(formInputs.questionnaire.eventsAttended).map(e => EVENTS_ATTENDED[e])
  var attendedValues = []

  for (var l = 0; l < events.length; l++) {
    attendedValues.push(events[l])

    if (l < events.length - 1) {
      attendedValues.push(', ')
    }
  }

  const contribution = getContribution(formInputs.skills.contributionRole).map(
    e => CONTRIBUTION_ROLE_OPTIONS[e]
  )
  var contributionValues = []

  for (var m = 0; m < contribution.length; m++) {
    contributionValues.push(contribution[m])

    if (m < contribution.length - 1) {
      contributionValues.push(', ')
    }
  }

  const pronouns = getPronouns(formInputs.basicInfo.pronouns).map(e => PRONOUN_OPTIONS[e])

  var pronounValues = []

  for (var n = 0; n < pronouns.length; n++) {
    if (pronouns[n] === 'Other') {
      pronounValues.push(formInputs.basicInfo?.otherPronoun || 'Other Pronoun')
    } else {
      pronounValues.push(pronouns[n])
    }

    if (n < pronouns.length - 1) {
      pronounValues.push(', ')
    }
  }

  const races = getRaces(formInputs.basicInfo.race).map(e => RACE_OPTIONS[e])

  var racesValues = []

  for (var o = 0; o < races.length; o++) {
    if (races[o] === 'Other (Please Specify)') {
      racesValues.push(formInputs.basicInfo?.otherRace || 'Other Race')
    } else {
      racesValues.push(races[o])
    }

    if (o < races.length - 1) {
      racesValues.push(', ')
    }
  }

  const culturalBgs = getCulturalBackgrounds(formInputs.basicInfo.culturalBackground).map(
    e => CULTURAL_BG_OPTIONS[e]
  )

  var culturalBgsValues = []

  for (var p = 0; p < culturalBgs.length; p++) {
    if (culturalBgs[p] === 'Other (Please Specify)') {
      culturalBgsValues.push(
        formInputs.basicInfo?.otherCulturalBackground || 'Other Cultural Background'
      )
    } else {
      culturalBgsValues.push(culturalBgs[p])
    }

    if (p < culturalBgs.length - 1) {
      culturalBgsValues.push(', ')
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
                formInputs.basicInfo.legalMiddleName
                  ? formInputs.basicInfo.legalFirstName
                      .concat(' ')
                      .concat(formInputs.basicInfo.legalLastName)
                  : formInputs.basicInfo.legalFirstName
                      .concat(' ')
                      .concat(formInputs.basicInfo.legalMiddleName)
                      .concat(' ')
                      .concat(formInputs.basicInfo.legalLastName)
              }
            />
            <InfoGroup
              heading="Preferred Name:"
              data={formInputs.basicInfo.preferredName || 'None'}
            />
            <InfoGroup
              heading="Current age:"
              data={
                formInputs.basicInfo.ageByHackathon === 'other'
                  ? formInputs.basicInfo.otherAgeByHackathon
                  : formInputs.basicInfo.ageByHackathon
              }
            />
            <InfoGroup heading="Phone Number:" data={formInputs.basicInfo.phoneNumber} />
            <InfoGroup heading="School:" data={formInputs.basicInfo.school} />
            <InfoGroup heading="Level of Education:" data={educationLevel} />
            <InfoGroup heading="Academic Year:" data={formInputs.basicInfo.academicYear} />
            <InfoGroup
              heading="Graduation Year:"
              data={formInputs.basicInfo.graduation === 0 ? '' : formInputs.basicInfo.graduation}
            />
            <InfoGroup heading="Country of Residence:" data={countryOfResidence} />
            <InfoGroup heading="Dietary restriction(s):" data={dietaryRestrictionValues} />
            <InfoGroup
              heading="Identify As Underrepresented Gender in Tech:"
              data={identifyAsUnderrepresented}
            />
            <InfoGroup
              heading={'Pronouns:'}
              data={pronounValues.length > 0 ? pronounValues : 'None'}
            />
            <InfoGroup heading="Gender:" data={gender ? gender : 'None'} />
            <InfoGroup
              heading={'Intended Major(s):'}
              data={majorValues.length > 0 ? majorValues : 'None'}
            />
            <InfoGroup heading={'Race(s):'} data={racesValues.length > 0 ? racesValues : 'None'} />
            <InfoGroup
              heading="Indigenous/First Nations Identification:"
              data={indigenousIdentification ? indigenousIdentification : 'None'}
            />
            <InfoGroup
              heading={'Cultural Background:'}
              data={culturalBgsValues.length > 0 ? culturalBgsValues : 'None'}
            />
            <InfoGroup heading="Canadian Status:" data={canadianStatus ? canadianStatus : 'None'} />
            <InfoGroup
              heading="Visible/Invisible Disability(ies):"
              data={formInputs.basicInfo.disability ? formInputs.basicInfo.disability : 'None'}
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
            {/* TODO: Change hackathonsAttended to attendedHackathons and make sure the value is an accurate representation */}
            <InfoGroup
              heading="Number of Hackathons Attended"
              data={formInputs.skills.numHackathonsAttended}
            />
            <InfoGroup
              heading={`Contribution at ${copyText.hackathonName}:`}
              data={contributionValues}
            />
            <InfoGroup heading="Resume" data={formInputs.skills.resume} />
            <InfoGroup
              heading="Personal Website/Portfolio Link"
              data={formInputs.skills.portfolio}
            />
            <InfoGroup heading="LinkedIn" data={formInputs.skills.linkedin} />
            <InfoGroup heading="GitHub/BitBucket/GitLab" data={formInputs.skills.github} />
            <InfoGroup
              heading="Why do you want to attend cmd-f 2024?"
              data={formInputs.skills.longAnswers1}
            />
            <InfoGroup
              heading="How would you make tech a more welcoming space for underrepresented demographics?"
              data={formInputs.skills.longAnswers2}
            />
            <InfoGroup
              heading="Tell us about a project you’re really proud of and what you learnt from it."
              data={formInputs.skills.longAnswers3}
            />
            <InfoGroup
              heading="In the past, have there been reasons deterring you from attending hackathons or other tech events? (optional)"
              data={formInputs.skills.longAnswers4 ? formInputs.skills.longAnswers4 : 'None'}
            />
            <InfoGroup
              heading="Is there anything you want to let us know to ensure that we can help you feel comfortable throughout the event? (optional)"
              data={formInputs.skills.longAnswers5 ? formInputs.skills.longAnswers5 : 'None'}
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
              data={engagementSourcesValues}
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
            <span role="img" aria-label="Robot emoji">
              🤖
            </span>{' '}
            cmd-f 2024 is an MLH partner event. The following 3 checkboxes are for this partnership.
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
                color="#FFF"
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
              I authorize nwPlus to share application/registration information with Major League
              Hacking for event administration, ranking, MLH administration, in-line with the{' '}
              <A bolded color="#FFF" href="https://mlh.io/privacy" target="_blank">
                MLH Privacy Policy
              </A>
              . I further agree to the terms of both the{' '}
              <A
                bolded
                color="#FFF"
                href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                target="_blank"
              >
                MLH Contest Terms and Conditions
              </A>{' '}
              and the{' '}
              <A bolded color="#FFF" href="https://mlh.io/privacy" target="_blank">
                MLH Privacy Policy
              </A>{' '}
              <Required />
            </span>
          </Checkbox>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.MLHEmailSubscription}
            onChange={() =>
              onChange({
                MLHEmailSubscription: !formInputs.termsAndConditions.MLHEmailSubscription,
              })
            }
          >
            <span>
              I authorize MLH to send me occasional emails about relevant events, career
              opportunities, and community announcements.
            </span>
          </Checkbox>
        </ContentWrapper>

        <ContentWrapper textBlock>
          <P>
            <span role="img" aria-label="Plant sprout emoji">
              🌱
            </span>{' '}
            Gender is deeply personal and can look different on each individual. We ask all
            participants to trust that everyone attending belongs.
          </P>

          <Checkbox
            flex
            checked={formInputs.termsAndConditions.genderAcknowledgement}
            onChange={() =>
              onChange({
                genderAcknowledgement: !formInputs.termsAndConditions.genderAcknowledgement,
              })
            }
          >
            <span>
              I agree
              <Required />
            </span>
          </Checkbox>
        </ContentWrapper>

        <ContentWrapper textBlock>
          <P>
            <span role="img" aria-label="Floppy disk emoji">
              💾
            </span>{' '}
            We use your (anonymized!) data to help you get the best sponsors and continuously
            improve cmd-f with each iteration.
          </P>
        </ContentWrapper>

        <ContentWrapper textBlock>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.nwPlusPrivacyPolicy}
            onChange={() =>
              onChange({
                nwPlusPrivacyPolicy: !formInputs.termsAndConditions.nwPlusPrivacyPolicy,
              })
            }
            required
          >
            <span>
              I agree to the{' '}
              <A bolded color="#FFF" href="https://nwplus.io/privacy/" target="_blank">
                nwPlus Privacy Policy
              </A>
              <Required />
            </span>
          </Checkbox>
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
              I authorize nwPlus to use my anonymized data for data reporting.
              <Required />
            </span>
          </Checkbox>
        </ContentWrapper>

        <ContentWrapper textBlock>
          <P>
            <span role="img" aria-label="Suitcase emoji">
              💼
            </span>{' '}
            Our hackathon aims to connect you with industry professionals, recruiters, and career
            opportunities. In doing so, information about our hackers is needed in order for
            attending companies to contact you.
          </P>
        </ContentWrapper>

        <ContentWrapper textBlock>
          <Checkbox
            flex
            checked={formInputs.termsAndConditions.shareWithSponsors}
            onChange={() =>
              onChange({
                shareWithSponsors: !formInputs.termsAndConditions.shareWithSponsors,
              })
            }
          >
            I authorize nwPlus to provide my resume and supporting documents (Github, Linkedin, etc)
            to event sponsors for recruitment purposes upon request.
          </Checkbox>
        </ContentWrapper>
      </ReviewContainer>

      <ReviewContainer>
        <QuestionHeading>Social Media</QuestionHeading>
        <SubHeading>
          Connect with the community of nwPlus on Medium, Twitter, and Facebook! Share your story
          and excitement with us!
        </SubHeading>
        <ContentWrapper textBlock>
          <SocialMediaLinks />
        </ContentWrapper>
      </ReviewContainer>
    </>
  )
}
