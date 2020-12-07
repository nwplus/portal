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

  return <Questionnaire formInputs={states} onChange={setStates} />
}
