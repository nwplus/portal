import React, { useEffect } from 'react'
import { Route, Switch } from 'wouter'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import {
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/application/:part">{params => <ApplicationForm id={params.part} />}</Route>
          <Page>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/charcuterie">
              <Charcuterie />
            </Route>
            <Route path="/faq">
              <Faq />
            </Route>
            <Route path="/schedule">
              <Schedule />
            </Route>
            <Route path="/sponsors">
              <Sponsors />
            </Route>
            <Route path="/quicklinks">
              <Quicklinks />
            </Route>
            <Route path="/judging">
              <Judging />
            </Route>
            <Route path="/judging/view/:id">{params => <JudgingView id={params.id} />}</Route>
            <Route path="/submission">
              <Submission />
            </Route>
            <Route path="/submission/create">
              <SubmissionCreate />
            </Route>
            <Route path="/submission/edit">
              <SubmissionEdit />
            </Route>
            <Route>Page Not Found!</Route>
          </Page>
        </Switch>
      </ThemeProvider>
    </>
  )
}

export default App
