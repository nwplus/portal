import React, { useState } from 'react'
import { useLocation } from 'wouter'
import HackathonInfo from '../../components/ApplicationForm/HackathonInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

const Part0 = () => {
  const { application, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
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
      <HackathonInfo />
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

export default Part0
