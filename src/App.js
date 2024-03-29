import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import Form from './components/ApplicationForm'
import Navbar from './components/Navbar'
import Page from './components/Page'
import {
  Application,
  ApplicationConfirmation,
  ApplicationForm,
  ApplicationReview,
  Charcuterie,
  // DiscordBot,
  Faq,
  Gallery,
  // GettingStarted,
  Home,
  Livestream,
  Judging,
  JudgingAdmin,
  JudgingView,
  Login,
  NotFound,
  ProjectView,
  Schedule,
  Sponsors,
  Submission,
} from './pages'
// import Area51 from './pages/Area51'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { AuthProvider, getRedirectUrl, useAuth } from './utility/Auth'
import { APPLICATION_STATUS, DB_COLLECTION, DB_HACKATHON, IS_DEVICE_IOS } from './utility/Constants'
import { HackerApplicationProvider, useHackerApplication } from './utility/HackerApplicationContext'
import { db, getAnnouncement, getLivesiteDoc } from './utility/firebase'
import notifications from './utility/notifications'
import AnnouncementToast from './components/AnnouncementToast'

const PageRoute = ({ path, children }) => {
  const [livesiteDoc, setLivesiteDoc] = useState(null)

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [])

  return (
    <Route path={path}>
      {livesiteDoc?.applicationsOpen ? <Redirect to="/application" /> : <Page>{children}</Page>}
    </Route>
  )
}

// Authenticate for only applicants that have been accepted
const AuthPageRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  if (!isAuthed) {
    return (
      <Route path={path}>
        <Redirect to="/login" />
      </Route>
    )
  }
  return (
    <Route path={path}>
      {user?.status === APPLICATION_STATUS.accepted ? (
        <Page>{children}</Page>
      ) : (
        <Redirect to="/application/closed" />
      )}
    </Route>
  )
}

const ApplicationInProgressRoute = ({ name, handleLogout, path, children, theme }) => {
  const { isAuthed, user, logout } = useAuth()
  return isAuthed ? (
    <Route path={path}>
      <Navbar
        name={name ? user.displayName : undefined}
        handleLogout={handleLogout ? logout : undefined}
      >
        {children}
      </Navbar>
    </Route>
  ) : (
    <Redirect to="/login" />
  )
}

const NoAuthRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  return (
    <Route path={path}>
      {!isAuthed ? <>{children}</> : <Redirect to={getRedirectUrl(user.redirect)} />}
    </Route>
  )
}

const AdminAuthPageRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  return (
    <Route path={path}>
      {isAuthed && user.admin ? <Page>{children}</Page> : <Redirect to="/login" />}
    </Route>
  )
}

/**Saves the application on logout */
const NavbarSaveOnLogout = ({ name, handleLogout }) => {
  const { forceSave } = useHackerApplication()
  const logout = async () => {
    await forceSave()
    handleLogout()
  }
  return <Navbar name={name} handleLogout={logout} />
}

const ApplicationFormContainer = ({ part }) => {
  const { isAuthed, user, logout } = useAuth()

  const { application } = useHackerApplication()

  return isAuthed && application.status.applicationStatus === APPLICATION_STATUS.inProgress ? (
    <>
      <NavbarSaveOnLogout name={user.displayName} handleLogout={logout} />
      <Form>
        <ApplicationForm part={part} />
      </Form>
    </>
  ) : (
    <Redirect to="/login" />
  )
}

const JudgingViewContainer = ({ params }) => {
  const { isAuthed } = useAuth()
  return isAuthed ? (
    <Page>
      <JudgingView id={params.id} />
    </Page>
  ) : (
    <Redirect to="/login" />
  )
}

const GalleryContainer = ({ params }) => (
  <Page>
    <Gallery />
  </Page>
)
const ProjectViewContainer = ({ params }) => (
  <Page>
    <ProjectView pid={params.id} />
  </Page>
)

const ApplicationDashboardRoutingContainer = () => {
  const { isAuthed } = useAuth()
  return isAuthed ? <Application /> : <Redirect to="/login" />
}

function App() {
  // const [announcements, setAnnouncements] = useState([])
  const [announcementText, setAnnouncementText] = useState('')

  const notifyUser = async announcementId => {
    // grab announcement from firebase to check if removed, if doesn't exist anymore don't send
    const announcement = await getAnnouncement(announcementId)
    if (!announcement) return
    // only notify user if announcement is scheduled within last 5 secs
    const isRecent = new Date() - new Date(announcement.announcementTime) < 5000
    if (isRecent) {
      // don't notify users on IOS devices because Notification API incompatible
      if (!IS_DEVICE_IOS && notifications.areEnabled()) {
        notifications.trigger('New Announcement', announcement.content)
      }
      setAnnouncementText(announcement.content)
    }
  }

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Announcements')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        // firebase doc that triggered db change event
        const docChanges = querySnapshot.docChanges()
        const changedDoc = docChanges[0]
        const id = changedDoc?.doc.id
        const announcement = changedDoc?.doc.data()
        // don't want to notify on 'remove' + 'modified' db events
        if (changedDoc?.type === 'added') {
          if (announcement.type === 'immediate') {
            notifyUser(id)
          } else if (announcement.type === 'scheduled') {
            setTimeout(() => notifyUser(id), new Date(announcement.announcementTime) - new Date())
          }
        }
      })
    return unsubscribe
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyle />
        <AnnouncementToast text={announcementText} />
        <Switch>
          <PageRoute path="/">
            <Home />
          </PageRoute>
          <PageRoute path="/charcuterie">
            <Charcuterie />
          </PageRoute>
          <PageRoute path="/faq">
            <Faq />
          </PageRoute>
          <PageRoute path="/schedule">
            <Schedule />
          </PageRoute>
          <PageRoute path="/livestream">
            <Livestream />
          </PageRoute>
          <PageRoute path="/sponsors">
            <Sponsors />
          </PageRoute>
          {/* <PageRoute path="/getting-started">
            <GettingStarted />
          </PageRoute> */}
          {/* <PageRoute path="/discord-bot">
            <DiscordBot />
          </PageRoute> */}
          <NoAuthRoute path="/login">
            <Navbar>
              <Login />
            </Navbar>
          </NoAuthRoute>
          <AuthPageRoute path="/judging">
            <Judging />
          </AuthPageRoute>
          <AdminAuthPageRoute path="/judging/admin">
            <JudgingAdmin />
          </AdminAuthPageRoute>
          {/* <AdminAuthPageRoute path="/area51">
            <Area51 />
          </AdminAuthPageRoute> */}
          <Route path="/judging/view/:id" component={JudgingViewContainer} />
          <Route path="/projects" component={GalleryContainer} />
          <Route path="/projects/:id" component={ProjectViewContainer} />
          <AuthPageRoute path="/submission">
            <Submission />
          </AuthPageRoute>
          <HackerApplicationProvider>
            <Switch>
              <Route path="/application" component={ApplicationDashboardRoutingContainer} />
              <ApplicationInProgressRoute path="/application/review" name handleLogout>
                <ApplicationReview />
              </ApplicationInProgressRoute>
              <ApplicationInProgressRoute path="/application/confirmation" handleLogout>
                <ApplicationConfirmation />
              </ApplicationInProgressRoute>
              <Route path="/application/:part" handleLogout>
                {params => <ApplicationFormContainer part={params.part} />}
              </Route>
            </Switch>
          </HackerApplicationProvider>
          <Route path="/:rest*">
            <NotFound />
          </Route>
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
