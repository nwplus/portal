import React, { useState } from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import ReviewCards from '../../components/ApplicationForm/ReviewCards'
import { APPLICATION_STATUS } from '../../utility/Constants'
import { validateFormSection, checkForError, validateEntireForm } from '../../utility/Validation'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const validate = change => {
    const newErrors = validateFormSection(change, 'termsAndConditions')
    setErrors({ ...errors, ...newErrors })
    return { ...errors, ...newErrors }
  }

  const save = async () => {
    setLoading(true)
    await forceSave()
    setLoading(false)
  }

  const handleEdit = href => {
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleNavigation = async href => {
    await save()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    const allErrors = validateEntireForm(application)
    if (checkForError(allErrors)) {
      window.alert('Please agree to the required terms and conditions.')
      return
    }
    if (application.status.applicationStatus === APPLICATION_STATUS.inProgress) {
      updateApplication({
        status: {
          applicationStatus: APPLICATION_STATUS.applied,
        },
      })
    }
    await save()
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
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
        loading={loading}
      />
    </>
  )
}
