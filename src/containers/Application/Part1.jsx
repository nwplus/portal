import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { checkForError, validateFormSection } from '../../utility/Validation'
import { useHackathon } from '../../utility/HackathonProvider'
import { getHackerAppQuestions } from '../../utility/firebase'

// const questionsByOrder = [
//   // 'legalFirstName',
//   // 'legalLastName',
//   // 'preferredName',
//   // 'ageByHackathon',
//   // 'phoneNumber',
//   // 'school',
//   // 'educationLevel',
//   // 'graduation',
//   // 'academicYear',
//   // 'countryOfResidence',
//   // 'dietaryRestriction',
//   // 'willBeAgeOfMajority',
//   // 'identifyAsUnderrepresented',
//   // 'pronouns',
//   // 'gender',
//   // 'haveTransExperience',
//   // 'major',
//   // 'race',
//   // 'indigenousIdentification',
//   // 'culturalBackground',
//   // 'isAuthorizedToWorkInCanada',
//   // 'canadianStatus',
//   // 'disability',
// ]

const Part1 = () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [questionsByOrder, setQuestionsByOrder] = useState([])
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const appQuestions = await getHackerAppQuestions(dbHackathonName, 'BasicInfo')
        const selectedFormInputs = appQuestions.flatMap(q => {
          if (q.type === 'Country') {
            return [['countryOfResidence', q.required]]
          }
          if (q.type === 'Major') {
            return [['major', q.required]]
          }
          if (q.type === 'School') {
            return [['school', q.required]]
          }
          if (q.type === 'Full Legal Name') {
            return [
              ['legalFirstName', q.required],
              ['legalMiddleName', false],
              ['legalLastName', q.required],
            ]
          }
          return [[q.formInput, q.required]]
        })
        setQuestionsByOrder(selectedFormInputs)
      } catch (error) {
        console.error('Failed to fetch questions:', error)
      }
    }

    fetchQuestions()
  }, [dbHackathonName])

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
