import React from 'react'
import styled from 'styled-components'
import { MAJOR_OPTIONS } from '../../utility/Constants'
import { SocialMediaLinks } from '../ApplicationDashboard'
import Banner from '../Banner'
import { Button, Checkbox } from '../Input'
import { A, H1, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import { FormSpacing, SubHeading } from './index'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { toOtherCamelCase } from '../../utility/utilities'
import { copyText } from '../../utility/Constants'
import { useHackathon } from '../../utility/HackathonProvider'

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
  background-color: ${p => p.theme.colors.backgroundSecondary};
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

const IndentedCheckbox = styled(Checkbox)`
  margin-left: 1.5em;
`

const PortfolioInfoGroup = ({ formInputs }) => {
  return (
    <>
      <InfoGroup heading="Resume" data={formInputs.resume} />
      <InfoGroup heading="Personal Website/Portfolio Link" data={formInputs.portfolio} />
      <InfoGroup heading="LinkedIn" data={formInputs.linkedin} />
      <InfoGroup heading="GitHub/BitBucket/GitLab" data={formInputs.github} />
    </>
  )
}

const LegalNameInfoGroup = ({ formInputs }) => {
  return (
    <InfoGroup
      heading="Full Legal Name:"
      data={
        formInputs.legalMiddleName
          ? formInputs.legalFirstName.concat(' ').concat(formInputs.legalLastName)
          : formInputs.legalFirstName
              .concat(' ')
              .concat(formInputs.legalMiddleName)
              .concat(' ')
              .concat(formInputs.legalLastName)
      }
    />
  )
}

const MajorInfoGroup = ({ formInputs }) => {
  const majors = getMajors(formInputs.major).map(e => MAJOR_OPTIONS[e])
  var majorValues = []
  for (var j = 0; j < majors.length; j++) {
    if (majors[j] === 'Other (Please Specify)') {
      majorValues.push(formInputs.otherMajor || 'Other Major')
    } else {
      majorValues.push(majors[j])
    }
    if (j < majors.length - 1) {
      majorValues.push(', ')
    }
  }
  return (
    <InfoGroup
      heading={'Major/Intended Major(s):'}
      data={majorValues.length > 0 ? majorValues : 'None'}
    />
  )
}

const InfoGroup = ({ heading, data, type, formInputs, formInput }) => {
  let displayText

  if (type === 'Portfolio') {
    return <PortfolioInfoGroup formInputs={formInputs} />
  }

  if (type === 'Full Legal Name') {
    return <LegalNameInfoGroup formInputs={formInputs} />
  }

  if (type === 'Major') {
    return <MajorInfoGroup formInputs={formInputs} />
  }

  if (type === 'Country') {
    formInput = 'countryOfResidence'
    data = formInputs[formInput]
  }
  if (type === 'School') {
    formInput = 'school'
    data = formInputs[formInput]
  }

  if (type === 'Select All' && data !== null) {
    const trueKeys = Object.keys(data)
      .filter(key => data[key] === true)
      .map(key => {
        if (key === 'other') {
          const camelCaseKey = toOtherCamelCase(formInput)
          return formInputs[camelCaseKey]
        } else {
          return key
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between lowercase and uppercase letters
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle cases with consecutive uppercase letters
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle cases with lowercase followed by uppercase
            .toLowerCase() // Convert the entire string to lowercase
            .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
        }
      })
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

const getMajors = obj => Object.keys(obj).filter(key => obj[key])

const ReviewCards = ({ formInputs, handleEdit, onChange }) => {
  const { basicInfoQuestions, skillsQuestions, questionnaireQuestions } = useHackerApplication()
  const { activeHackathon } = useHackathon()

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
                    formInputs.basicInfo[question.formInput] === 'other' ||
                    formInputs.basicInfo[question.formInput] === 'Other'
                      ? formInputs.basicInfo[toOtherCamelCase(question.formInput)]
                      : formInputs.basicInfo[question.formInput]
                  }
                  type={question.type}
                  formInputs={formInputs.basicInfo}
                  formInput={question.formInput}
                />
              )
            })}
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
                    formInputs.skills[question.formInput] === 'other' ||
                    formInputs.skills[question.formInput] === 'Other'
                      ? formInputs.skills[toOtherCamelCase(question.formInput)]
                      : formInputs.skills[question.formInput]
                  }
                  type={question.type}
                  formInputs={formInputs.skills}
                  formInput={question.formInput}
                />
              )
            })}
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
            {questionnaireQuestions.map(question => {
              return (
                <InfoGroup
                  heading={question.title}
                  data={
                    formInputs.questionnaire[question.formInput] === 'other' ||
                    formInputs.questionnaire[question.formInput] === 'Other'
                      ? formInputs.questionnaire[question.formInput]
                      : formInputs.questionnaire[question.formInput]
                  }
                  type={question.type}
                  formInputs={formInputs.questionnaire}
                  formInput={question.formInput}
                />
              )
            })}
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
            {copyText[activeHackathon].hackathonNameShort} is an MLH partner event. The following 3
            checkboxes are for this partnership.
          </P>
          <IndentedCheckbox
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
                Code of Conduct
              </A>
              .<Required />
            </span>
          </IndentedCheckbox>
          <IndentedCheckbox
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
          </IndentedCheckbox>
          <IndentedCheckbox
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
          </IndentedCheckbox>
        </ContentWrapper>

        {activeHackathon === 'cmd-f' && (
          <ContentWrapper textBlock>
            <P>
              <span role="img" aria-label="Plant sprout emoji">
                🌱
              </span>{' '}
              Gender is deeply personal and can look different on each individual. We ask all
              participants to trust that everyone attending belongs at cmd-f.
            </P>

            <IndentedCheckbox
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
            </IndentedCheckbox>
          </ContentWrapper>
        )}

        <ContentWrapper textBlock>
          <P>
            <span role="img" aria-label="Floppy disk emoji">
              💾
            </span>{' '}
            We use your (anonymized!) data to help you get the best sponsors and continuously
            improve {copyText[activeHackathon].hackathonNameShort} with each iteration.
          </P>
        </ContentWrapper>

        <ContentWrapper textBlock>
          <IndentedCheckbox
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
          </IndentedCheckbox>
          <IndentedCheckbox
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
          </IndentedCheckbox>
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
          <IndentedCheckbox
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
          </IndentedCheckbox>
        </ContentWrapper>
      </ReviewContainer>

      <ReviewContainer>
        <QuestionHeading>Social Media</QuestionHeading>
        <SubHeading>
          Connect with the community of nwPlus on Instagram, Facebook, and Medium! Share your story
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
