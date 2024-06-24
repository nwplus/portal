import { useEffect, useState } from 'react'
import { Route, Redirect } from 'wouter'
import { getLivesiteDoc } from './firebase'
import Page from '../components/Page'
import { useAuth, getRedirectUrl } from './Auth'
import { APPLICATION_STATUS } from './Constants'
import Navbar from '../components/Navbar'
import { useHackathon } from './HackathonProvider'

export const PageRoute = ({ path, children }) => {
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

export const AuthPageRoute = ({ path, children }) => {
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

export const ApplicationInProgressRoute = ({ name, handleLogout, path, children }) => {
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

export const NoAuthRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()
  const { activeHackathon } = useHackathon()

  return (
    <Route path={path}>
      {!isAuthed ? children : <Redirect to={getRedirectUrl(user.redirect, activeHackathon)} />}
    </Route>
  )
}

export const AdminAuthPageRoute = ({ path, children }) => {
  const { isAuthed, user } = useAuth()

  if (!isAuthed) {
    return <Redirect to="~/login" />
  }

  return <Route path={path}>{user.admin ? <Page>{children}</Page> : <Redirect to="~/404" />}</Route>
}
