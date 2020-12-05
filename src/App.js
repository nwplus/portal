import React, { useEffect } from 'react'
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

/**Saves the application on logout */
const NavbarSaveOnLogout = ({ name, handleLogout }) => {
  const { forceSave } = useHackerApplication()
  const logout = async () => {
    await forceSave()
    handleLogout()
  }
  return <Navbar name={name} handleLogout={logout} />
}

const ApplicationFormContainer = ({ params }) => {
  const { isAuthed, user, logout } = useAuth()
  return isAuthed ? (
    <HackerApplicationProvider>
      <NavbarSaveOnLogout name={user.displayName} handleLogout={logout} />
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
      <AuthProvider>
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
          <AuthPageRoute path="/submission/create">
            <SubmissionCreate />
          </AuthPageRoute>
          <AuthPageRoute path="/submission/edit">
            <SubmissionEdit />
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
