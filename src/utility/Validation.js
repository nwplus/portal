const EMAIL_MESSAGE = 'Please include a valid email.'
const NOT_EMPTY = 'Please include this field.'
const NOT_NONE = 'Please select at least one that applies.'
const PHONE_MESSAGE =
  'Please include a valid phone number including country code, eg. +1 123-456-7890'
const OPTIONAL_URL = 'If you would like to include an optional URL here, please ensure it is valid.'
const INVALID_FILE_MESSAGE = 'Please upload a valid PDF file (max 2MB).'
const MUST_BE_TRUE = 'You must agree to the MLH code of conduct and privacy policy.'
const LONG_ANSWER_CHAR_LIMIT = 650
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
  return (typeof thing === 'string' || typeof thing === 'number') && thing !== ''
}
const validateEmail = thing => {
  return validateStringNotEmpty(thing) && thing.includes('@')
}
const validatePhoneNumber = thing => {
  // const phoneno = /^(?=.*(?:(?:\d[ -]?){1,12}))\d(?:[0-9 -]*\d)?$/
  const phoneno = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/
  return thing.match(phoneno)
}
const validateNotAllFalse = thing => {
  const thingValues = Object.values(thing)
  return !thingValues.reduce((sum, next) => sum || next.status, false)
}
const validateResume = thing => {
  const allowedExtensions = /(\.docx|\.doc|\.txt|\.pdf)$/i
  return allowedExtensions.exec(thing)
}

const noEmptyFunction = thing => {
  return {
    error: !validateStringNotEmpty(thing),
    message: NOT_EMPTY,
  }
}

const noNoneFunction = thing => {
  return {
    error: !validateNotAllFalse(thing),
    message: NOT_NONE,
  }
}

const noNeitherFunction = thing => {
  return {
    error: !validateNotNull(thing),
    message: NOT_EMPTY,
  }
}

const validateTrueFunction = thing => {
  return {
    error: !thing,
    message: MUST_BE_TRUE,
  }
}

const optionalURLFunction = thing => {
  return {
    error: thing ? !validateURL(thing) : false,
    message: OPTIONAL_URL,
  }
}

const noInvalidResumeFunction = thing => {
  return {
    error: !validateResume(thing),
    message: INVALID_FILE_MESSAGE,
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
    gender: noEmptyFunction,
    ethnicity: noNoneFunction,
    location: noEmptyFunction,
    isOfLegalAge: noNeitherFunction,
    school: noEmptyFunction,
    major: noEmptyFunction,
    educationLevel: noEmptyFunction,
    graduation: noEmptyFunction,
    hackathonsAttended: noEmptyFunction,
    contributionRole: noNeitherFunction,
    phoneNumber: number => {
      return {
        error: !validatePhoneNumber(number),
        message: PHONE_MESSAGE,
      }
    },
  },
  skills: {
    resume: noInvalidResumeFunction,
    portfolio: optionalURLFunction,
    linkedin: optionalURLFunction,
    github: optionalURLFunction,
    longAnswers: answer => {
      return {
        error: !validateStringNotEmpty(answer) && answer.length > LONG_ANSWER_CHAR_LIMIT,
        message: NOT_EMPTY,
      }
    },
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
