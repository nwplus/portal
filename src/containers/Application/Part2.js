import React, { useRef, useState } from 'react'
import { useLocation } from 'wouter'
import Skills from '../../components/ApplicationForm/Skills'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { uploadResumeToStorage, useHackerApplication } from '../../utility/HackerApplicationContext'
import {
  MAX_RESUME_FILE_SIZE_MB,
  checkForError,
  validateFormSection,
} from '../../utility/Validation'

const questionsByOrder = [
  'resume',
  'portfolio',
  'github',
  'longAnswers1',
  'longAnswers2',
  'longAnswers3',
  'longAnswers4',
  'longAnswers5',
]

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
    numHackathonsAttendedRef: useRef(null),
    contributionRoleRef: useRef(null),
    resumeRef: useRef(null),
    githubRef: useRef(null),
    portfolioRef: useRef(null),
    longAnswers1Ref: useRef(null),
    longAnswers2Ref: useRef(null),
    longAnswers3Ref: useRef(null),
    longAnswers4Ref: useRef(null),
    longAnswers5Ref: useRef(null),
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
      <VerticalProgressBar percent={75} />
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
