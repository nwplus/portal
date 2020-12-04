import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import {
  HACKER_APPLICATION_TEMPLATE,
  REDIRECT_STATUS,
  DB_COLLECTION,
  APPLICATION_STATUS,
  DB_HACKATHON,
  ANALYTICS_EVENTS,
} from '../utility/Constants'
import { formatProject } from './utilities'

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

export const analytics = firebase.analytics()

export const livesiteDocRef = db.collection('InternalWebsites').doc('Livesite')
export const applicantsRef = db.collection(DB_COLLECTION).doc(DB_HACKATHON).collection('Applicants')
export const projectsRef = db.collection(DB_COLLECTION).doc(DB_HACKATHON).collection('Projects')

export const getLivesiteDoc = callback => {
  return livesiteDocRef.onSnapshot(doc => {
    callback(doc.data())
  })
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

export const syncToFirebase = async (projects, setMessageCallback) => {
  // delete old projects
  setMessageCallback(`Snapping old projects...`)
  const snapshot = await projectsRef.get()

  const deleteBatch = db.batch()
  snapshot.docs.forEach(doc => {
    deleteBatch.delete(doc.ref)
  })
  await deleteBatch.commit()
  setMessageCallback(`Snapped!`)

  // insert new
  const insertBatch = firebase.firestore().batch()
  projects.forEach(p => {
    var docRef = projectsRef.doc()
    p.countAssigned = 0
    insertBatch.set(docRef, Object.assign({}, p))
  })

  setMessageCallback(`Inserting ${projects.length} new projects...`)
  await insertBatch.commit()
  setMessageCallback('Insert done!')
}

export const getProject = async (user_id, setProjectCallback, setFeedbackCallback) => {
  const application = await applicantsRef.doc(user_id).get()
  const team = await application.data().team.get()
  team
    .data()
    .project.get()
    .then(doc => {
      const projectData = formatProject(doc.data())
      setProjectCallback(projectData)
    })
  if (!!setFeedbackCallback) {
    team
      .data()
      .project.collection('Grades')
      .orderBy('notes')
      .get()
      .then(doc => {
        const feedback = doc.docs.map(doc => {
          const docData = doc.data()
          return docData.notes
        })
        setFeedbackCallback(feedback)
      })
  }
}

const createNewApplication = async user => {
  analytics.logEvent(ANALYTICS_EVENTS.signup, { userId: user.uid })
  const userId = {
    _id: user.uid,
  }
  const basicInfo = {
    basicInfo: {
      email: user.email,
      firstName: user.displayName.split(' ')[0],
      lastName: user.displayName.split(' ')[1],
    },
  }
  const submission = {
    submission: {
      lastUpdated: firebase.firestore.Timestamp.now(),
      submitted: false,
    },
  }

  const newApplication = {
    ...HACKER_APPLICATION_TEMPLATE,
    ...basicInfo,
    ...submission,
    ...userId,
  }

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

  if (status === APPLICATION_STATUS.inProgress) {
    return { redirect: REDIRECT_STATUS.ApplicationNotSubmitted, status }
  }
  /**All other status' go here. */
  return { redirect: REDIRECT_STATUS.ApplicationSubmitted, status }
}

export const getUserApplication = async uuid => {
  return (await applicantsRef.doc(uuid).get()).data()
}

export const updateUserApplication = async (uuid, newApp) => {
  return applicantsRef.doc(uuid).set(newApp)
}
