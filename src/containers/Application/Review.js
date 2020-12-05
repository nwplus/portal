import React from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

export default () => {
  const { lastUpdated } = useHackerApplication()
  const [, setLocation] = useLocation()
  // https://github.com/nwplus/livesite/pull/190/files
  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
  }

  return (
    <>
      {/* Progress bar should increase with each filled input */}
      <VerticalProgressBar percent={100} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/review')}
        secondButtonText="Submit"
        secondButtonOnClick={() => handleNavigation('/application/confirmation')}
        autosaveTime={lastUpdated}
      />
    </>
  )
}
