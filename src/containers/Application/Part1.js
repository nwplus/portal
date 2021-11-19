import React, { useState } from 'react'
import { useLocation } from 'wouter'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useAuth } from '../../utility/Auth'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { checkForError, validateFormSection } from '../../utility/Validation'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const { logout } = useAuth()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = change => {
    const newErrors = validateFormSection(change, 'basicInfo')
    setErrors({ ...errors, ...newErrors })
    return { ...errors, ...newErrors }
  }
  const save = async () => {
    setLoading(true)
    await forceSave()
    setLoading(false)
  }
  const updateBasicInfo = change => {
    validate(change)
    updateApplication({
      basicInfo: {
        ...change,
      },
    })
  }
  /**
   * Saves and moves to next page
   */
  const handleNavigation = async href => {
    await save()
    if (href === '/application/part-2') {
      const newErrors = validate(application.basicInfo)
      if (checkForError(newErrors)) {
        window.alert('Please complete all required fields.')
        return
      }
    }
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleLogout = async () => {
    await save()
    logout()
  }
  return (
    <>
      <BasicInfo errors={errors} formInputs={application.basicInfo} onChange={updateBasicInfo} />
      <VerticalProgressBar percent={25} />
      <NavigationButtons
        firstButtonText="Save &amp; Logout"
        firstButtonOnClick={() => handleLogout('/login')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-2')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
        loading={loading}
      />
    </>
  )
}
