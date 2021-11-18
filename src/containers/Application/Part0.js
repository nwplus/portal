import React, { useState } from 'react'
import { useLocation } from 'wouter'
import VaccineInfo from '../../components/ApplicationForm/VaccineInfo'
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

  const updateVaccineInfo = change => {
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
    if (href === '/application/part-1') {
      const newErrors = validate(application.basicInfo)
      if (checkForError(newErrors)) {
        window.alert('You can only participate in nwHacks if you are double-vaccinated by then!')
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
      <VaccineInfo
        errors={errors}
        formInputs={application.basicInfo}
        onChange={updateVaccineInfo}
      />
      <VerticalProgressBar percent={25} />
      <NavigationButtons
        firstButtonText="Save &amp; Logout"
        firstButtonOnClick={() => handleLogout('/login')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-1')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
        loading={loading}
      />
    </>
  )
}

//[TODO] depending on the selection the next might take user to a warning banner page
