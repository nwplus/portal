import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'wouter'
import AnnouncementToast from './components/AnnouncementToast'
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
  Rewards,
  Social,
} from './pages'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { AuthProvider } from './utility/Auth'
import { DB_COLLECTION, IS_DEVICE_IOS } from './utility/Constants'
import { useHackathon } from './utility/HackathonProvider'
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
import Loading from './components/Loading'
import HackathonSelection from './pages/HackathonSelection'

function App() {
  const [announcementText, setAnnouncementText] = useState('')
  const [location] = useLocation()
  const { activeHackathon, dbHackathonName } = useHackathon()

  useEffect(() => {
    if (location === '/') {
      document.title = 'Hacker Portal'
    }
  }, [location])

  const notifyUser = async announcementId => {
    // grab announcement from firebase to check if removed, if doesn't exist anymore don't send
    const announcement = await getAnnouncement(announcementId, dbHackathonName)
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
      .doc(dbHackathonName)
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
  }, [dbHackathonName])

  if (!activeHackathon) {
    return <Loading />
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AuthProvider>
        {/* <AnnouncementToast text={announcementText} /> */}
        <Switch>
          <Route path="/">
            <HackathonSelection />
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
                  <PageRoute path="/rewards">
                    <Rewards />
                  </PageRoute>
                  <PageRoute path="/sponsors">
                    <Sponsors />
                  </PageRoute>
                  <PageRoute path="/social/:userId?">
                    {params => <Social params={params} />}
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
                      <Route path="/application" component={ApplicationDashboardRoutingContainer} />
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
  )
}

export default App
