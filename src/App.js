import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import Navbar from './components/Navbar'
import Form from './components/ApplicationForm'
import {
  NotFound,
  Login,
  Charcuterie,
  Home,
  Faq,
  Sponsors,
  Quicklinks,
  Schedule,
  Judging,
  JudgingAdmin,
  JudgingView,
  Submission,
  ApplicationForm,
  ApplicationReview,
  ApplicationConfirmation,
  Application,
} from './pages'
import Page from './components/Page'
import { db } from './utility/firebase'
import {
  APPLICATION_STATUS,
  DB_COLLECTION,
  DB_HACKATHON,
  IS_DEVICE_IOS,
  ONLY_APPLICATION,
} from './utility/Constants'
import notifications from './utility/notifications'
import { AuthProvider, getRedirectUrl, useAuth } from './utility/Auth'
import { HackerApplicationProvider, useHackerApplication } from './utility/HackerApplicationContext'

// only notify user if announcement was created within last 5 secs
const notifyUser = announcement => {
  const isRecent = new Date() - new Date(announcement.timestamp) < 5000
  if (isRecent && notifications.areEnabled()) {
    notifications.trigger('New Announcement', announcement.content)
  }
}

const PageRoute = ({ path, children }) => {
  return (
    <Route path={path}>
      {ONLY_APPLICATION ? <Redirect to="/application" /> : <Page>{children}</Page>}
    </Route>
  )
}

const AuthPageRoute = ({ path, children }) => {
  const { isAuthed } = useAuth()
  return <Route path={path}>{isAuthed ? <Page>{children}</Page> : <Redirect to="/login" />}</Route>
}

const ApplicationInProgressRoute = ({ name, handleLogout, path, children, theme }) => {
  const { isAuthed, user, logout } = useAuth()
  return isAuthed ? (
    <Route path={path}>
      <HackerApplicationProvider>
        <ApplicationInProgressContentContainer>
          <Navbar
            name={name ? user.displayName : undefined}
            handleLogout={handleLogout ? logout : undefined}
          >
            {children}
          </Navbar>
        </ApplicationInProgressContentContainer>
      </HackerApplicationProvider>
    </Route>
  ) : (
    <Redirect to="/login" />
  )
}

const ApplicationInProgressContentContainer = ({ children }) => {
  const {
    application: {
      status: { applicationStatus },
    },
  } = useHackerApplication()

  return applicationStatus === APPLICATION_STATUS.inProgress ? (
    <>{children}</>
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
  const {
    application: {
      status: { applicationStatus },
    },
  } = useHackerApplication()

  return isAuthed && applicationStatus === APPLICATION_STATUS.inProgress ? (
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

const ApplicationDashboardRoutingContainer = () => {
  const { isAuthed } = useAuth()
  return isAuthed ? (
    <HackerApplicationProvider>
      <Application />
    </HackerApplicationProvider>
  ) : (
    <Redirect to="/login" />
  )
}

function App() {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Announcements')
      .orderBy('timestamp', 'desc')
      .limit(6)
      .onSnapshot(querySnapshot => {
        setAnnouncements(Object.values(querySnapshot.docs.map(doc => doc.data())))
        // firebase doc that triggered db change event
        const changedDoc = querySnapshot.docChanges()[0]

        // don't want to notify on 'remove' + 'modified' db events
        if (changedDoc && changedDoc.type === 'added') {
          // don't notify users on IOS devices because Notification API incompatible
          if (!IS_DEVICE_IOS) {
            notifyUser(changedDoc.doc.data())
          }
        }
      })
    return unsubscribe
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyle />
        <Switch>
          <PageRoute path="/">
            <Home announcements={announcements} />
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
          <PageRoute path="/sponsors">
            <Sponsors />
          </PageRoute>
          <PageRoute path="/quicklinks">
            <Quicklinks />
          </PageRoute>
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
          <Route path="/judging/view/:id" component={JudgingViewContainer} />
          <AuthPageRoute path="/submission">
            <Submission />
          </AuthPageRoute>
          <Route path="/application" component={ApplicationDashboardRoutingContainer} />
          <ApplicationInProgressRoute path="/application/review" name handleLogout>
            <ApplicationReview />
          </ApplicationInProgressRoute>
          <ApplicationInProgressRoute path="/application/confirmation" handleLogout>
            <ApplicationConfirmation />
          </ApplicationInProgressRoute>
          <Route path="/application/:part">
            {params => (
              <HackerApplicationProvider>
                <ApplicationFormContainer part={params.part} />
              </HackerApplicationProvider>
            )}
          </Route>
          <Route path="/:rest*">
            <NotFound />
          </Route>
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
