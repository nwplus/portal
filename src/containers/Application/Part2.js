import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

export default () => {
  const { application } = useHackerApplication()
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
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Skills
        formInputs={states}
        onChange={setStates}
        role={application.basicInfo.contributionRole}
      />
      <VerticalProgressBar percent={50} />
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
