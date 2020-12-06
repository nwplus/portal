import React from 'react'
import styled from 'styled-components'
import holo from '../../assets/holo_review.svg'
import { CenterHorizontally } from '../Common'
import Banner from '../Banner'
import { H1, H2, H3, P, QuestionHeading } from '../Typography'
import { Button, Checkbox } from '../Input'

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
  margin: 5em auto;
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto auto auto auto;
  grid-gap: 4em;
  padding: 3em;
`

const InfoGroup = ({ heading, data }) => (
  <div>
    <H1 size="1.2em">{heading}</H1>
    <StyledH1 size="1.5em">{data}</StyledH1>
  </div>
)

const StyledBanner = styled(Banner)`
  && {
    max-width: 800px;
    top: 18em;
    padding: 0;
    z-index: 0;
  }
`
const StyledH1 = styled(H1)`
  color: #18cdcd;
  padding-bottom: 2em;
`
const StyledSkillsH1 = styled(H1)`
  color: #18cdcd;
  padding-bottom: 1em;
`

const StyledP = styled(P)`
  color: #06c1c0;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const HeaderDiv = styled.div`
  justify-content: space-between;
  padding: 56px 24px 24px;
`
const LeftDiv = styled.div`
  padding-left: 5em;
`

const RightDiv = styled.div`
  margin-left: 9em;
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
const getEthnicities = ({ obj }) => Object.keys(obj).filter(key => obj[key])

export default ({ formInputs }) => {
  console.log(formInputs)
  return (
    <>
      <CenterH1>Review Your Application</CenterH1>

      <ReviewContainer>
        <JohnDiv>
          <QuestionHeading>Tell us about yourself</QuestionHeading>
          <Button height="short" color="secondary">
            Edit
          </Button>
        </JohnDiv>
        <StyledBanner wide={true} blur>
          <StyledGrid>
            {/* {Object.entries(formInputs.basicInfo).map(([key, val]) => {
              if (key === 'ethnicity') {

              }
              return (
              // <InfoGroup heading={key} data={val} />
            )})} */}
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
            <InfoGroup heading="hi" data="hi" />
          </StyledGrid>
          {/* <StyledDiv>
          <LeftDiv>
            <H1 size="1.2em">Full Legal Name:</H1>
            <StyledH1 size="1.5em">Jisoo</StyledH1>

            <H1 size="1.2em">Race/Ethnicity:</H1>
            <StyledH1 size="1.5em">Asian</StyledH1>

            <H1 size="1.2em">Phone number:</H1>
            <StyledH1 size="1.5em">ligma</StyledH1>

            <H1 size="1.2em">Intended Major:</H1>
            <StyledH1 size="1.5em">Music</StyledH1>

            <H1 size="1.2em">Graduation Year:</H1>
            <StyledH1 size="1.5em">ligma</StyledH1>

            <H1 size="1.2em">Contribution at nwHacks:</H1>
            <StyledH1 size="1.5em">DDU-DU DDU-DU</StyledH1>
          </LeftDiv>

          <RightDiv>
            <H1 size="1.2em">Gender:</H1>
            <StyledH1 size="1.5em">Female</StyledH1>

            <H1 size="1.2em">19 Years Old or Older</H1>
            <StyledH1 size="1.5em">Yes</StyledH1>

            <H1 size="1.2em">School:</H1>
            <StyledH1 size="1.5em">ligma</StyledH1>

            <H1 size="1.2em">Level of Education:</H1>
            <StyledH1 size="1.5em">ligma</StyledH1>

            <H1 size="1.2em">Prior Hackathons</H1>
            <StyledH1 size="1.5em">2</StyledH1>

            <H1 size="1.2em">Currently Located:</H1>
            <StyledH1 size="1.5em">BLACKPINK IN YOUR AREA</StyledH1>
          </RightDiv>
        </StyledDiv> */}
        </StyledBanner>
      </ReviewContainer>

      <HeaderDiv>
        <JohnDiv>
          <StyledP>FLEX YOUR SKILLS</StyledP>
          <Button color="secondary">Edit</Button>
        </JohnDiv>
      </HeaderDiv>
      <StyledBanner wide={true} blur>
        <LeftDiv>
          <H1 size="1.2em">Resume</H1>
          <StyledSkillsH1 size="1.5em">Uploaded: Jisoo.pdf</StyledSkillsH1>

          <H1 size="1.2em">Portfolio</H1>
          <StyledSkillsH1 size="1.5em">ligma</StyledSkillsH1>

          <H1 size="1.2em">LinkedIn</H1>
          <StyledSkillsH1 size="1.5em">ligma</StyledSkillsH1>

          <H1 size="1.2em">Github</H1>
          <StyledSkillsH1 size="1.5em">ligma</StyledSkillsH1>

          <H1 size="1.2em">Answer one of the two questions:</H1>
          <H1 size="1.2em">
            1. Describe how you became interested in the world of technology and where you hope to
            go from here on out!
          </H1>
          <H1 size="1.2em">2. How would you like to challenge yourself during this hackathon?</H1>
          <StyledSkillsH1 size="1.5em">
            We are the lovesick girls 네 멋대로 내 사랑을 끝낼 순 없어 We are the lovesick girls 이
            아픔 없인 난 아무 의미가 없어 But we were born to be alone Yeah, we were born to be
            alone Yeah, we were born to be alone But why we still looking for love
          </StyledSkillsH1>
        </LeftDiv>
      </StyledBanner>

      <HeaderDiv>
        <JohnDiv>
          <StyledP>ALMOST THERE</StyledP>
          <Button color="secondary">Edit</Button>
        </JohnDiv>
      </HeaderDiv>
      <StyledBanner wide={true} blur>
        <LeftDiv>
          <H1 size="1.2em">You Heard About nwHacks From:</H1>
          <StyledSkillsH1 size="1.5em">Facebook</StyledSkillsH1>

          <H1 size="1.2em">nwPlus Events Attended:</H1>
          <StyledSkillsH1 size="1.5em">Local Hack Day / HackCamp, nwHacks, cmd-f</StyledSkillsH1>
        </LeftDiv>
      </StyledBanner>

      <StyledP>TERMS & CONDITIONS</StyledP>
      <P>
        We participate in Major League Hacking (MLH) as a MLH Member Event. You authorize us to
        share certain application/registration information for event administration, ranking, MLH
        administration, and occasional messages about hackathons in line with the MLH Privacy
        Policy.
      </P>
      <P>
        We also use your (anonymized!) data to help you get the best sponsors and continuously
        improve nwHacks with each iteration. Our hackathon aims to connect you with industry
        professionals, recruiters, and career opportunities. In doing so, information about our
        hackers is needed in order for attending companies to contact you.
      </P>
      <Checkbox label="I have read and agree to the MLH Code of Conduct.*" />
      <Checkbox label="I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the MLH Privacy Policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy." />
      <Checkbox label="I agree to allow my anonymized data to be used for nwPlus data reporting." />
      <Checkbox label="I agree to allow nwPlus provide event sponsors with my resume and supporting links (Linkedin, Github, Personal website) upon request." />

      <HoloBackground src={holo} />
    </>
  )
}
