import React from 'react'
import styled from 'styled-components'
import { ENGAGEMENT_SOURCES, EVENTS_ATTENDED, copyText } from '../../utility/Constants'
import { SocialMediaLinks } from '../ApplicationDashboard'
import Banner from '../Banner'
import { Button, Checkbox } from '../Input'
import { A, H1, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import { FormSpacing, SubHeading } from './index'
import { useHackathon } from '../../utility/HackathonProvider'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

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

const PortfolioInfoGroup = ({ formInputs }) => {
  return (
    <>
      <InfoGroup heading="Resume" data={formInputs.skills.resume} />
      <InfoGroup heading="Personal Website/Portfolio Link" data={formInputs.skills.portfolio} />
      <InfoGroup heading="LinkedIn" data={formInputs.skills.linkedin} />
      <InfoGroup heading="GitHub/BitBucket/GitLab" data={formInputs.skills.github} />
    </>
  )
}

const LegalNameInfoGroup = ({ formInputs }) => {
  return (
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
  )
}

const InfoGroup = ({ heading, data, type, formInputs }) => {
  let displayText

  if (type === 'Portfolio') {
    return <PortfolioInfoGroup formInputs={formInputs} />
  }

  if (type === 'Full Legal Name') {
    return <LegalNameInfoGroup formInputs={formInputs} />
  }

  if (type === 'Select All' && data !== null) {
    const trueKeys = Object.keys(data)
      .filter(key => data[key] === true)
      .map(key => key.charAt(0).toUpperCase() + key.slice(1))
    displayText = trueKeys.length > 0 ? trueKeys.join(', ') : 'No response'
  } else {
    displayText = data || 'No response'
  }

  return (
    <InfoGroupWrapper>
      <StyledH1>{heading}</StyledH1> <P>{displayText}</P>
    </InfoGroupWrapper>
  )
}

const getEngagementSources = obj => Object.keys(obj).filter(key => obj[key])
const getEvents = obj => Object.keys(obj).filter(key => obj[key])
const capitalizeFirstLetter = val => val.charAt(0).toUpperCase() + val.slice(1)

const ReviewCards = ({ formInputs, handleEdit, onChange }) => {
  const { activeHackathon } = useHackathon()
  const { basicInfoQuestions, skillsQuestions } = useHackerApplication()

  const toOtherCamelCase = str => {
    const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
    return `other${capitalizedStr}`
  }

  // since they're lowercase in firebase
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
            {basicInfoQuestions.map(question => {
              return (
                <InfoGroup
                  heading={question.title}
                  data={
                    formInputs.basicInfo[question.formInput] === 'other'
                      ? formInputs.basicInfo[toOtherCamelCase(question.formInput)]
                      : formInputs.basicInfo[question.formInput]
                  }
                  type={question.type}
                  formInputs={formInputs}
                />
              )
            })}
            {/* <InfoGroup
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
            /> */}
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
            {skillsQuestions.map(question => {
              return (
                <InfoGroup
                  heading={question.title}
                  data={
                    formInputs.skills[question.formInput] === 'other'
                      ? formInputs.skills[toOtherCamelCase(question.formInput)]
                      : formInputs.skills[question.formInput]
                  }
                  type={question.type}
                  formInputs={formInputs}
                />
              )
            })}
            {/* TODO: Change hackathonsAttended to attendedHackathons and make sure the value is an accurate representation */}
            {/* <InfoGroup
              heading="Number of Hackathons Attended"
              data={formInputs.skills.numHackathonsAttended}
            />
            <InfoGroup
              heading={`Contribution at ${copyText[activeHackathon].hackathonName}:`}
              data={contributionValues}
            /> */}
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
              heading={`You heard about ${copyText[activeHackathon].hackathonName} from`}
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
            participants to trust that everyone attending belongs at cmd-f.
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

export default ReviewCards
