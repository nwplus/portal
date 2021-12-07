const MUST_BE_VACCINATED =
  'You can only participate in nwHacks if you are double-vaccinated by then!'
const EMAIL_MESSAGE = 'Please include a valid email.'
const NOT_EMPTY = 'Please include this field.'
const NOT_NONE = 'Please select at least one that applies.'
const PHONE_MESSAGE =
  'Please use only numerals and/or hyphens in your phone number, eg. 1234567890 or 123-456-7890'
export const MANDATORY_URL = 'Please include a valid URL.'
const OPTIONAL_URL = 'If you would like to include a URL here, please ensure it is valid.'
const INVALID_FILE_MESSAGE = 'Please upload a valid PDF file (max 2MB).'
const MUST_BE_TRUE = 'You must agree to the required term/condition.'
export const MAX_RESUME_FILE_SIZE_MB = 2
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
  const phoneno = /^([0-9]+-)*[0-9]+$/
  return thing.match(phoneno)
}
const validateNotAllFalse = thing => {
  const thingValues = Object.values(thing)
  return thingValues.reduce((sum, next) => sum || next, false)
}
const validateResume = thing => {
  const allowedExtensions = /(\.pdf)$/i
  return allowedExtensions.exec(thing)
}

const mustBeVaccinatedFunction = thing => {
  return {
    error: !thing,
    message: MUST_BE_VACCINATED,
  }
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

const mandatoryURLFunction = thing => {
  return {
    error: validateStringNotEmpty(thing) ? !validateURL(thing) : false,
    message: MANDATORY_URL,
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

var isDesigner = false
var isFirstTimeHacker = true

export const validateEntireForm = application => {
  const vaccineInfoErrors = validateFormSection(application.vaccineInfo, 'vaccineInfo')
  const basicInfoErrors = validateFormSection(application.basicInfo, 'basicInfo')
  const skillsErrors = validateFormSection(application.skills, 'skills')
  const questionnaireErrors = validateFormSection(application.questionnaire, 'questionnaire')
  const termsAndConditionsErrors = validateFormSection(
    application.termsAndConditions,
    'termsAndConditions'
  )

  // only for use when validating entire form at the end
  isDesigner = application.basicInfo.contributionRole === 'designer'
  isFirstTimeHacker = application.skills.hackathonsAttended === 0
  return {
    ...vaccineInfoErrors,
    ...basicInfoErrors,
    ...skillsErrors,
    ...questionnaireErrors,
    ...termsAndConditionsErrors,
  }
}

const validators = {
  vaccineInfo: {
    willBeDoubleVaxed: mustBeVaccinatedFunction,
  },
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
    isOfLegalAge: noNeitherFunction,
    school: noEmptyFunction,
    major: noEmptyFunction,
    educationLevel: noEmptyFunction,
    otherEducationLevel: noEmptyFunction,
    graduation: noEmptyFunction,
    contributionRole: noEmptyFunction,
    phoneNumber: number => {
      return {
        error: !validatePhoneNumber(number),
        message: PHONE_MESSAGE,
      }
    },
  },
  skills: {
    resume: noInvalidResumeFunction,
    // NOTE: isDesigner (and isFirstTimeHacker) variables aren't accessible here when invoking `validateFormSection`:  ternary default to false -- WORKAROUND: local handling in Part2.js
    portfolio: isFirstTimeHacker
      ? optionalURLFunction
      : isDesigner
      ? mandatoryURLFunction
      : optionalURLFunction,
    github: isFirstTimeHacker
      ? optionalURLFunction
      : isDesigner
      ? optionalURLFunction
      : mandatoryURLFunction,
    linkedin: optionalURLFunction,
    hackathonsAttended: noEmptyFunction,
    longAnswers1: answer => {
      return {
        error: !validateStringNotEmpty(answer) || answer.length > LONG_ANSWER_CHAR_LIMIT,
        message: answer.length > LONG_ANSWER_CHAR_LIMIT ? '' : NOT_EMPTY,
      }
    },
    longAnswers2: answer => {
      return {
        error: !validateStringNotEmpty(answer) || answer.length > LONG_ANSWER_CHAR_LIMIT,
        message: answer.length > LONG_ANSWER_CHAR_LIMIT ? '' : NOT_EMPTY,
      }
    },
  },
  questionnaire: {
    // no validations, I think they're all optional
  },
  termsAndConditions: {
    MLHCodeOfConduct: validateTrueFunction,
    MLHPrivacyPolicy: validateTrueFunction,
    shareWithnwPlus: validateTrueFunction,
  },
}
