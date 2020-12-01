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

const NavbarRoute = ({ path, children }) => {
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
          <Route path="/login">
            <Navbar />
            <Login />
          </Route>
          <NavbarRoute path="/application/review">
            <ApplicationReview />
          </NavbarRoute>
          <NavbarRoute path="/application/confirmation" handleLogout={() => console.log('Logout!')}>
            <ApplicationConfirmation />
          </NavbarRoute>
          <NavbarRoute path="/application/:part">
            {params => <ApplicationForm part={params.part} />}
          </NavbarRoute>
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
          <PageRoute path="/judging/view/:id">{params => <JudgingView id={params.id} />}</PageRoute>
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
