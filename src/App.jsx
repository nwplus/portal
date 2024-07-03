import React, { useEffect, useState } from 'react'
import { Link, Redirect, Route, Switch, useLocation } from 'wouter'
import AnnouncementToast from './components/AnnouncementToast'
import { A } from './components/Typography'
import Landing from './containers/Landing'
import {
  ApplicationConfirmation,
  ApplicationReview,
  Charcuterie,
  Faq,
  Home,
  Judging,
  JudgingAdmin,
  Livestream,
  Login,
  NotFound,
  Schedule,
  Sponsors,
  Submission,
} from './pages'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { AuthProvider } from './utility/Auth'
import { DB_COLLECTION, DB_HACKATHON, IS_DEVICE_IOS } from './utility/Constants'
import HackathonProvider from './utility/HackathonProvider'
import { HackerApplicationProvider } from './utility/HackerApplicationContext'
import {
  AdminAuthPageRoute,
  ApplicationInProgressRoute,
  AuthPageRoute,
  NestedRoutes,
  NoAuthRoute,
  PageRoute,
} from './utility/Routes'
import {
  ApplicationDashboardRoutingContainer,
  ApplicationFormContainer,
  GalleryContainer,
  JudgingViewContainer,
  ProjectViewContainer,
} from './utility/RoutingContainers'
import { db, getAnnouncement } from './utility/firebase'
import notifications from './utility/notifications'

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
    <HackathonProvider>
      <ThemeProvider>
        <GlobalStyle />
        <AuthProvider>
          <AnnouncementToast text={announcementText} />
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