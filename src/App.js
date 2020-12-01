import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import Navbar from './components/Navbar'
import Form from './components/ApplicationForm'
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
import { AuthProvider, logout, useAuth } from './utility/Auth'

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

const NavbarRoute = ({ name, handleLogout, path, children }) => {
  const { isAuthed, user } = useAuth()
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

const AuthNav = ({ children }) => {
  const { isAuthed, user } = useAuth()
  return isAuthed ? (
    <Navbar name={user.displayName} handleLogout={logout}>
      <Form>{children}</Form>
    </Navbar>
  ) : (
    <Redirect to="/login" />
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
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Switch>
          <NavbarRoute path="/login">
            <Login />
          </NavbarRoute>
          <NavbarRoute name handleLogout path="/application/review">
            <ApplicationReview />
          </NavbarRoute>
          <NavbarRoute handleLogout path="/application/confirmation">
            <ApplicationConfirmation />
          </NavbarRoute>
          <NavbarRoute handleLogout path="/application/confirmation">
            <ApplicationConfirmation />
          </NavbarRoute>
          <Route path="/application/:part">
            {params => (
              <AuthNav>
                <ApplicationForm part={params.part} />
              </AuthNav>
            )}
          </Route>
          <PageRoute path="/">
            <Home />
          </PageRoute>
          <AuthPageRoute path="/application">
            <Application />
          </AuthPageRoute>
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
          <PageRoute path="/judging">
            <Judging />
          </PageRoute>
          <PageRoute path="/judging/admin">
            <JudgingAdmin />
          </PageRoute>
          <Route path="/judging/view/:id">
            {params => (
              <Page>
                <JudgingView id={params.id} />
              </Page>
            )}
          </Route>
          <PageRoute path="/submission">
            <Submission />
          </PageRoute>
          <PageRoute path="/submission/create">
            <SubmissionCreate />
          </PageRoute>
          <PageRoute path="/submission/edit">
            <SubmissionEdit />
          </PageRoute>
          <Route>
            <Page>Page Not Found!</Page>
          </Route>
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
