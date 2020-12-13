import React from 'react'
import { useLocation } from 'wouter'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useAuth } from '../../utility/Auth'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const { logout } = useAuth()

  const updateBasicInfo = change => {
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
    await forceSave()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  const handleLogout = async () => {
    await forceSave()
    logout()
  }
  return (
    <>
      <BasicInfo formInputs={application.basicInfo} onChange={updateBasicInfo} />
      <VerticalProgressBar percent={25} />
      <NavigationButtons
        firstButtonText="Save &amp; Logout"
        firstButtonOnClick={() => handleLogout('/login')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-2')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
      />
    </>
  )
}
