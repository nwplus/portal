import React, { useState } from 'react'
import { useLocation } from 'wouter'
import Questionnaire from '../../components/ApplicationForm/Questionnaire'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { checkForError, validateFormSection } from '../../utility/Validation'

// form part 3
const Part3 = () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = change => {
    const newErrors = validateFormSection(change, 'questionnaire', [])
    setErrors({ ...errors, ...newErrors })
    return { ...errors, ...newErrors }
  }

  const save = async () => {
    setLoading(true)
    await forceSave()
    setLoading(false)
  }

  const updateQuestionnaire = change => {
    validate(change)
    updateApplication({
      questionnaire: {
        ...change,
      },
    })
  }

  const handleNavigation = async href => {
    await save()
    if (href === '/application/review') {
      const newErrors = validate(application.questionnaire)
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
      <Questionnaire
        errors={errors}
        formInputs={application.questionnaire}
        onChange={updateQuestionnaire}
      />
      <VerticalProgressBar percent={100} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-2')}
        secondButtonText="Review Your Submission"
        secondButtonOnClick={() => handleNavigation('/application/review')}
        autosaveTime={application.submission.lastUpdated?.toDate().toString() || ''}
        loading={loading}
      />
    </>
  )
}

export default Part3
