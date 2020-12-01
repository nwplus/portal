import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import Navbar from './components/Navbar'

import {
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
  SubmissionCreate,
  SubmissionEdit,
  ApplicationForm,
  ApplicationReview,
  ApplicationConfirmation,
  Application,
} from './pages'
import Page from './components/Page'
import { db } from './utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from './utility/Constants'
import notifications from './utility/notifications'
import { AuthProvider, getRedirectUrl, logout, useAuth } from './utility/Auth'

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

const NavbarAuthRoute = ({ path, children }) => {
  // TODO: pass in name and handleLogout function into NavBar component
  const { isAuthed, user } = useAuth()
  return isAuthed ? (
    <Route path={path}>
      <Navbar name={user.displayName} handleLogout={logout} />
      {children}
    </Route>
  ) : (
      <Redirect to="/login" />
    )
}

const NoAuthRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  return (
    <Route path={path}>
      {!isAuthed ? <>{children}</> : <Redirect to={getRedirectUrl(user.status)} />}
    </Route>
  )
}

function App() {
  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Announcements')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        // firebase doc that triggered db change event
        const changedDoc = querySnapshot.docChanges()[0]

        // don't want to notify on 'remove' + 'modified' db events
        if (changedDoc && changedDoc.type === 'added') {
          notifyUser(changedDoc.doc.data())
        }
      })
    return unsubscribe
  }, [])

  return (
    <ThemeProvider>
      <GlobalStyle />
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
        <PageRoute path="/sponsors">
          <Sponsors />
        </PageRoute>
        <PageRoute path="/quicklinks">
          <Quicklinks />
        </PageRoute>
        <Route>
          {' '}
          {/* All auth related routes should go here */}
          <AuthProvider>
            <NoAuthRoute path="/login">
              <Navbar />
              <Login />
            </NoAuthRoute>
            <AuthPageRoute path="/application">
              <Application />
            </AuthPageRoute>
            <NavbarAuthRoute path="/application/review">
              <ApplicationReview />
            </NavbarAuthRoute>
            <NavbarAuthRoute
              path="/application/confirmation"
              handleLogout={() => console.log('Logout!')}
            >
              <ApplicationConfirmation />
            </NavbarAuthRoute>
            <NavbarAuthRoute path="/application/:part">
              {params => <ApplicationForm part={params.part} />}
            </NavbarAuthRoute>
            <AuthPageRoute path="/judging">
              <Judging />
            </AuthPageRoute>
          <PageRoute path="/judging/admin">
            <JudgingAdmin />
          </PageRoute>
            <AuthPageRoute path="/judging/view/:id">
              {params => <JudgingView id={params.id} />}
            </AuthPageRoute>
            <AuthPageRoute path="/submission">
              <Submission />
            </AuthPageRoute>
            <AuthPageRoute path="/submission/create">
              <SubmissionCreate />
            </AuthPageRoute>
            <AuthPageRoute path="/submission/edit">
              <SubmissionEdit />
            </AuthPageRoute>
          </AuthProvider>
          <Route path="/:rest">
            <Page>Page Not Found!</Page>
          </Route>
        </Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App
