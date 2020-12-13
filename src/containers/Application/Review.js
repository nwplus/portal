import React from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useLocation } from 'wouter'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import ReviewCards from '../../components/ApplicationForm/ReviewCards'
import { ApplicationStatus } from '../../utility/Constants'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()

  const handleEdit = href => {
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleNavigation = async href => {
    await forceSave()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async href => {
    updateApplication({
      status: {
        applicationStatus: ApplicationStatus.applied,
      },
    })
    await forceSave()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const updateTermsAndConditions = change => {
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
      />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-3')}
        secondButtonText="Submit"
        secondButtonOnClick={() => handleSubmit('/application/confirmation')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
      />
    </>
  )
}
