import React, { useEffect, useRef, useState } from 'react'
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
import { getQuestionsByOrder } from '../../utility/utilities'

const Part2 = () => {
  const { application, updateApplication, forceSave, skillsQuestions } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [questionsByOrder, setQuestionsByOrder] = useState([])

  useEffect(() => {
    const fetchQuestionsByOrder = () => {
      const questions = getQuestionsByOrder(skillsQuestions)
      setQuestionsByOrder(questions)
    }
    fetchQuestionsByOrder()
  }, [skillsQuestions])

  const validate = change => {
    const newErrors = validateFormSection(change, 'skills', questionsByOrder)
    setErrors(newErrors)
    return newErrors
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
          if (newErrors[question[0]]) {
            refs[`${question[0]}Ref`].current.focus()
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
        autosaveTime={application.submission.lastUpdated?.toDate().toLocaleString() || ''}
        loading={loading}
      />
    </>
  )
}

export default Part2
