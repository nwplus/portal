export const DB_COLLECTION = 'Hackathons'

// CHANGE: firebase collection name for this hackathon
export const DB_HACKATHON = 'nwHacks2021'

export const FAQ_COLLECTION = 'FAQ'
export const NOTIFICATION_SETTINGS_CACHE_KEY = 'livesiteNotificationSettings'
export const IS_DEVICE_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
export const copyText = Object.freeze({
  // CHANGE: name of hackathon to be displayed on login splash
  hackathonName: 'nwHacks 2021',
})

export const NOTIFICATION_PERMISSIONS = Object.freeze({
  GRANTED: 'granted',
  DEFAULT: 'default',
  DENIED: 'denied',
})
export const DAYOF_COLLECTION = 'DayOf'

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
    id: 'tech',
    label: 'Technology',
    description:
      'The project has advanced usage of multiple technologies to very efficiently tackle the problem at hand. The team shows an excellent level of understanding of the technologies used.',
    value: 5,
    weight: 0.25,
  },
  {
    id: 'design',
    label: 'Design',
    description:
      'User Interface fits perfectly with the project and it is eye-pleasing. User Experience is very well thought, it is very easy to use the project. Hardware interaction is intuitive and well thought out. Goes above and beyond for factors beyond software (accessibility, etc.).',
    value: 5,
    weight: 0.25,
  },
  {
    id: 'functionality',
    label: 'Functionality',
    description: 'Project is fully functional and polished. No apparent bugs during the demo.',
    value: 5,
    weight: 0.2,
  },
  {
    id: 'creativity',
    label: 'Creativity',
    description: 'The project is a unique solution to a new problem.',
    value: 5,
    weight: 0.1,
  },
  {
    id: 'pitch',
    label: 'Pitch',
    description:
      'A lot of preparation was made for the pitch. All team members contribute to the pitch. The entire pitch content is relevant and no repeated information is given. Pitch is very engaging.',
    value: 5,
    weight: 0.2,
  },
]

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
