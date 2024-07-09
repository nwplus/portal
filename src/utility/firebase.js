import 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import {
  ANALYTICS_EVENTS,
  APPLICATION_STATUS,
  DB_COLLECTION,
  HACKER_APPLICATION_TEMPLATE,
  REDIRECT_STATUS,
} from '../utility/Constants'

if (!firebase.apps.length) {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  }
  firebase.initializeApp(config)
}

export const firestore = firebase.firestore
export const db = firebase.firestore()
export const storage = firebase.storage()

export const analytics = firebase.analytics()

export const livesiteDocRef = db.collection('InternalWebsites').doc('LivesiteV2')
export const currentHackathonRef = dbHackathonName => {
  return db.collection(DB_COLLECTION).doc(dbHackathonName)
}
export const applicantsRef = dbHackathonName => {
  return db.collection(DB_COLLECTION).doc(dbHackathonName).collection('Applicants')
}
export const projectsRef = dbHackathonName => {
  db.collection(DB_COLLECTION).doc(dbHackathonName).collection('Projects')
}
export const announcementsRef = dbHackathonName => {
  return db.collection(DB_COLLECTION).doc(dbHackathonName).collection('Announcements')
}

export const getLivesiteDoc = callback => {
  return livesiteDocRef.onSnapshot(doc => {
    callback(doc.data())
  })
}

const createNewApplication = async (user, dbHackathonName) => {
  analytics.logEvent(ANALYTICS_EVENTS.signup, { userId: user.uid })
  const userId = {
    _id: user.uid,
  }

  const basicInfo = user?.displayName?.includes(' ')
    ? {
        email: user.email,
        legalFirstName: user?.displayName?.split(' ')[0] ?? '',
        legalLastName:
          user?.displayName?.split(' ')[user?.displayName?.split(' ').length - 1] ?? '',
      }
    : {
        email: user.email,
        legalFirstName: user.displayName ?? '',
      }
  const submission = {
    submission: {
      lastUpdated: firebase.firestore.Timestamp.now(),
      submitted: false,
    },
  }

  // default values for p2p judging on portal
  const judging = {
    projectsAssigned: [],
    submittedProject: '',
  }

  let newApplication = {
    ...HACKER_APPLICATION_TEMPLATE,
    basicInfo: {
      ...HACKER_APPLICATION_TEMPLATE.basicInfo,
      ...basicInfo,
    },
    ...submission,
    ...userId,
    ...judging,
  }

  await applicantsRef(dbHackathonName).doc(user.uid).set(newApplication)
}

/**Extracts user status and redirect information for the user */
export const getUserStatus = async (user, dbHackathonName) => {
  let applicant = await applicantsRef(dbHackathonName).doc(user.uid).get()
  if (!applicant.exists) {
    await createNewApplication(user, dbHackathonName)
    applicant = await applicantsRef(dbHackathonName).doc(user.uid).get()
  }

  const status = applicant.data().status.applicationStatus

  if (applicant.data().status.attending) {
    return { redirect: REDIRECT_STATUS.AttendingEvent, status }
  }

  if (status === APPLICATION_STATUS.accepted) {
    return { redirect: REDIRECT_STATUS.ApplicationAccepted, status }
  }

  if (status === APPLICATION_STATUS.inProgress) {
    return { redirect: REDIRECT_STATUS.ApplicationNotSubmitted, status }
  }
  /**All other status' go here. */
  return { redirect: REDIRECT_STATUS.ApplicationSubmitted, status }
}

export const getUserApplication = async (uuid, dbHackathonName) => {
  return (await applicantsRef(dbHackathonName).doc(uuid).get()).data()
}

export const getSubmission = async (pid, dbHackathonName) => {
  const projectDoc = await projectsRef(dbHackathonName).doc(pid).get()
  return {
    ...projectDoc.data(),
    id: projectsRef(dbHackathonName).doc(pid).id,
    exists: projectDoc.exists,
  }
}

export const submitGrade = async (id, score, user, dbHackathonName, errorCallback = () => {}) => {
  try {
    await db.runTransaction(async transaction => {
      const projectDoc = await transaction.get(projectsRef(dbHackathonName).doc(id))
      if (!projectDoc.exists) {
        console.error('Project does not exist')
        errorCallback(true)
        return
      }
      const oldGrades = projectDoc.data().grades
      const newGrade = user.email ? { ...score, user: user.email } : { ...score }
      const grades = { ...oldGrades, [user.uid]: newGrade }
      transaction.update(projectsRef(dbHackathonName).doc(id), { grades })
    })
  } catch (e) {
    errorCallback(true)
    console.error(e)
  }
}

export const updateUserApplication = async (uuid, newApp, dbHackathonName) => {
  return applicantsRef(dbHackathonName).doc(uuid).set(newApp)
}

export const getSponsors = dbHackathonName => {
  return db
    .collection(DB_COLLECTION)
    .doc(dbHackathonName)
    .collection('Sponsors')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    })
}

export const getProjects = dbHackathonName => {
  return projectsRef(dbHackathonName)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    })
}
// Fetch list of sponsor prizes
export const getSponsorPrizes = dbHackathonName => {
  return db
    .collection(DB_COLLECTION)
    .doc(dbHackathonName)
    .get()
    .then(querySnapshot => {
      return querySnapshot.data().sponsorPrizes
    })
}

export const createProject = (author, data, dbHackathonName) => {
  return projectsRef(dbHackathonName).add({
    ...data,
    lastEditedBy: {
      date: firebase.firestore.Timestamp.now(),
      email: author,
    },
  })
}

export const updateProject = (author, projectId, data, dbHackathonName) => {
  return projectsRef(dbHackathonName)
    .doc(projectId)
    .update({
      ...data,
      lastEditedBy: {
        date: firebase.firestore.Timestamp.now(),
        email: author,
      },
    })
}

export const getAnnouncement = async (announcementId, dbHackathonName) => {
  return (await announcementsRef(dbHackathonName).doc(announcementId).get()).data()
}
