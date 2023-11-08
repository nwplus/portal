import 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import {
  ANALYTICS_EVENTS,
  APPLICATION_STATUS,
  DB_COLLECTION,
  DB_HACKATHON,
  HACKER_APPLICATION_TEMPLATE,
  REDIRECT_STATUS,
} from '../utility/Constants'

if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  }
  firebase.initializeApp(config)
}

export const firestore = firebase.firestore
export const db = firebase.firestore()
export const storage = firebase.storage()

export const analytics = firebase.analytics()

export const livesiteDocRef = db.collection('InternalWebsites').doc('Livesite')
export const currentHackathonRef = db.collection(DB_COLLECTION).doc(DB_HACKATHON)
export const applicantsRef = db.collection(DB_COLLECTION).doc(DB_HACKATHON).collection('Applicants')
export const projectsRef = db.collection(DB_COLLECTION).doc(DB_HACKATHON).collection('Projects')

export const getLivesiteDoc = callback => {
  return livesiteDocRef.onSnapshot(doc => {
    callback(doc.data())
  })
}

// -----------------------------------------------------
// TODO: Delete temporary code that whitelists users that have RSVP'd (all the commented bars)
export const setWhitelist = async () => {
  let batch = db.batch()

  let whitelistedArr = [
    'mthteo@gmail.com',
    'melvin@nwplus.io',
    'dev-test@nwplus.io',
    'portaltest432@gmail.com',
  ]

  for (let i = 0; i < whitelistedArr.length; i++) {
    batch.set(
      db.collection(DB_COLLECTION).doc(DB_HACKATHON).collection('Whitelist').doc(whitelistedArr[i]),
      {}
    )
  }

  batch.commit().then(() => {
    alert('uploaded successfully')
  })
}
// -----------------------------------------------------

// -----------------------------------------------------
export const getWhitelisted = async () => {
  // db.collection('Hackathons').doc('HackCamp2023').collection('Whitelist')
  const whitelisted = []
  await db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('Whitelist')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        whitelisted.push(doc.id)
      })
    })
  return whitelisted
}
// -----------------------------------------------------

const createNewApplication = async user => {
  analytics.logEvent(ANALYTICS_EVENTS.signup, { userId: user.uid })
  const userId = {
    _id: user.uid,
  }

  const basicInfo = user?.displayName?.includes(' ')
    ? {
        email: user.email,
        firstName: user?.displayName?.split(' ')[0] ?? '',
        lastName: user?.displayName?.split(' ')[user?.displayName?.split(' ').length - 1] ?? '',
      }
    : {
        email: user.email,
        firstName: user.displayName ?? '',
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

  // -----------------------------------------------------
  // If not whitelisted, no
  const whitelisted = await getWhitelisted()
  if (whitelisted.includes(user.email)) {
    // good to go
    newApplication = {
      ...newApplication,
      status: {
        applicationStatus: 'acceptedAndAttending',
        responded: true,
        attending: true,
      },
    }
    // else, the default application template will block them from submissions -> redirect to "Applications for this hackathon are closed"
  }
  // -----------------------------------------------------

  await applicantsRef.doc(user.uid).set(newApplication)
}

/**Extracts user status and redirect information for the user */
export const getUserStatus = async user => {
  let applicant = await applicantsRef.doc(user.uid).get()
  if (!applicant.exists) {
    await createNewApplication(user)
    applicant = await applicantsRef.doc(user.uid).get()
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

export const getUserApplication = async uuid => {
  return (await applicantsRef.doc(uuid).get()).data()
}

export const getSubmission = async pid => {
  const projectDoc = await projectsRef.doc(pid).get()
  return { ...projectDoc.data(), id: projectsRef.doc(pid).id, exists: projectDoc.exists }
}

export const submitGrade = async (id, score, user, errorCallback = () => {}) => {
  try {
    await db.runTransaction(async transaction => {
      const projectDoc = await transaction.get(projectsRef.doc(id))
      if (!projectDoc.exists) {
        console.error('Project does not exist')
        errorCallback(true)
        return
      }
      const oldGrades = projectDoc.data().grades
      const newGrade = user.email ? { ...score, user: user.email } : { ...score }
      const grades = { ...oldGrades, [user.uid]: newGrade }
      transaction.update(projectsRef.doc(id), { grades })
    })
  } catch (e) {
    errorCallback(true)
    console.error(e)
  }
}

export const updateUserApplication = async (uuid, newApp) => {
  return applicantsRef.doc(uuid).set(newApp)
}

export const getSponsors = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('Sponsors')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    })
}

export const getProjects = () => {
  return projectsRef.get().then(querySnapshot => {
    return querySnapshot.docs
  })
}
// Fetch list of sponsor prizes
export const getSponsorPrizes = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .get()
    .then(querySnapshot => {
      return querySnapshot.data().sponsorPrizes
    })
}

export const createProject = (author, data) => {
  return projectsRef.add({
    ...data,
    lastEditedBy: {
      date: firebase.firestore.Timestamp.now(),
      email: author,
    },
  })
}

export const updateProject = (author, projectId, data) => {
  return projectsRef.doc(projectId).update({
    ...data,
    lastEditedBy: {
      date: firebase.firestore.Timestamp.now(),
      email: author,
    },
  })
}
