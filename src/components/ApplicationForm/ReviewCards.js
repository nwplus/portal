import React, { useState } from 'react'
import styled from 'styled-components'
import holo from '../../assets/holo_review.svg'
import { CenterHorizontally } from '../Common'
import Banner from '../Banner'
import { H1, H2, H3, P, QuestionHeading, A } from '../Typography'
import { Button, Checkbox } from '../Input'
import { useLocation } from 'wouter'

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
`

const ReviewContainer = styled.div`
  position: relative;
  max-width: 800px;
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
  color: #18cdcd;
`

const StyledBanner = styled(Banner)`
  && {
    max-width: 800px;
    top: 18em;
    padding: 0;
    z-index: 0;
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

const RequiredAsterisk = styled.span`
  color: ${p => p.theme.colors.warning};
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

const getEthnicities = (obj) => Object.keys(obj).filter(key => obj[key])

const mockFormInputs = {
  basicInfo: {
    email: '',
    firstName: 'BLACKPINK',
    lastName: 'Jisoo',
    gender: 'Female',
    ethnicity: { middleEastern: false, asian: true, other: true },
    isOfLegalAge: true,
    phoneNumber: 'DDU-DU DDU-DU',
    school: 'SARANGHAE University',
    major: 'Music',
    educationLevel: 'Undergraduate',
    graduation: 2022,
    hackathonsAttended: 2,
    contributionRole: 'Developer',
    location: 'BLACKPINK IN YOUR AREA',
  },
  skills: {
    resume: 'jisoo-numba-one.pdf',
    portfolio: 'jisoo.io',
    linkedin: 'www.linkedin.com/jisoo',
    github: 'github.com/jisoo',
    longAnswers: 'We are the lovesick girls 네 멋대로 내 사랑을 끝낼 순 없어 We are the lovesick girls 이 아픔 없인 난 아무 의미가 없어 But we were born to be alone Yeah, we were born to be alone Yeah, we were born to be alone But why we still looking for love',
  },
  questionnaire: {
    engagementSource: 'Facebook',
    eventsAttended: ['nwHacks', 'cmd-f'],
  },
}

export default ({ formInputs }) => {
  formInputs = mockFormInputs

  const [termsAndConditions, setTermsAndConditions] = useState({
    MLHCodeOfConduct: false,
    MLHPrivacyPolicy: false,
    shareWithnwPlus: false,
    shareWithSponsors: false,
  })

  const ethnicities = getEthnicities(formInputs.basicInfo.ethnicity).map(e => ethnicityOptions[e])
  var ethnicitiesVal = ''

  for (var i = 0; i < ethnicities.length; i++) {
    ethnicitiesVal = ethnicitiesVal.concat(ethnicities[i])

    if (i < ethnicities.length - 1) {
      ethnicitiesVal = ethnicitiesVal.concat(', ')
    }
  }

  var attendedVal = ''
  for (var i = 0; i < formInputs.questionnaire.eventsAttended.length; i++) {
    attendedVal = attendedVal.concat(formInputs.questionnaire.eventsAttended[i])

    if (i < formInputs.questionnaire.eventsAttended.length - 1) {
      attendedVal = attendedVal.concat(', ')
    }
  }

  const [, setLocation] = useLocation()

  const handleEdit = href => {
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <CenterH1>Review Your Application&nbsp;<span role="img" aria-label="eyes">
        &#128064;
          </span>
      </CenterH1>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Tell us about yourself</QuestionHeading>
          <Button onClick={() => handleEdit('/application/part-1')} height="short" color="secondary">
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper grid>
            {/* TODO: replace hello/hi with actual values from formInputs */}
            <InfoGroup heading="Full Legal Name:" data={formInputs.basicInfo.firstName.concat(' ').concat(formInputs.basicInfo.lastName)} />
            <InfoGroup heading="Gender:" data={formInputs.basicInfo.gender} />
            <InfoGroup heading="Race/Ethnicity:" data={ethnicitiesVal} />
            <InfoGroup heading="19 Years Old or Older" data={formInputs.basicInfo.isOfLegalAge ? 'Yes' : 'No'} />
            <InfoGroup heading="Phone number:" data={formInputs.basicInfo.phoneNumber} />
            <InfoGroup heading="School:" data={formInputs.basicInfo.school} />
            <InfoGroup heading="Intended Major:" data={formInputs.basicInfo.major} />
            <InfoGroup heading="Level of Education" data={formInputs.basicInfo.educationLevel} />
            <InfoGroup heading="Graduation Year:" data={formInputs.basicInfo.graduation} />
            <InfoGroup heading="Prior Hackathons:" data={formInputs.basicInfo.hackathonsAttended} />
            <InfoGroup heading="Contribution at nwHacks" data={formInputs.basicInfo.contributionRole} />
            <InfoGroup heading="Currently Located:" data={formInputs.basicInfo.location} />
          </ContentWrapper>
        </StyledBanner>
      </ReviewContainer>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Flex your skills</QuestionHeading>
          <Button onClick={() => handleEdit('/application/part-2')} height="short" color="secondary">
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper>
            {/* TODO: replace with actual values from formInputs */}
            <InfoGroup heading="Resume" data={formInputs.skills.resume} />
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
          <Button onClick={() => handleEdit('/application/part-3')} height="short" color="secondary">
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <ContentWrapper>
            {/* TODO: replace with actual values from formInputs */}
            <InfoGroup heading="You Heard about nwHacks From" data={formInputs.questionnaire.engagementSource} />
            <InfoGroup
              heading="nwPlus Events Attended:"
              data={attendedVal}
            />
          </ContentWrapper>
        </StyledBanner>
      </ReviewContainer>

      <ReviewContainer>
        <QuestionHeading>Terms &amp; conditions</QuestionHeading>
        <ContentWrapper textBlock>
          <P>
            We participate in Major League Hacking (MLH) as a MLH Member Event. You authorize us to
            share certain application/registration information for event administration, ranking,
            MLH administration, and occasional messages about hackathons in line with the
            <A bolded color="primary" src="https://mlh.io/privacy">
              {' '}
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
          {/* TODO: replace termsAndConditions.MLHCodeOfConduct with formInputs.termsAndConditions.MLHCodeOfConduct for all termsAndConditions */}
          <Checkbox
            checked={termsAndConditions.MLHCodeOfConduct}
            onChange={() =>
              setTermsAndConditions({
                ...termsAndConditions,
                MLHCodeOfConduct: !termsAndConditions.MLHCodeOfConduct,
              })
            }
            required
          >
            I have read and agree to the{' '}
            <A bolded color="primary" src="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
              {' '}
              MLH Code of Conduct
            </A>
            .<RequiredAsterisk>*</RequiredAsterisk>
          </Checkbox>
          <Checkbox
            flex
            checked={termsAndConditions.MLHPrivacyPolicy}
            onChange={() =>
              setTermsAndConditions({
                ...termsAndConditions,
                MLHPrivacyPolicy: !termsAndConditions.MLHPrivacyPolicy,
              })
            }
            label="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the MLH Privacy Policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy."
          />
          <Checkbox
            flex
            checked={termsAndConditions.shareWithnwPlus}
            onChange={() =>
              setTermsAndConditions({
                ...termsAndConditions,
                shareWithnwPlus: !termsAndConditions.shareWithnwPlus,
              })
            }
            label="I agree to allow my anonymized data to be used for nwPlus data reporting."
          />
          <Checkbox
            flex
            checked={termsAndConditions.shareWithSponsors}
            onChange={() =>
              setTermsAndConditions({
                ...termsAndConditions,
                shareWithSponsors: !termsAndConditions.shareWithSponsors,
              })
            }
            label="I agree to allow nwPlus provide event sponsors with my resume and supporting links (Linkedin, GitHub, Personal website) upon request."
          />
        </ContentWrapper>
      </ReviewContainer>

      <HoloBackground src={holo} />
    </>
  )
}
