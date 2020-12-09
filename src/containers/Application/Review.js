import React from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import ReviewCards from '../../components/ApplicationForm/ReviewCards'
import { useLocation } from 'wouter'

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
    eventsAttended: ['nwHacks', 'cmd-f'],
  },
  termsAndConditions: {
    MLHCodeOfConduct: false,
    MLHPrivacyPolicy: false,
    shareWithnwPlus: false,
    shareWithSponsors: false,
  },
}

export default () => {
  // TODO: uncomment and replace mockFormInputs
  // const { application } = useHackerApplication()
  const [, setLocation] = useLocation()

  const handleEdit = href => {
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
    window.scrollTo(0, 0)
  }
  return (
    <>
      <VerticalProgressBar percent={100} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-3')}
        secondButtonText="Submit"
        secondButtonOnClick={() => handleNavigation('/application/confirmation')}
        autosaveTime="4:20am" // TODO: replace with application.submission.lastUpdated.toDate().toString()
      />
      <ReviewCards formInputs={mockFormInputs} handleEdit={handleEdit} />
    </>
  )
}
