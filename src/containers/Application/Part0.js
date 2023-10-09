import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import HackathonInfo from '../../components/ApplicationForm/HackathonInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { checkForError, validateFormSection } from '../../utility/Validation'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    await forceSave()
    setLoading(false)
  }

  /**
   * Saves and moves to next page
   */
  const handleNavigation = async href => {
    await save()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <HackathonInfo error={errors} />
      <VerticalProgressBar percent={25} />
      <NavigationButtons
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-1')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
        loading={loading}
      />
    </>
  )
}
