const EMAIL_MESSAGE = 'Please include a valid email.'
const NOT_EMPTY = 'Please include this field.'
const PHONE_MESSAGE = 'Please include a valid phone number.'
const URL = 'Please include a valid URL.'
const MUST_BE_TRUE = 'You must agree to the MLH code of conduct and privacy policy.'
const validateURL = thing => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return typeof thing === 'string' && !!pattern.test(thing)
}

const validateNotNull = thing => {
  return thing !== null
}
const validateStringNotEmpty = thing => {
  return typeof thing === 'string' && thing !== ''
}
const validateEmail = thing => {
  return validateStringNotEmpty(thing) && thing.includes('@')
}
const validatePhoneNumber = thing => {
  const phoneno = /^(?=.*(?:(?:\d[ -]?){1,12}))\d(?:[0-9 -]*\d)?$/
  return thing.match(phoneno)
}

const noEmptyFunction = thing => {
  return {
    error: !validateStringNotEmpty(thing),
    message: NOT_EMPTY,
  }
}

const validateTrueFunction = thing => {
  return {
    error: !thing,
    message: MUST_BE_TRUE,
  }
}

const properURLFunction = thing => {
  return {
    error: !validateURL(thing),
    message: URL,
  }
}

export const checkForError = errors => {
  if (!errors) return true
  return Object.values(errors).some(val => val !== false)
}

export const validateFormSection = (change, section) => {
  const newErrors = {}
  Object.entries(change).forEach(([key, value]) => {
    if (!validators[section][key]) return
    const { error: hasError, message: errorMessage } = validators[section][key](value)
    newErrors[key] = hasError ? errorMessage : false
  })
  return newErrors
}

export const validateEntireForm = application => {
  const basicInfoErrors = validateFormSection(application.basicInfo, 'basicInfo')
  const skillsErrors = validateFormSection(application.skills, 'skills')
  const questionnaireErrors = validateFormSection(application.questionnaire, 'questionnaire')
  const termsAndConditionsErrors = validateFormSection(
    application.termsAndConditions,
    'termsAndConditions'
  )
  return {
    ...basicInfoErrors,
    ...skillsErrors,
    ...questionnaireErrors,
    ...termsAndConditionsErrors,
  }
}

const validators = {
  basicInfo: {
    email: email => {
      return {
        error: !validateEmail(email),
        message: EMAIL_MESSAGE,
      }
    },
    firstName: noEmptyFunction,
    lastName: noEmptyFunction,
    location: noEmptyFunction,
    phoneNumber: name => {
      return {
        error: !validatePhoneNumber(name),
        message: PHONE_MESSAGE,
      }
    },
    // Currently these do not show errors on these fields.
    // NO ERRORS SHOWN FROM HERE
    gender: noEmptyFunction,
    school: noEmptyFunction,
    major: noEmptyFunction,
    educationLevel: noEmptyFunction,
    contributionRole: noEmptyFunction,
    graduation: validateNotNull,
    hackathonsAttended: validateNotNull,
    isOfLegalAge: thing => {
      return { error: !validateNotNull(thing), message: NOT_EMPTY }
    },
    // END OF NO ERRORS SHOWN
  },
  skills: {
    resume: '', //not sure how to validate this tbh
    portfolio: properURLFunction,
    linkedin: properURLFunction,
    github: properURLFunction,
    longAnswers: noEmptyFunction,
  },
  questionnaire: {
    // no validations, I think they're all optional
  },
  termsAndConditions: {
    // THESE FIELDS HAVE NO VALIDATION MESSAGE
    // when trying to submit, nothing will happen if they are not checked.
    MLHCodeOfConduct: validateTrueFunction,
    MLHPrivacyPolicy: validateTrueFunction,
  },
}
