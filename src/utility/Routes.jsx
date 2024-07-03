import { useEffect, useState } from 'react'
import { Route, Router, Redirect, useRouter, useLocation } from 'wouter'
import { getLivesiteDoc } from './firebase'
import Page from '../components/Page'
import { useAuth, getRedirectUrl } from './Auth'
import { APPLICATION_STATUS, VALID_HACKATHONS } from './Constants'
import Navbar from '../components/Navbar'
import { useHackathon } from './HackathonProvider'

const NestedRoutes = props => {
  const router = useRouter()
  const [location] = useLocation()
  const { activeHackathon, setActiveHackathon } = useHackathon()
  const hackathonFromURL = props.base.split('/')[2].toLowerCase()

  useEffect(() => {
    if (VALID_HACKATHONS.includes(hackathonFromURL) && hackathonFromURL !== activeHackathon) {
      setActiveHackathon(hackathonFromURL)
    }
  }, [props.base, activeHackathon, setActiveHackathon])

  if (!location.startsWith(props.base)) return null

  if (!VALID_HACKATHONS.includes(hackathonFromURL)) {
    return <Redirect to="~/404" />
  }

  return (
    <Router base={props.base} key={props.base} parent={router}>
      {props.children}
    </Router>
  )
}

const PageRoute = ({ path, children }) => {
  const [livesiteDoc, setLivesiteDoc] = useState(null)

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [])

  if (livesiteDoc === null) {
    return null
  }

  return (
    <Route path={path}>
      {livesiteDoc.applicationsOpen ? <Redirect to="/application" /> : <Page>{children}</Page>}
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
      {user?.status === APPLICATION_STATUS.accepted ? (
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

  return <Route path={path}>{user.admin ? <Page>{children}</Page> : <Redirect to="~/404" />}</Route>
}

export {
  NestedRoutes,
  PageRoute,
  AuthPageRoute,
  ApplicationInProgressRoute,
  NoAuthRoute,
  AdminAuthPageRoute,
}
