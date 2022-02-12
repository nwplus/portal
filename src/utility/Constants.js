export const DB_COLLECTION = 'Hackathons'

// CHANGE: firebase collection name for this hackathon
export const DB_HACKATHON = 'cmd-f2022'
export const DAYOF_COLLECTION = 'DayOf'
export const FAQ_COLLECTION = 'FAQ'
export const NOTIFICATION_SETTINGS_CACHE_KEY = 'livesiteNotificationSettings'
export const IS_DEVICE_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
export const copyText = Object.freeze({
  // CHANGE: name of hackathon to be displayed on login splash
  hackathonName: 'cmd-f 2022',
})

export const PROJECTS_TO_JUDGE_COUNT = 5
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
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlisted',
  inProgress: 'inProgress',
  scored: 'scored',
})

export const JUDGING_RUBRIC = [
  {
    id: 'technology',
    label: 'Technology',
    description:
      "How simple or advanced is the team's use of the technology (APIs, libraries, algorithm, etc) driving the project? Can the demo demonstrate the core functionality of the project?",
    value: 5,
    weight: 1.2,
  },
  {
    id: 'design',
    label: 'Design',
    description:
      'Looking at both the User Interface (UI) and the User Experience (UX). Is it clean, elegant, consistent with the theme, easy to use, intuitive?',
    value: 5,
    weight: 0.9,
  },
  {
    id: 'pitchImpact',
    label: 'Pitch + Impact',
    description:
      "Is the pitch engaging, well planned out, prepared, has meaningful content? Is it something relevant to today's world? Is it an interesting take on previous solutions or is it an improvement?",
    value: 5,
    weight: 0.9,
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
})

export const HACKER_APPLICATION_TEMPLATE = Object.freeze({
  _id: '',
  // Commenting out for cmd-f 2022
  // vaccineInfo: {
  //   willBeDoubleVaxed: false,
  // },
  basicInfo: {
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
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
    isOfLegalAge: null,
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: null,
    contributionRole: '',
  },
  skills: {
    hackathonsAttended: null,
    resume: '',
    portfolio: '',
    linkedin: '',
    github: '',
    longAnswers1: '',
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
