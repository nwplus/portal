import React from 'react'
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

export const RedirectStatus = Object.freeze({
  ApplicationNotSubmitted: 'ApplicationNotSubmitted',
  ApplicationSubmitted: 'ApplicationSubmitted',
  AttendingEvent: 'AttendingEvent',
})

export const ApplicationStatus = Object.freeze({
  applied: 'applied',
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlisted',
  inProgress: 'inProgress',
})

export const hackerApplicationTemplate = Object.freeze({
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
    isOfLegalAge: false,
    phoneNumber: '',
    school: '',
    major: '',
    educationLevel: '',
    graduation: 0,
    hackathonsAttended: 0,
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

export const hackerStatuses = {
  applied: {
    sidebarText: 'In Review',
    cardText: 'Awaiting assessment',
    blurb:
      'We will send out all acceptances by XX, XX, XXXX. In the mean time, get connected with our community of hackers on Medium, Twitter, and Facebook to stay up to date with the latest news on sponsors, prizes and workshops.',
  },
  waitlisted: {
    sidebarText: 'Waitlisted',
    cardText: 'Waitlisted',
    blurb:
      'Hi Haku, we had a lovely time reading your application, and  were very impressed with your commitment to joining the technology community. We would love to see you at nwHacks this year, however, at the moment, we can not confirm a spot for you. You have been put in our waitlist, and will be notified within ___ if we found a spot for you, so please check your email then!',
  },
  rejected: {
    sidebarText: 'Rejected',
    cardText: 'Rejected',
    blurb:
      "Hi Haku, we are sorry to inform you that we won't be able to give you a spot at nwHacks 2021. We had a lot of amazing applicants this year, and we are very grateful to have gotten yours, but we can't take everyone. We do hope to see your application next year and that this setback isn't the end of your tech career. Please visit our site nwplus.io to learn about more events and other ways to engage with the technology community.",
  },
  acceptedNoResponseYet: {
    sidebarText: 'Accepted, Awaiting RSVP',
    cardText: 'Accepted & Awaiting RSVP',
    blurb:
      "Congratulations! We loved the passion and drive we saw in your application, and we'd love even more for you to join us at nwHacks 2021 over the weekend of January XX-XX! RSVP before January Xth at 11:59 PM to confirm your spot.",
  },
  acceptedAndAttending: {
    cardText: (
      <>
        Accepted &amp; RSVP'd{' '}
        <span role="img" aria-label="celebrate emoji">
          🎊
        </span>
      </>
    ),
    blurb:
      "We can't wait to see you at nwHacks! You'll be receiving another email closer to the event date with more information regarding the schedule and other logistics. If you find out you can't make it to nwHacks anymore due to change in your schedule, please update your RSVP status so we can allocate spots for waitlisted hackers!",
  },
  acceptedNotAttending: {
    sidebarText: "Un-RSVP'd",
    cardText: "Un-RSVP'd",
    blurb:
      "We're sorry you won't be attending nwHacks this year. We do hope to see you at our future events, visit our site nwplus.io or follow us on social media to learn about our events and other ways to engage with the technology community!",
  },
}
