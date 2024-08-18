import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { checkForError, validateFormSection } from '../../utility/Validation'
import { getQuestionsByOrder } from '../../utility/utilities'

const Part1 = () => {
  const { application, updateApplication, forceSave, basicInfoQuestions } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [questionsByOrder, setQuestionsByOrder] = useState([])

  useEffect(() => {
    const fetchQuestionsByOrder = async () => {
      const questions = await getQuestionsByOrder(basicInfoQuestions)
      setQuestionsByOrder(questions)
    }
    fetchQuestionsByOrder()
  }, [basicInfoQuestions])

  const validate = change => {
    const newErrors = validateFormSection(change, 'basicInfo', questionsByOrder)
    setErrors(newErrors)
    return newErrors
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

  const refs = {
    legalFirstNameRef: useRef(null),
    legalLastNameRef: useRef(null),
    preferredNameRef: useRef(null),
    genderRef: useRef(null),
    pronounsRef: useRef(null),
    dietaryRestrictionRef: useRef(null),
    identifyAsUnderrepresentedRef: useRef(null),
    indigenousIdentificationRef: useRef(null),
    ageByHackathonRef: useRef(null),
    phoneNumberRef: useRef(null),
    schoolRef: useRef(null),
    majorRef: useRef(null),
    educationLevelRef: useRef(null),
    graduationRef: useRef(null),
    academicYearRef: useRef(null),
    raceRef: useRef(null),
    // willBeAgeOfMajorityRef: useRef(null),
    haveTransExperienceRef: useRef(null),
    hackathonsAttendedRef: useRef(null),
    contributionRoleRef: useRef(null),
    countryOfResidenceRef: useRef(null),
    locationRef: useRef(null),
    culturalBackgroundRef: useRef(null),
    // isAuthorizedToWorkInCanadaRef: useRef(null),
    canadianStatusRef: useRef(null),
    disabilityRef: useRef(null),
  }

  /**
   * Saves and moves to next page
   */
  const handleNavigation = async href => {
    await save()
    if (href === '/application/part-2') {
      // question is false if it is filled out
      const newErrors = validate(application.basicInfo)
      if (checkForError(newErrors)) {
        for (let question of questionsByOrder) {
          if (newErrors[question[0]]) {
            // redirects the user to the question
            refs[`${question[0]}Ref`].current.focus()
            break
          }
        }
        return
      }
    }
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <BasicInfo
        refs={refs}
        errors={errors}
        formInputs={application.basicInfo}
        onChange={updateBasicInfo}
      />
      <VerticalProgressBar percent={50} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonOnClick={() => handleNavigation('/application/part-0')}
        secondButtonText="Next"
        secondButtonOnClick={() => handleNavigation('/application/part-2')}
        autosaveTime={application.submission.lastUpdated?.toDate().toString() || ''}
        loading={loading}
      />
    </>
  )
}

export default Part1
