import React, { useRef, useState } from 'react'
import { useLocation } from 'wouter'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import { checkForError, validateFormSection } from '../../utility/Validation'

const questionsByOrder = [
  'firstName',
  'lastName',
  'preferredName',
  'ageByHackathon',
  'phoneNumber',
  'school',
  'major',
  'educationLevel',
  'graduation',
  'academicYear',
  'countryOfResidence',
  'dietaryRestriction',
  'willBeAgeOfMajority',
  // 'identifyAsUnderrepresented',
  'pronouns',
  'gender',
  'ethnicity',
  'isAuthorizedToWorkInCanada',
]

export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
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

  const refs = {
    firstNameRef: useRef(null),
    lastNameRef: useRef(null),
    preferredNameRef: useRef(null),
    genderRef: useRef(null),
    pronounsRef: useRef(null),
    dietaryRestrictionRef: useRef(null),
    // identifyAsUnderrepresentedRef: useRef(null),
    ageByHackathonRef: useRef(null),
    phoneNumberRef: useRef(null),
    schoolRef: useRef(null),
    majorRef: useRef(null),
    educationLevelRef: useRef(null),
    graduationRef: useRef(null),
    academicYearRef: useRef(null),
    ethnicityRef: useRef(null),
    willBeAgeOfMajorityRef: useRef(null),
    hackathonsAttendedRef: useRef(null),
    contributionRoleRef: useRef(null),
    countryOfResidenceRef: useRef(null),
    locationRef: useRef(null),
    isAuthorizedToWorkInCanadaRef: useRef(null),
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
          if (newErrors[question]) {
            // redirects the user to the question
            refs[`${question}Ref`].current.focus()
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
        autosaveTime={application.submission.lastUpdated.toDate().toString()}
        loading={loading}
      />
    </>
  )
}
