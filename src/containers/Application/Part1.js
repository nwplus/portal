import React, { useState } from 'react'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'

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
    </>
  )
}
