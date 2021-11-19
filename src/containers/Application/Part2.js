import React, { useRef, useState } from 'react'
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

const questionsByOrder = ['resume', 'longAnswers']

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = change => {
    const newErrors = validateFormSection(change, 'skills')
    setErrors({ ...errors, ...newErrors })
    return { ...errors, ...newErrors }
  }

  const save = async () => {
    setLoading(true)
    await forceSave()
    setLoading(false)
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
    setLoading(true)
    await uploadResumeToStorage(application._id, resume)
    setLoading(false)
    updateSkillsInfo({
      resume: resume.name,
    })
  }

  const handleNavigation = async href => {
    await save()
    if (href === '/application/part-3') {
      const newErrors = validate(application.skills)
      if (checkForError(newErrors)) {
        for (let question of questionsByOrder) {
          if (newErrors[question]) {
            refs[`${question}Ref`].current.focus()
            break
          }
        }
        return
      }
    }
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const refs = {
    resumeRef: useRef(null),
    longAnswersRef: useRef(null),
  }

  return (
    <>
      <Skills
        refs={refs}
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
        loading={loading}
      />
    </>
  )
}
