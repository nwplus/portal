import React, { useEffect } from 'react'
import { Route, Switch } from 'wouter'
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

const NavbarRoute = ({ path, children, name, handleLogout }) => {
  return (
    <Route path={path}>
      <Navbar name={name} handleLogout={handleLogout}>
        <Form>{children}</Form>
      </Navbar>
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
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Switch>
          <NavbarRoute path="/login">
            <Login />
          </NavbarRoute>
          <NavbarRoute
            name="Haku"
            handleLogout={() => console.log('Logout')}
            path="/application/review"
          >
            <ApplicationReview />
          </NavbarRoute>
          <NavbarRoute handleLogout={() => console.log('Logout')} path="/application/confirmation">
            <ApplicationConfirmation />
          </NavbarRoute>
          <Route path="/application/:part">
            {params => (
              <Navbar name="Haku" handleLogout={() => console.log('Logout')}>
                <ApplicationForm part={params.part} />
              </Navbar>
            )}
          </Route>
          <PageRoute path="/">
            <Home />
          </PageRoute>
          <PageRoute path="/application">
            <Application />
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
          <PageRoute path="/judging">
            <Judging />
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
    </>
  )
}

export default App
