import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'
import {
  HACKER_APPLICATION_TEMPLATE,
  REDIRECT_STATUS,
  DB_COLLECTION,
  APPLICATION_STATUS,
  DB_HACKATHON,
  ANALYTICS_EVENTS,
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

  let whitelisted =
    'ryanzhou2004@gmail.com,sunyiran0817@gmail.com,devmwang@icloud.com,mariesamantha.f@gmail.com,wuchuoxi@gmail.com,ethanngu19@gmail.com,eunhocj93@gmail.com,billy131lam@gmail.com,rishabhg260203@gmail.com,wcao2012@gmail.com,vikimho@gmail.com,racheln0519@gmail.com,ekam.13dhanoa@gmail.com,shibuanshu@gmail.com,caris.h.tin@gmail.com,ynwinubc24@gmail.com,kylieakrueger@gmail.com,stephenqiao123@gmail.com,oceannanguyen@gmail.com,mtang78@student.ubc.ca,david-guo@live.ca,kevinhu738@gmail.com,acl.aeng@gmail.com,tl0226yn@gmail.com,wenjiejin00@gmail.com,meganong1@gmail.com,dannieko02@gmail.com,wendyngan710@gmail.com,kevinshiao5@gmail.com,erichsieh25@gmail.com,racheljune2004@gmail.com,illing.noel@gmail.com,mominkas@student.ubc.ca,hanatutak@gmail.com,tracy.la829@gmail.com,danirenn16@gmail.com,jessieshengyj@gmail.com,josephine.sshuang@gmail.com,ericleung147258369@hotmail.com,chanemily24@gmail.com,sallyhan062@gmail.com,henryshkim@hotmail.com,patty.tanch@gmail.com,suhailkhalil2002@gmail.com,pratham.bansal2112@gmail.com,rafaykhurram@live.com,mpaknys@icloud.com,ytaghavi@yahoo.com,matthewyungisworking@gmail.com,noornaila04@gmail.com,brnyng926@gmail.com,aaronlam111@gmail.com,nadellavamsi06@gmail.com,kashishgarg247@gmail.com,nsjlee33@hotmail.com,sam1128van@gmail.com,eric.shuai88@gmail.com,jameswu0414@gmail.com,afifmv1@gmail.com,dalmia.kavya@gmail.com,hongcs2002@gmail.com,rayn.friar@gmail.com,tliu024@student.ubc.ca,tomanh2104@gmail.com,joycai.0205@gmail.com,andrewfeng2014@gmail.com,alexjeon246@gmail.com,aprameyaithal@gmail.com,divyharjunsingh@gmail.com,hthlai@student.ubc.ca,ashishpanda0415@gmail.com,tristontsui@gmail.com,kylema.1042@gmail.com,rohs44893@g.skku.edu,kmryn410@gmail.com,kashish1609@gmail.com,rwu20@student.ubc.ca,liujenny.l98@gmail.com,juliasangster@hotmail.com,zaidt221325@gmail.com,alyoawesome100@gmail.com,myhou0720@gmail.com,rowelsabahat15@gmail.com,zhoukev12@gmail.com,elenaopenworld@gmail.com,gabrielrdelarosa@gmail.com,williamtianyugao@gmail.com,pranjalgupta2802@gmail.com,mskent@live.ca,etrinh26@gmail.com,gsthanh@student.ubc.ca,karenagustino12@gmail.com,sunveerx@gmail.com,zhangyuzhelily@gmail.com,kellyyyxi@gmail.com,defneran@gmail.com,celinechen1114@gmail.com,salman_khan2001xx@hotmail.com,colin.cchn@gmail.com,britneyng1@gmail.com,dgmurgulet@gmail.com,wendygreening@telus.net,charliemchen@yahoo.com,li.kevin0203@gmail.com,briann.wong@hotmail.com,janieholzmann@gmail.com,wangowen02@gmail.com,rdmnr@protonmail.com,terrychou_28@hotmail.com,michaelfromyeg@gmail.com,amy34268@gmail.com,anicamok@gmail.com,nimanourozy@gmail.com,oltimaloku555@gmail.com,lindachu719@gmail.com,allantan.zf@gmail.com,hannah.Wong2021@gmail.com,timma0330@gmail.com,rxluo1202@gmail.com,sammishih04@gmail.com,echomaria98123@gmail.com,4ngelalucas@gmail.com,123.roychen@gmail.com,troy_64@telus.net,chloe.m.van@gmail.com,remembria.me@gmail.com,william_gao0206@hotmail.com,timmychieng@gmail.com,gordonch99@gmail.com,williamsunedu1617@gmail.com,alexwu120203@gmail.com,nokia.methasit@gmail.com,justinn.tangg@gmail.com,katherine2014lub@gmail.com,hcpc215@gmail.com,yuqing_ma98@163.com,scenery@student.ubc.ca,namazifardshadan@gmail.com,everettubc2002@gmail.com,michelleli11220@gmail.com,lewdanielyang@gmail.com,leila.gazizova2003@gmail.com,shivamkataria1000@gmail.com,jeffkim7@hotmail.com,alisonh24jsyk@gmail.com,callumoriley@gmail.com,aneesh.bulusu@gmail.com,charity.grey1@gmail.com,jess.c.zhou@gmail.com,gfzting@gmail.com,clarapark0808@gmail.com,chunwong@student.ubc.ca,napat.luan@gmail.com,lykawangg@gmail.com,jackwstwang@gmail.com'
  let whitelistedArr = whitelisted.split(',')

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
  // db.collection('Hackathons').doc('HackCamp2022').collection('Whitelist')
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
  if (whitelisted.includes(user.email) || user.email.includes('@nwplus.io')) {
    // good to go
    newApplication = {
      ...newApplication,
      status: {
        applicationStatus: 'accepted',
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
