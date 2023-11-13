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
    'martin@nwplus.io',
    'taryn@nwplus.io',
    'jae@nwplus.io',
    'janaye@nwplus.io',
    'byron@nwplus.io',
    'kashish@nwplus.io',
    'kitty@nwplus.io',
    'nicholas@nwplus.io',
    'alan@nwplus.io',
    'alex@nwplus.io',
    'edward@nwplus.io',
    'jennifern@nwplus.io',
    'sami@nwplus.io',
    'angela@nwplus.io',
    'charlene@nwplus.io',
    'trisha@nwplus.io',
    'yeojun@nwplus.io',
    'anna@nwplus.io',
    'victorial@nwplus.io',
    'aurora@nwplus.io',
    'cristen@nwplus.io',
    'daphne@nwplus.io',
    'jennifers@nwplus.io',
    'lucas@nwplus.io',
    'linda@nwplus.io',
    'bernice@nwplus.io',
    'irene@nwplus.io',
    'jessica@nwplus.io',
    'isaac@nwplus.io',
    'alvin@nwplus.io',
    'keving@nwplus.io',
    'michellef@nwplus.io',
    'michellew@nwplus.io',
    'oliver@nwplus.io',
    'sophia@nwplus.io',
    'michelle@nwplus.io',
    'maureen@nwplus.io',
    'gordon@nwplus.io',
    'angelina@nwplus.io',
    'jade@nwplus.io',
    'joanne@nwplus.io',
    'alvink@nwplus.io',
    'donald@nwplus.io',
    'lincoln@nwplus.io',
    'samantha@nwplus.io',
    'yan@nwplus.io',
    'amyxcao17007@gmail.com',
    'chen.q.cheryl@gmail.com',
    'kevinhua1029@gmail.com',
    'vasspetrousevitch@gmail.com',
    'kevvluu1234@gmail.com',
    'frankkaiwen.yu@gmail.com',
    'pqtuan2003@gmail.com',
    'chanjdaniel@gmail.com',
    'jakeyeozh@gmail.com',
    'jbcraft88@gmail.com',
    'darine.motalib@gmail.com',
    'marianeolivan@gmail.com',
    'joelbcasp@gmail.com',
    'armanmeh0973@gmail.com',
    'erniehan512@gmail.com',
    'borhan200153@gmail.com',
    'badinisairohan@gmail.com',
    'mingwalai326@gmail.com',
    'sajeedazam.20@gmail.com',
    'mustafahasia955@gmail.com',
    'parth.sanan@gmail.com',
    'fazedom9@gmail.com',
    'limevan50@gmail.com',
    'jagathi.moturi@gmail.com',
    'ngevan91@gmail.com',
    'nwjinlin@gmail.com',
    'uijinjung64@gmail.com',
    'mattwanjh@gmail.com',
    'haviid.06@gmail.com',
    'dawon020411@gmail.com',
    'hortenseamouzouvi@gmail.com',
    'alicele280303@gmail.com',
    'matthewauwasd@gmail.com',
    'kaikomne@gmail.com',
    'brianchu3141@gmail.com',
    'sarahliang13013@gmail.com',
    'gao.william0206@gmail.com',
    'weenawibowo@gmail.com',
    'stutivsharma@gmail.com',
    'chiefpat450119@gmail.com',
    'therealrajansapkota@gmail.com',
    'afifmv1@gmail.com',
    'derekchuschool@gmail.com',
    'dhawalrathor12@gmail.com',
    'jeyahmarie@gmail.com',
    'hanwt.me@gmail.com',
    'caporiccioelizabeth@gmail.com',
    'okarioto@gmail.com',
    'ronaldch1227@gmail.com',
    'samiasajid2@gmail.com',
    'lancessoliman@gmail.com',
    'eitan.klinger@gmail.com',
    'junjiezhu1388@gmail.com',
    'enzotanyen@gmail.com',
    'lzarins211@gmail.com',
    'shiyu.li.1109@gmail.com',
    'jlieu15@gmail.com',
    'mahendrutanay12@gmail.com',
    'lam.michael.81201@gmail.com',
    'mia.makino@gmail.com',
    'huangsimiao2014@gmail.com',
    'maxpistawka@gmail.com',
    'vivianq0420@gmail.com',
    'joshuawu2004@gmail.com',
    'owen.li.12.11@gmail.com',
    'jordanlieu14@gmail.com',
    'rishabhmathur0508@gmail.com',
    'chloezhang1030@gmail.com',
    'jiaqitracygan@gmail.com',
    '523pjm@gmail.com',
    'catherinexie1123@gmail.com',
    'ibrahim.sajid0717@gmail.com',
    'juanlozano7311@gmail.com',
    'a00830006@tec.mx',
    'nellysadat@gmail.com',
    'fantu.franoll1@gmail.com',
    'oliviahe0111@gmail.com',
    'bryanlim93@gmail.com',
    'manveer.sidhu2007@gmail.com',
    'ericlew35@gmail.com',
    'anusha.thukral@gmail.com',
    'williamssebastian73@gmail.com',
    'shamsiad@thinkglobalschool.com',
    'sin.alicee@gmail.com',
    'kyungcheolkoh@gmail.com',
    'cyt.yue@gmail.com',
    'huanghelen30@gmail.com',
    'armenhbusiness@gmail.com',
    'skyy.yunn@gmail.com',
    'elianadbarbosa@gmail.com',
    'sinniechoi18@gmail.com',
    'lizzyroseou@gmail.com',
    'kaikoyamawong@gmail.com',
    'etanhuang1@gmail.com',
    'michaelyang988@gmail.com',
    'limsanghwa@gmail.com',
    'bowencui1221@gmail.com',
    'jennifer26wang@gmail.com',
    'evanfung2000@gmail.com',
    'lmh1230612306@gmail.com',
    'hvgksoci@gmail.com',
    'kanwarsekhon21@gmail.com',
    'piamiras27@gmail.com',
    'antonkazachenko2002@gmail.com',
    'kevxtroyg@gmail.com',
    'samanthayeung0430@gmail.com',
    'jackydo1974@gmail.com',
    'davidtheophine@gmail.com',
    'andy45.hu@gmail.com',
    'tongwuca@gmail.com',
    'paulineaudreyongchan@gmail.com',
    'gogeolee@gmail.com',
    'kevinleimc@gmail.com',
    'jkmm.1024@gmail.com',
    'sanspariel.m@gmail.com',
    'ishaafzal1301@gmail.com',
    'joshlim01@gmail.com',
    'eryuexinyue@gmail.com',
    'newgen2.0b@gmail.com',
    'chinmaybhansali2001@gmail.com',
    'mattiaswong6@gmail.com',
    'munich.crouton.friend@gmail.com',
    'reynaldidewanto1106@gmail.com',
    'kellywong0613@gmail.com',
    'davidyang838@gmail.com',
    'navyachugh2004@gmail.com',
    'kfreitag@kieran.ca',
    'feliciachen200@gmail.com',
    'kathleenjtom@gmail.com',
    'tonygao742@gmail.com',
    'harrisonmacey@gmail.com',
    'joshuajacobj7@gmail.com',
    'hyt152004@gmail.com',
    'randyren278@gmail.com',
    'magdalene.cheung1@gmail.com',
    'drjrenzetti5@gmail.com',
    'nilashamajumdar18@gmail.com',
    'hilarylau119@gmail.com',
    'enoch0516@gmail.com',
    'navid9800@gmail.com',
    'laurenspark05@gmail.com',
    'charmainehalim@gmail.com',
    'yegefei0121@gmail.com',
    'liuisaac05@gmail.com',
    'alvincytsang@gmail.com',
    'racheloong24@gmail.com',
    'sapphirep0728@gmail.com',
    'kpruday07@gmail.com',
    's.ibrahim.saeed16@gmail.com',
    'muhtasim.rahman21@gmail.com',
    'jordan2002222@gmail.com',
    'dennischiu14@gmail.com',
    'john1grey9@gmail.com',
    'lily.s.chen95@gmail.com',
    'stephanie.c.feng@gmail.com',
    'robbielaughlen@gmail.com',
    'parammody@gmail.com',
    'franklinming.m27@gmail.com',
    'zmx201518@gmail.com',
    'jordanso7789@gmail.com',
    'matthewanh10@gmail.com',
    'ohdeanj@gmail.com',
    'sophiaxsyang@gmail.com',
    'lukepielak@gmail.com',
    'shirleyzhaao@gmail.com',
    'tsaisteven2001@gmail.com',
    'yood2@proton.me',
    'matthewasmith442@gmail.com',
    'ajai.karthikeshancs@gmail.com',
    'allisontao04@gmail.com',
    'emily.wood1624@gmail.com',
    'vinlee1208@gmail.com',
    'minori.poedjokerto@gmail.com',
    'alisa.school.42@gmail.com',
    'yejinlhee04@gmail.com',
    'mirmumtahina@gmail.com',
    'patricia.tani@gmail.com',
    'kodename.kian@gmail.com',
    'vickiszhang@gmail.com',
    'wendyli.org@gmail.com',
    'carrlosaperrez@gmail.com',
    'nguyenphuocdat0706@gmail.com',
    'lavamarmax@gmail.com',
    'seanxu7788@gmail.com',
    'amanprakashburnett@gmail.com',
    'pearlpark8798@gmail.com',
    'kimberlychan038@gmail.com',
    'hediemahmoudian@gmail.com',
    'tsarof1812@gmail.com',
    'davidpro1080@gmail.com',
    'talibxchohan@gmail.com',
    'uberdrivenfar@gmail.com',
    'laylachenn@gmail.com',
    'jocelynzhao22@gmail.com',
    'mhannany@gmail.com',
    'jspurushothaman150904@gmail.com',
    'rkglimmer16@gmail.com',
    'desmondchai122@gmail.com',
    'selinaye99@gmail.com',
    'omairqazi.29@gmail.com',
    'youssefsaleh0203@gmail.com',
    'toner.finn@gmail.com',
    'smritiminhas04@gmail.com',
    'sarahbrooks852@gmail.com',
    'jazzywan2001@gmail.com',
    'anguslau91@gmail.com',
    'derekwangsz@gmail.com',
    'helenhua999@gmail.com',
    'lindachu719@gmail.com',
    'danialramzan@gmail.com',
    'astrollin.neil@gmail.com',
    'saharahb19@gmail.com',
    'enorasun1120@gmail.com',
    'klivanchung@gmail.com',
    'nicholas59841@gmail.com',
    'viethung5403@gmail.com',
    'vanshchanana2004@gmail.com',
    'brandonbradyeung@gmail.com',
    'atrung380@gmail.com',
    'joannec.chang1@gmail.com',
    'samwongg03@gmail.com',
    'luke.concini@gmail.com',
    'khangmynguyen1307@gmail.com',
    'doctorhanson21@gmail.com',
    'dana.brynn@gmail.com',
    'champbry16@gmail.com',
    'ryanjhan10@gmail.com',
    'mrrangerlee@gmail.com',
    'ducbui2266@gmail.com',
    'vanessa.james1704@gmail.com',
    'g.jiang06@gmail.com',
    'xenshreyas@gmail.com',
    'sebastian.tenorio.uvm@gmail.com',
    'liu.wendi@yahoo.ca',
    'piramidejade13@gmail.com',
    'aaronjohal9@gmail.com',
    'zoeziqingyuan@gmail.com',
    'kassandra.haftner@outlook.com',
    'sabrinawoo3895@gmail.com',
    'mdiederichsen04@gmail.com',
    'manav.k.doshi@gmail.com',
    'firespitter2.0@gmail.com',
    'domaryjoy2@gmail.com',
    'caswellbrett@gmail.com',
    'nathanchaninbox@gmail.com',
    'yifanhao5@gmail.com',
    'lovepreetdhunna98@gmail.com',
    'alexandrabsmart@gmail.com',
    'andreasebas004@gmail.com',
    'oliveirade.matheus@gmail.com',
    'paultiberghien1@gmail.com',
    'rchanpra.ubc@gmail.com',
    'saumyasanghvi25@gmail.com',
    'jerry.jge@gmail.com',
    'andrewfan030114@gmail.com',
    'arafa.maya@gmail.com',
    'yangjerrica3@gmail.com',
    'nnchan777@gmail.com',
    'brandon.zchen6@gmail.com',
    'martin7uy@gmail.com',
    'zizhouwang131@gmail.com',
    'jhuang20020430@gmail.com',
    'sarahyzgu@gmail.com',
    'amelijaolson@gmail.com',
    'jsm36@sfu.ca',
    'rishavpreetsingh@gmail.com',
    'davenfroberg@gmail.com',
    'michaellulele@gmail.com',
    'calebly@gmail.com',
    'tianhy20@gmail.com',
    'yuguogm@gmail.com',
    'rikli258@gmail.com',
    'gaojiajun1058@gmail.com',
    'shorya.3675@gmail.com',
    'edwardhermanto78@gmail.com',
    'nishant.molleti@gmail.com',
    'mostafa.ali90001@gmail.com',
    'bryanhuang66@gmail.com',
    'auyilokelliott2002@gmail.com',
    'abhiram.poluri@gmail.com',
    'rhoda312312@gmail.com',
    'jackyfeng234@gmail.com',
    'jessicayao317@gmail.com',
    'jshum2117@gmail.com',
    'lee.gabriel2@gmail.com',
    'rayleishen@gmail.com',
    'abdallah.nbl@gmail.com',
    'evangelineyo210@gmail.com',
    'gaspar.tan1189@gmail.com',
    'imsam0124@gmail.com',
    'jacobwangadm22@gmail.com',
    'susannaxwg@gmail.com',
    'ali.r.abbas.2005@gmail.com',
    'vinnycen@uw.edu',
    'ziyanfiroz14@gmail.com',
    'leebrian1239@gmail.com',
    'cjihoon1234@gmail.com',
    'sandollsiddiqu101@gmail.com',
    'jinsungkim2004@gmail.com',
    'lukashmoser@gmail.com',
    'tonitaiwo75@gmail.com',
    'johoriabhigyan@gmail.com',
    'simonfang2002@gmail.com',
    'verrill.ang@gmail.com',
    'vidvincentplus@gmail.com',
    'phillip.qiao@gmail.com',
    'qiqi187065145@gmail.com',
    'nima.motieifard@gmail.com',
    'dorothy.unicorn@gmail.com',
    'lee.dayshaun@gmail.com',
    'elachen0603@gmail.com',
    'kennethpamintuan2305@gmail.com',
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
