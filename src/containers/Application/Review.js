import React from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import ReviewCards from '../../components/ApplicationForm/ReviewCards'

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
    longAnswers:
      'We are the lovesick girls 네 멋대로 내 사랑을 끝낼 순 없어 We are the lovesick girls 이 아픔 없인 난 아무 의미가 없어 But we were born to be alone Yeah, we were born to be alone Yeah, we were born to be alone But why we still looking for love',
  },
  questionnaire: {
    engagementSource: 'Facebook',
    eventsAttended: {
      option1: false, // LHD / Hack Camp
      option2: true, // nwHacks
      option3: true, // cmd-f
      option4: false, // cmd-f Phases
      option5: false, // nwPlus Workshop Series
      option6: false, // nwPlus Boothing
    },
  },
  termsAndConditions: {
    MLHCodeOfConduct: false,
    MLHPrivacyPolicy: false,
    shareWithnwPlus: false,
    shareWithSponsors: false,
  },
}

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()

  const handleEdit = href => {
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleNavigation = async href => {
    await forceSave()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const updateTermsAndConditions = change => {
    updateApplication({
      termsAndConditions: {
        ...change,
      },
    })
  }

  return (
    <>
      <VerticalProgressBar percent={100} />
      <ReviewCards
        formInputs={application}
        handleEdit={handleEdit}
        onChange={updateTermsAndConditions}
      />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-3')}
        secondButtonText="Submit"
        secondButtonOnClick={() => handleNavigation('/application/confirmation')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()} // TODO: replace with application.submission.lastUpdated.toDate().toString()
      />
    </>
  )
}
