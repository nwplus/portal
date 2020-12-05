import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'

export default () => {
  const [, setLocation] = useLocation()
  const [states, setStates] = useState({
    resume: null,
    github: '',
    linkedin: '',
    portfolio: '',
    longAnswer: '',
  })

  // https://github.com/nwplus/livesite/pull/190/files
  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
  }

  return (
    <>
      <Skills formInputs={states} onChange={setStates} />
      {/* Progress bar should be capped at 50% and should increase with each filled input */}
      <VerticalProgressBar percent={25} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-1')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-3')}
        autosaveTime="4:20am" // TODO: replace with time from application.submission.lastUpdated
      />
    </>
  )
}
