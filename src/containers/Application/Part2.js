import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication, uploadResumeToStorage } from '../../utility/HackerApplicationContext'
import {
  checkForError,
  validateFormSection,
  MAX_RESUME_FILE_SIZE_MB,
} from '../../utility/Validation'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})

  const validate = change => {
    const newErrors = validateFormSection(change, 'skills')
    setErrors({ ...errors, ...newErrors })
    return { ...errors, ...newErrors }
  }

  const updateSkillsInfo = change => {
    validate(change)
    updateApplication({
      skills: {
        ...change,
      },
    })
  }

  const handleResume = async resume => {
    // check to make sure its a pdf
    const newErrors = validate({
      resume: resume.name,
    })
    // check to make sure its under 2mb
    const size = (resume.size / 1024 / 1024).toFixed(2)
    if (size > MAX_RESUME_FILE_SIZE_MB || newErrors.resume) return

    // upload the resume and update the application on success.
    await uploadResumeToStorage(application._id, resume)
    updateSkillsInfo({
      resume: resume.name,
    })
  }

  const handleNavigation = async href => {
    await forceSave()
    if (href === '/application/part-3') {
      const newErrors = validate(application.skills)
      if (checkForError(newErrors)) {
        window.alert('Please complete all required fields.')
        return
      }
    }
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
        errors={errors}
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
