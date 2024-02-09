export const DB_COLLECTION = 'Hackathons'

// CHANGE: firebase collection name for this hackathon
export const DB_HACKATHON = 'cmd-f2024'
export const DAYOF_COLLECTION = 'DayOf'
export const FAQ_COLLECTION = 'FAQ'
export const NOTIFICATION_SETTINGS_CACHE_KEY = 'livesiteNotificationSettings'
export const IS_DEVICE_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
export const copyText = Object.freeze({
  // CHANGE: name of hackathon to be displayed on login splash
  hackathonName: 'cmd-f 2024',
  hackathonNameShort: 'cmd-f',
})

export const PROJECTS_TO_JUDGE_COUNT = 4
export const MAX_CHARACTERS_IN_DESCRIPTION = 100

export const NOTIFICATION_PERMISSIONS = Object.freeze({
  GRANTED: 'granted',
  DEFAULT: 'default',
  DENIED: 'denied',
})

export const WAIVER_LINKS = Object.freeze({
  COVID:
    'https://docs.google.com/document/d/1td2BgcwRT2CTYdUrzHji7onxpoVl8UjMiEuqIIUK7CM/edit?usp=sharing%5C',
  RELEASE_LIABILITY:
    'https://docs.google.com/document/d/1uqFssK4ScnbTysw0ppQKQYhZ6M-kja3R23xg8qNxf1E/edit?usp=sharing',
  MEDIA:
    'https://docs.google.com/document/d/1fMVtLTLnE-4awnXLl0YY6VAVvF_9xH0b250FGLbdOkI/edit?usp=sharing',
})

export const SOCIAL_LINKS = Object.freeze({
  FB: 'https://www.facebook.com/nwplusubc',
  IG: 'https://www.instagram.com/nwplusubc',
  MEDIUM: 'https://www.medium.com/nwplusubc',
  TW: 'https://www.twitter.com/nwplusubc',
  WEBSITE: 'https://www.nwplus.io',
})

export const REDIRECT_STATUS = Object.freeze({
  ApplicationNotSubmitted: 'ApplicationNotSubmitted',
  ApplicationSubmitted: 'ApplicationSubmitted',
  ApplicationAccepted: 'ApplicationAccepted',
  AttendingEvent: 'AttendingEvent',
})

export const APPLICATION_STATUS = Object.freeze({
  applied: 'applied',
  accepted: 'acceptedAndAttending',
  rejected: 'rejected',
  waitlisted: 'waitlisted',
  inProgress: 'inProgress',
  scored: 'scored',
})

export const JUDGING_RUBRIC = [
  // {
  //   id: 'execution',
  //   label: 'Execution',
  //   description:
  //     'How well does the project address the teams selected theme/focus? How much impact will this solution have?',
  //   value: 5,
  //   weight: 4 / 18,
  // },
  {
    id: 'innovation',
    label: 'Innovation',
    description:
      'Is the project a creative, original, and a suitable solution to the problem? Does the product introduce a new approach or perspective?',
    value: 5,
    // weight: 3 / 18,
    weight: 1 / 4,
  },
  {
    id: 'design',
    label: 'Design',
    description:
      'Is the design accessible (e.g. high contrast for good visibility, etc.) and aesthetically pleasing?',
    value: 5,
    // weight: 4 / 18,
    weight: 1 / 4,
  },
  // {
  //   id: 'technicalCompletion',
  //   label: 'Technical Completion',
  //   description:
  //     'Does the hack work? Does the team present a clear explanation on the implementation and how it works? Does it seem finished or does it seem rough around the edges?',
  //   value: 5,
  //   weight: 4 / 18,
  // },
  // ------------------ HC
  {
    id: 'creativity',
    label: 'Creativity',
    description:
      'How original, nuanced, or unique is the work through its purpose, structure, or functions? Does the team incorporate different perspectives to incorporate diversity, inclusivity, and/or accessibility?',
    value: 5,
    // weight: 4 / 18,
    weight: 1 / 4,
  },
  // ------------------ HC
  {
    id: 'presentation',
    label: 'Presentation',
    description:
      'Is the presentation well-prepared and smooth? Does it make a good business case for the project? Are statistics used when relevant?',
    value: 5,
    // weight: 3 / 18,
    weight: 1 / 4,
  },
]

export const defaultScoreFromRubric = () => {
  const res = JUDGING_RUBRIC.reduce((accum, val) => {
    accum[val.id] = 0
    return accum
  }, {})
  res.notes = ''
  return res
}

export const isUngraded = score => {
  return JUDGING_RUBRIC.map(entry => entry.id).some(id => score[id] === 0)
}

export const calculateGrade = score => {
  return JUDGING_RUBRIC.reduce((currentScore, item) => {
    currentScore += score[item.id] * item.weight
    return currentScore
  }, 0).toFixed(2)
}

export const ETHNICITY_OPTIONS = Object.freeze({
  asianIndian: 'Asian Indian',
  blackOrAfrican: 'Black or African',
  chinese: 'Chinese',
  filipino: 'Filipino',
  guamanianChamorro: 'Guamanian or Chamorro',
  hispanicLatinoSpanishOrigin: 'Hispanic / Latino / Spanish Origin',
  japanese: 'Japanese',
  korean: 'Korean',
  middleEastern: 'Middle Eastern',
  nativeAmericanOrAlaskanNative: 'Native American or Alaskan Native',
  nativeHawaiian: 'Native Hawaiian',
  samoan: 'Samoan',
  vietnamese: 'Vietnamese',
  white: 'White',
  otherAsian: 'Other Asian (Thai, Cambodian, etc)',
  otherPacificIslander: 'Other Pacific Islander',
  preferNot: 'Prefer not to answer',
  other: 'Other (Please Specify)',
})

export const PRONOUN_OPTIONS = Object.freeze({
  hehim: 'he/him',
  sheher: 'she/her',
  theythem: 'they/them',
  hethey: 'he/they',
  shethey: 'she/they',
  preferNot: 'Prefer not to answer',
  other: 'Other',
})

export const DIETARY_RESTRICTION_OPTIONS = Object.freeze({
  none: 'None',
  celiacDisease: 'Celiac Disease',
  halal: 'Halal',
  kosher: 'Kosher',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  other: 'Allergies/other',
})

export const CONTRIBUTION_ROLE_OPTIONS = Object.freeze({
  designer: 'Designer',
  developer: 'Developer',
  pm: 'Product/project manager',
  other: 'Other',
})

export const EVENTS_ATTENDED = Object.freeze({
  cmdf2020: 'cmd-f 2020',
  cmdf2021: 'cmd-f 2021',
  cmdf2022: 'cmd-f 2022',
  cmdf2023: 'cmd-f 2023',
  hackCamp2021: 'HackCamp 2021',
  hackCamp2022: 'HackCamp 2022',
  hackCamp2023: 'HackCamp 2023',
  nwHacks2021: 'nwHacks 2021',
  nwHacks2022: 'nwHacks 2022',
  nwHacks2023: 'nwHacks 2023',
  none: 'None',
})

export const HACKER_APPLICATION_TEMPLATE = Object.freeze({
  _id: '',
  basicInfo: {
    email: '',
    legalFirstName: '',
    legalMiddleName: '',
    legalLastName: '',
    preferredName: '',
    gender: '',
    pronouns: {
      sheher: false,
      hehim: false,
      hethey: false,
      shethey: false,
      theythem: false,
      preferNot: false,
      other: false,
    },
    ethnicity: {
      asianIndian: false,
      blackOrAfrican: false,
      chinese: false,
      filipino: false,
      guamanianChamorro: false,
      hispanicLatinoSpanishOrigin: false,
      japanese: false,
      korean: false,
      middleEastern: false,
      nativeAmericanOrAlaskanNative: false,
      nativeHawaiian: false,
      samoan: false,
      vietnamese: false,
      white: false,
      otherAsian: false,
      otherPacificIslander: false,
      preferNot: false,
      other: false,
    },
    dietaryRestriction: {
      none: false,
      vegetarian: false,
      vegan: false,
      celiacDisease: false,
      kosher: false,
      halal: false,
      other: false,
    },
    identifyAsUnderrepresented: '',
    ageByHackathon: null,
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: null,
    academicYear: '',
    countryOfResidence: '',
    // willBeAgeOfMajority: null,
  },
  skills: {
    firstTimeHacker: null,
    contributionRole: {
      designer: false,
      developer: false,
      pm: false,
      other: false,
    },
    resume: '',
    portfolio: '',
    linkedin: '',
    github: '',
    longAnswers1: '',
    longAnswers2: '',
    longAnswers3: '',
  },
  questionnaire: {
    engagementSource: '',
    eventsAttended: [],
    otherEngagementSource: '',
    friendEmail: '',
  },
  submission: {
    lastUpdated: '',
    submitted: false,
  },
  status: {
    applicationStatus: 'inProgress',
    responded: false, // using responded and attending to check if they un-RSVPed or if they didn't RSVP at all (no RSVP)
    attending: false, // false for no-rsvp by default
  },
  termsAndConditions: {
    MLHCodeOfConduct: false,
    MLHPrivacyPolicy: false,
    MLHEmailSubscription: false,
    shareWithnwPlus: false,
    nwPlusPrivacyPolicy: false,
    shareWithSponsors: false,
  },
  team: '',
})

export const ANALYTICS_EVENTS = Object.freeze({
  Login: 'Login',
  AccessApplication: 'AccessApplication',
  EditApplication: 'EditApplication',
  Signup: 'Signup',
  SocialMediaConversion: 'SocialMediaConversion',
  Logout: 'Logout',
  NotificationToggled: 'NotificationToggled',
})

// firebase auth error codes that are currently custom-handled
export const FIREBASE_AUTH_ERROR = {
  EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
}
