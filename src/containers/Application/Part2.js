import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication, uploadResumeToStorage } from '../../utility/HackerApplicationContext'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const updateSkillsInfo = change => {
    updateApplication({
      skills: {
        ...change,
      },
    })
  }
  let file

  // TODO
  // add the resume var in this file, pass down to skills
  // once a force save happens, the file should also be uploaded
  // not sure how to address the async in Skills to be passed upwards

  const handleNavigation = async href => {
    await forceSave()
    await uploadResumeToStorage(application._id)
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Skills
        formInputs={application.skills}
        onChange={updateSkillsInfo}
        role={application.basicInfo.contributionRole}
        resume={file}
      />
      <VerticalProgressBar percent={50} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-1')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-3')}
        autosaveTime="4:20am" // TODO: replace with application.submission.lastUpdated.toDate().toString()
      />
    </>
  )
}
