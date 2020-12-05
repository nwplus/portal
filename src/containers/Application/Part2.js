import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
// form part 2

export default () => {
  const [states, setStates] = useState({
    resume: null,
    github: '',
    linkedin: '',
    portfolio: '',
    longAnswer: '',
  })

  return (
    <>
      <Skills formInputs={states} onChange={setStates} />
      {/* Progress bar should be capped at 50% and should increase with each filled input */}
      <VerticalProgressBar percent={25} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonHref="/application/part-1"
        secondButtonText="Next"
        secondButtonHref="/application/part-3"
        autosaveTime="4:20pm"
      />
    </>
  )
}
