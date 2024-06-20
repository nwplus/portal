import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation, useRouter, Router, Link } from 'wouter'
import Form from './components/ApplicationForm'
import Navbar from './components/Navbar'
import Page from './components/Page'
import {
  Application,
  ApplicationConfirmation,
  ApplicationForm,
  ApplicationReview,
  Charcuterie,
  Faq,
  Gallery,
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
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { AuthProvider, getRedirectUrl, useAuth } from './utility/Auth'
import {
  APPLICATION_STATUS,
  DB_COLLECTION,
  DB_HACKATHON,
  IS_DEVICE_IOS,
  VALID_HACKATHONS,
} from './utility/Constants'
import { HackerApplicationProvider, useHackerApplication } from './utility/HackerApplicationContext'
import { db, getAnnouncement, getLivesiteDoc } from './utility/firebase'
import notifications from './utility/notifications'
import AnnouncementToast from './components/AnnouncementToast'
import HackathonProvider, { useHackathon } from './utility/HackathonProvider'
import Landing from './containers/Landing'
import { A } from './components/Typography'

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

const AuthPageRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  if (!isAuthed) {
    return (
      <Route path={path}>
        <Redirect to="~/login" />
      </Route>
    )
  }
  return (
    <Route path={path}>
      {user?.status !== APPLICATION_STATUS.accepted ? (
        <Page>{children}</Page>
      ) : (
        <Redirect to="/application/closed" />
      )}
    </Route>
  )
}

const ApplicationInProgressRoute = ({ name, handleLogout, path, children }) => {
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
    <Redirect to="~/login" />
  )
}

const NoAuthRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  const { activeHackathon } = useHackathon()

  return (
    <Route path={path}>
      {!isAuthed ? children : <Redirect to={getRedirectUrl(user.redirect, activeHackathon)} />}
    </Route>
  )
}

const AdminAuthPageRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()

  if (!isAuthed) {
    return <Redirect to="~/login" />
  }

  return <Route path={path}>{user.admin ? <Page>{children}</Page> : <Redirect to="/" />}</Route>
}

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
    <Redirect to="~/login" />
  )
}

const JudgingViewContainer = ({ params }) => {
  const { isAuthed } = useAuth()
  return isAuthed ? (
    <Page>
      <JudgingView id={params.id} />
    </Page>
  ) : (
    <Redirect to="~/login" />
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
  return isAuthed ? <Application /> : <Redirect to="~/login" />
}

const NestedRoutes = props => {
  const router = useRouter()
  const [location] = useLocation()
  const { activeHackathon, setActiveHackathon } = useHackathon()
  const hackathonFromRoute = props.base.split('/')[2].toLowerCase()

  useEffect(() => {
    if (VALID_HACKATHONS.includes(hackathonFromRoute) && hackathonFromRoute !== activeHackathon) {
      setActiveHackathon(hackathonFromRoute)
    }
  }, [props.base, activeHackathon, setActiveHackathon])

  if (!location.startsWith(props.base)) return null

  if (!VALID_HACKATHONS.includes(hackathonFromRoute)) {
    return <Redirect to="/404" />
  }

  return (
    <Router base={props.base} key={props.base} parent={router}>
      {props.children}
    </Router>
  )
}

function App() {
  const [announcementText, setAnnouncementText] = useState('')
  const [location] = useLocation()

  useEffect(() => {
    if (location === '/') {
      localStorage.removeItem('activeHackathon')
      document.title = 'Hacker Portal'
    }
  }, [location])

  const notifyUser = async announcementId => {
    const announcement = await getAnnouncement(announcementId)
    if (!announcement) return
    const isRecent = new Date() - new Date(announcement.announcementTime) < 5000
    if (isRecent) {
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
        const docChanges = querySnapshot.docChanges()
        const changedDoc = docChanges[0]
        const id = changedDoc?.doc.id
        const announcement = changedDoc?.doc.data()
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
    <HackathonProvider>
      <ThemeProvider>
        <GlobalStyle />
        <AuthProvider>
          <Switch>
            <Route path="/">
              <Landing>
                <Link href="/app/hackcamp">
                  <A>Hackcamp</A>
                </Link>
                <br />
                <Link href="/app/nwhacks">
                  <A>nwHacks</A>
                </Link>
                <br />
                <Link href="/app/cmd-f">
                  <A>cmd-f</A>
                </Link>
              </Landing>
            </Route>
            <NoAuthRoute path="/login">
              <Login />
            </NoAuthRoute>
            <Route path="/app/:hackathon/:any*">
              {params => (
                <NestedRoutes base={`/app/${params.hackathon}`}>
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

                    <AuthPageRoute path="/judging">
                      <Judging />
                    </AuthPageRoute>

                    <AdminAuthPageRoute path="/judging/admin">
                      <JudgingAdmin />
                    </AdminAuthPageRoute>

                    <Route path="/judging/view/:id" component={JudgingViewContainer} />
                    <Route path="/projects" component={GalleryContainer} />
                    <Route path="/projects/:id" component={ProjectViewContainer} />

                    <AuthPageRoute path="/submission">
                      <Submission />
                    </AuthPageRoute>

                    <HackerApplicationProvider>
                      <Switch>
                        <Route
                          path="/application"
                          component={ApplicationDashboardRoutingContainer}
                        />
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

                    <Route>
                      <Redirect to="~/404" />
                    </Route>
                  </Switch>
                </NestedRoutes>
              )}
            </Route>
            <Route path="/404">
              <NotFound />
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </HackathonProvider>
  )
}

export default App

// <Hacker app provider routes></Hacker>

// {/* <PageRoute path="/getting-started">
// <GettingStarted />
// </PageRoute> */}
// {/* <PageRoute path="/discord-bot">
// <DiscordBot />
// </PageRoute> */}
// {/* <AdminAuthPageRoute path="/area51">
// <Area51 />
// </AdminAuthPageRoute> */}
// {
//   /* <AnnouncementToast text={announcementText} /> */
// }
