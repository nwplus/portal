import React, { useState } from 'react'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'

// form part 1
export default () => {
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

  return (
    <>
      <BasicInfo formInputs={states} onChange={setStates} />
      {/* Progress bar should be capped at 25% and should increase with each filled input */}
      <VerticalProgressBar percent={0} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonHref="/login"
        secondButtonText="Next"
        secondButtonHref="/application/part-2"
        autosaveTime="4:20pm"
      />
    </>
  )
}
