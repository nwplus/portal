export const DB_COLLECTION = 'Hackathons'

// CHANGE: firebase collection name for this hackathon
export const DB_HACKATHON = 'cmd-f2023'
export const DAYOF_COLLECTION = 'DayOf'
export const FAQ_COLLECTION = 'FAQ'
export const NOTIFICATION_SETTINGS_CACHE_KEY = 'livesiteNotificationSettings'
export const IS_DEVICE_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
export const copyText = Object.freeze({
  // CHANGE: name of hackathon to be displayed on login splash
  hackathonName: 'cmd-f 2023',
  hackathonNameShort: 'cmd-f',
})

export const PROJECTS_TO_JUDGE_COUNT = 4
export const MAX_CHARACTERS_IN_DESCRIPTION = 100

export const NOTIFICATION_PERMISSIONS = Object.freeze({
  GRANTED: 'granted',
  DEFAULT: 'default',
  DENIED: 'denied',
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
  africanAmerican: 'African American or Black',
  americanIndian: 'American Indian or Alaskan Native',
  asian: 'Asian or Pacific Islander',
  caucasian: 'Caucasian or White',
  hispanic: 'Hispanic or Latinx',
  other: 'Multiple ethnicity/Other',
  preferNot: 'Prefer not to say',
})

export const EVENTS_ATTENDED = Object.freeze({
  mentorship: 'connect-f Mentorship Program',
  phase1: 'cmd-f Phase 1: Resume Review & Networking',
  phase2: 'cmd-f Phase 2: Intro to LinkedIn & Networking Workshop',
  cmdf2019: 'cmd-f 2019',
  cmdf2020: 'cmd-f 2020',
  cmdf2021: 'cmd-f 2021',
  hackCamp2021: 'HackCamp 2021',
  hackCamp2022: 'HackCamp 2022',
  nwHacks2021: 'nwHacks 2021',
  nwHacks2022: 'nwHacks 2022',
})

export const HACKER_APPLICATION_TEMPLATE = Object.freeze({
  _id: '',
  vaccineInfo: {
    willBeDoubleVaxed: false,
  },
  basicInfo: {
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    gender: '',
    pronouns: '',
    ethnicity: {
      africanAmerican: false,
      americanIndian: false,
      asian: false,
      caucasian: false,
      hispanic: false,
      other: false,
      preferNot: false,
    },
    ageByHackathon: null,
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: null,
    contributionRole: '',
    countryOfResidence: '',
  },
  skills: {
    hackathonsAttended: null,
    resume: '',
    portfolio: '',
    linkedin: '',
    github: '',
    longAnswers1: '',
    longAnswers2: '',
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
