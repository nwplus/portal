import React, { useState } from 'react'
import Questionnaire from '../../components/ApplicationForm/Questionnaire'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
// form part 3

export default () => {
  const [states, setStates] = useState({})
  return (
    <>
      <Questionnaire formInputs={states} onChange={setStates} />
      {/* Progress bar should be capped at 75% and should increase with each filled input */}
      <VerticalProgressBar percent={50} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonHref="/application/part-2"
        secondButtonText="Next"
        secondButtonHref="/application/review"
        autosaveTime="4:20pm"
      />
    </>
  )
}
