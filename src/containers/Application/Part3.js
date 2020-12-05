import React from 'react'
import Questionnaire from '../../components/ApplicationForm/Questionnaire'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'

export default () => {
  const [, setLocation] = useLocation()
  // https://github.com/nwplus/livesite/pull/190/files
  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
  }
  return (
    <>
      <Questionnaire />
      {/* Progress bar should be capped at 75% and should increase with each filled input */}
      <VerticalProgressBar percent={50} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-2')}
        secondButtonText="Review Your Application"
        secondButtonOnClick={() => handleNavigation('/application/review')}
        autosaveTime="4:20am" // TODO: replace with time from application.submission.lastUpdated
      />
    </>
  )
}
