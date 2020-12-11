import React from 'react'
import { useLocation } from 'wouter'
import Questionnaire from '../../components/ApplicationForm/Questionnaire'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

// form part 3
export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()

  const updateQuestionnaire = change => {
    updateApplication({
      questionnaire: {
        ...change,
      },
    })
  }

  const handleNavigation = async href => {
    await forceSave()
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Questionnaire formInputs={application.questionnaire} onChange={updateQuestionnaire} />
      <VerticalProgressBar percent={75} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-2')}
        secondButtonText="Review Your Application"
        secondButtonOnClick={() => handleNavigation('/application/review')}
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
      />
    </>
  )
}
