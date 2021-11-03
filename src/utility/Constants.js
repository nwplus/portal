export const DB_COLLECTION = 'Hackathons'

// CHANGE: firebase collection name for this hackathon
export const DB_HACKATHON = 'HackCamp2021'
export const DAYOF_COLLECTION = 'DayOf'
export const FAQ_COLLECTION = 'FAQ'
export const NOTIFICATION_SETTINGS_CACHE_KEY = 'livesiteNotificationSettings'
export const IS_DEVICE_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
export const copyText = Object.freeze({
  // CHANGE: name of hackathon to be displayed on login splash
  hackathonName: 'HackCamp 2021',
})

export const PROJECTS_TO_JUDGE_COUNT = 5

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
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlisted',
  inProgress: 'inProgress',
  scored: 'scored',
})

export const JUDGING_RUBRIC = [
  {
    id: 'execution',
    label: 'Execution',
    description:
      'How well does the project address the teams selected theme/focus? How much impact will this solution have?',
    value: 4,
    weight: 1,
  },
  {
    id: 'innovation',
    label: 'Innovation',
    description:
      'Is the project a creative, original, and a suitable solution to the problem? Does the product introduce a new approach or perspective?',
    value: 3,
    weight: 1,
  },
  {
    id: 'design',
    label: 'Design',
    description:
      'Is the design accessible (e.g. high contrast for good visibility, etc.) and aesthetically pleasing?',
    value: 4,
    weight: 1,
  },
  {
    id: 'completeness',
    label: 'Technical Completion',
    description:
      'Does the hack work? Does the team present a clear explanation on the implementation and how it works? Does it seem finished or does it seem rough around the edges?',
    value: 4,
    weight: 1,
  },
  {
    id: 'presentation',
    label: 'Presentation',
    description:
      'Is the presentation well-prepared and smooth? Does it make a good business case for the project? Are statistics used when relevant?',
    value: 3,
    weight: 1,
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

export const HACKER_APPLICATION_TEMPLATE = Object.freeze({
  _id: '',
  basicInfo: {
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    ethnicity: {
      asian: false,
      black: false,
      caucasian: false,
      hispanic: false,
      middleEastern: false,
      nativeHawaiian: false,
      northAmerica: false,
      other: false,
      preferNot: false,
    },
    isOfLegalAge: null,
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: null,
    hackathonsAttended: null,
    contributionRole: '',
    location: '',
  },
  skills: {
    resume: '',
    portfolio: '',
    linkedin: '',
    github: '',
    longAnswers: '',
  },
  questionnaire: {
    engagementSource: '',
    eventsAttended: [],
    otherEngagementSource: '',
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
