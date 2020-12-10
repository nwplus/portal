import React, { useState } from 'react'
import Questionnaire from '../../components/ApplicationForm/Questionnaire'

// form part 3
export default () => {
  // eslint-disable-next-line no-unused-vars
  const [states, setStates] = useState({
    engagementSource: '',
    eventsAttended: {
      option1: false, // LHD / Hack Camp
      option2: false, // nwHacks
      option3: false, // cmd-f
      option4: false, // cmd-f Phases
      option5: false, // nwPlus Workshop Series
      option6: false, // nwPlus Boothing
    },
    otherEngagementSource: '',
  })

  const [, setLocation] = useLocation()
  // https://github.com/nwplus/livesite/pull/190/files
  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Questionnaire />
      <VerticalProgressBar percent={75} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-2')}
        secondButtonText="Review Your Application"
        secondButtonOnClick={() => handleNavigation('/application/review')}
        autosaveTime="4:20am" // TODO: replace with application.submission.lastUpdated.toDate().toString()
      />
    </>
  )
}
