import React, { useState } from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import ReviewCards from '../../components/ApplicationForm/ReviewCards'
import { APPLICATION_STATUS, copyText } from '../../utility/Constants'
import { validateFormSection, checkForError, validateEntireForm } from '../../utility/Validation'
import { useHackathon } from '../../utility/HackathonProvider'

const Review = () => {
  const { activeHackathon } = useHackathon()
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { basicInfoQuestions, skillsQuestions, questionnaireQuestions } = useHackerApplication()
  const validate = change => {
    const newErrors = validateFormSection(change, 'termsAndConditions', [])
    setErrors({ ...errors, ...newErrors })
    return { ...errors, ...newErrors }
  }

  const save = async () => {
    setLoading(true)
    await forceSave()
    setLoading(false)
  }

  const handleEdit = async href => {
    await save()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleNavigation = async href => {
    await save()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const allErrors = await validateEntireForm(
      application,
      basicInfoQuestions,
      skillsQuestions,
      questionnaireQuestions
    )
    if (checkForError(allErrors)) {
      window.alert('Please agree to the required terms and conditions.')
      setIsSubmitting(false)
      return
    }
    const status = application.status.applicationStatus
    if (status === APPLICATION_STATUS.inProgress || status === APPLICATION_STATUS.scored) {
      updateApplication({
        status: {
          applicationStatus: APPLICATION_STATUS.applied,
        },
      })
    }
    await save()

    try {
      const currentTime = new Date()

      const pstTime =
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'America/Los_Angeles',
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(currentTime) + ' PST'

      await fetch('https://us-central1-nwplus-ubc.cloudfunctions.net/sendConfirmationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: application.basicInfo.email,
          timestamp: pstTime,
          hackathonName: copyText[activeHackathon].hackathonName,
        }),
      })
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      })
    } finally {
      setIsSubmitting(false)
    }

    setLocation('/application/confirmation')
    window.scrollTo(0, 0)
  }

  const updateTermsAndConditions = change => {
    validate(change)
    updateApplication({
      termsAndConditions: {
        ...change,
      },
    })
  }

  return (
    <>
      <VerticalProgressBar percent={100} />
      <ReviewCards
        formInputs={application}
        handleEdit={handleEdit}
        onChange={updateTermsAndConditions}
        errors={errors}
      />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-3')}
        secondButtonText="Submit"
        secondButtonOnClick={() => handleSubmit()}
        autosaveTime={application.submission.lastUpdated.toDate().toLocaleString()}
        loading={loading || isSubmitting}
        showSubmitWarning
      />
    </>
  )
}

export default Review
