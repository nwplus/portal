import { copyText } from './Constants'

const MUST_BE_VACCINATED = `You can only participate in ${copyText.hackathonName} if you are double-vaccinated by then!`
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
export const MAX_WAIVER_FILE_SIZE_MB = 3
const LONG_ANSWER_WORD_LIMIT = 200
export const validateURL = thing => {
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

export const validateDevpostURL = thing => {
  return validateURL(thing) && thing.includes('devpost.com')
}

export const validateYoutubeURL = thing => {
  return validateURL(thing) && (thing.includes('youtube.com') || thing.includes('youtu.be'))
}

const validateNotNull = thing => {
  return thing !== null
}
const validateStringNotEmpty = thing => {
  return (typeof thing === 'string' || typeof thing === 'number') && thing !== ''
}
export const validateEmail = thing => {
  return validateStringNotEmpty(thing) && thing.includes('@')
}
// const validateOptionalEmail = email => {
//   return {
//     error: email ? !validateEmail(email) : false,
//     message: EMAIL_MESSAGE,
//   }
// }
const validatePhoneNumber = thing => {
  const phoneno = /^([0-9]+-)*[0-9]+$/
  return thing.match(phoneno)
}
export const validateDiscord = thing => {
  const pattern = new RegExp('^.{2,32}#[0-9]{4}$')
  return !!pattern.test(thing)
}
const validateNotAllFalse = thing => {
  const thingValues = Object.values(thing)
  return thingValues.reduce((sum, next) => sum || next, false)
}
const validateResume = thing => {
  const allowedExtensions = /(\.pdf)$/i
  return allowedExtensions.exec(thing)
}

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
const noInvalidResumeFunction = thing => {
  return {
    error: !validateResume(thing),
    message: INVALID_FILE_MESSAGE,
  }
}

const getWords = value => {
  const split = value?.split(' ')
  if (split.length === 1) {
    if (split[0] === '') {
      return 0
    } else {
      return 1
    }
  }
  const cleanedSplit = []
  for (let i = 0; i < split.length; i++) {
    if (split[i] !== '') cleanedSplit.push(split[i])
  }
  return cleanedSplit.length || 0
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
  // const vaccineInfoErrors = validateFormSection(application.vaccineInfo, 'vaccineInfo')
  const basicInfoErrors = validateFormSection(application.basicInfo, 'basicInfo')
  const skillsErrors = validateFormSection(application.skills, 'skills')
  const questionnaireErrors = validateFormSection(application.questionnaire, 'questionnaire')
  const termsAndConditionsErrors = validateFormSection(
    application.termsAndConditions,
    'termsAndConditions'
  )

  return {
    // ...vaccineInfoErrors,
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
    preferredName: noEmptyFunction,
    gender: noEmptyFunction,
    identifyAsUnderrepresented: noEmptyFunction,
    pronouns: noNoneFunction,
    dietaryRestriction: noNoneFunction,
    ageByHackathon: noEmptyFunction,
    school: noEmptyFunction,
    major: noEmptyFunction,
    educationLevel: noEmptyFunction,
    countryOfResidence: noEmptyFunction,
    phoneNumber: number => {
      return {
        error: !validatePhoneNumber(number),
        message: PHONE_MESSAGE,
      }
    },
  },
  skills: {
    contributionRole: noNoneFunction,
    resume: noEmptyFunction,
    portfolio: optionalURLFunction,
    github: optionalURLFunction,
    linkedin: optionalURLFunction,
    firstTimeHacker: noNeitherFunction,
    longAnswers1: answer => {
      return {
        error: !validateStringNotEmpty(answer) || getWords(answer) > LONG_ANSWER_WORD_LIMIT,
        message: answer.length > LONG_ANSWER_WORD_LIMIT ? '' : NOT_EMPTY,
      }
    },
    longAnswers2: answer => {
      return {
        error: !validateStringNotEmpty(answer) || getWords(answer) > LONG_ANSWER_WORD_LIMIT,
        message: answer.length > LONG_ANSWER_WORD_LIMIT ? '' : NOT_EMPTY,
      }
    },
  },
  questionnaire: {
    engagementSource: noEmptyFunction,
    eventsAttended: noNoneFunction,
  },
  termsAndConditions: {
    MLHCodeOfConduct: validateTrueFunction,
    MLHPrivacyPolicy: validateTrueFunction,
    // MLHEmailSubscription: validateTrueFunction,
    shareWithnwPlus: validateTrueFunction,
  },
}
