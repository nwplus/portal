import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication, uploadResumeToStorage } from '../../utility/HackerApplicationContext'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [resume, setResume] = useState()
  const [, setLocation] = useLocation()
  const updateSkillsInfo = change => {
    updateApplication({
      skills: {
        ...change,
      },
    })
  }

  const handleResume = resume => {
    setResume(resume)
  }

  const handleNavigation = async href => {
    await forceSave()
    await uploadResumeToStorage(application._id, resume)
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Skills
        formInputs={application.skills}
        onChange={updateSkillsInfo}
        role={application.basicInfo.contributionRole}
        handleResume={handleResume}
      />
      <VerticalProgressBar percent={50} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-1')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-3')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
      />
    </>
  )
}
