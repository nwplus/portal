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
import { DB_COLLECTION, DB_HACKATHON, IS_DEVICE_IOS } from './utility/Constants'
import notifications from './utility/notifications'
import { AuthProvider, getRedirectUrl, useAuth } from './utility/Auth'
import { HackerApplicationProvider } from './utility/HackerApplicationContext'

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
      <Page>{children}</Page>
    </Route>
  )
}

const AuthPageRoute = ({ path, children }) => {
  const { isAuthed } = useAuth()
  return <Route path={path}>{isAuthed ? <Page>{children}</Page> : <Redirect to="/login" />}</Route>
}

const NavbarAuthRoute = ({ name, handleLogout, path, children }) => {
  const { isAuthed, user, logout } = useAuth()
  return isAuthed ? (
    <Route path={path}>
      <Navbar
        name={name ? user.displayName : undefined}
        handleLogout={handleLogout ? logout : undefined}
      >
        {name && handleLogout ? <Form>{children}</Form> : children}
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

const ApplicationFormContainer = ({ params }) => {
  const { isAuthed, user, logout } = useAuth()
  return isAuthed ? (
    <HackerApplicationProvider>
      <Navbar name={user.displayName} handleLogout={logout} />
      <Form>
        <ApplicationForm part={params.part} />
      </Form>
    </HackerApplicationProvider>
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

function App() {
  const [announcements, setAnnouncements] = useState([])

  // TODO create reusable Announcements firebase ref in firebase.js to avoid redundant fb calls in Announcements.js
  useEffect(() => {
    // don't notify users on IOS devices because Notification API incompatible
    if (!IS_DEVICE_IOS) {
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
            notifyUser(changedDoc.doc.data())
          }
        })

      return unsubscribe
    }
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
          <AuthPageRoute path="/application">
            <HackerApplicationProvider>
              <Application />
            </HackerApplicationProvider>
          </AuthPageRoute>
          <NavbarAuthRoute path="/application/review" name handleLogout>
            <HackerApplicationProvider>
              <ApplicationReview />
            </HackerApplicationProvider>
          </NavbarAuthRoute>
          <NavbarAuthRoute path="/application/confirmation" handleLogout>
            <HackerApplicationProvider>
              <ApplicationConfirmation />
            </HackerApplicationProvider>
          </NavbarAuthRoute>
          <Route path="/application/:part" component={ApplicationFormContainer} />
          <Route path="/:rest*">
            <NotFound />
          </Route>
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
