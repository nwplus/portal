import React from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'

export default () => {
  const [, setLocation] = useLocation()
  // https://github.com/nwplus/livesite/pull/190/files
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
    </>
  )
}
