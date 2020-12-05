import React, { useState } from 'react'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

// form part 1
export default () => {
  const { lastUpdated } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [states, setStates] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    ethnicity: {
      asian: false,
      black: false,
      caucasian: false,
      hispanic: false,
      middleEastern: false,
      nativeHawaiian: false,
      northAmerica: false,
      other: false,
      preferNot: false,
    },
    isOfLegalAge: null,
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: 0,
    hackathonsAttended: 0,
    contributionRole: '',
    location: '',
  })

  // https://github.com/nwplus/livesite/pull/190/files
  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
  }

  return (
    <>
      <BasicInfo formInputs={states} onChange={setStates} />
      {/* Progress bar should be capped at 25% and should increase with each filled input */}
      <VerticalProgressBar percent={0} />
      {/* Navigation TODO: add force save  */}
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/login')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-2')}
        autosaveTime={lastUpdated}
      />
    </>
  )
}
