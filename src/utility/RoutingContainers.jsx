import { Redirect } from 'wouter'
import Form from '../components/ApplicationForm'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import { Application, ApplicationForm, Gallery, JudgingView, ProjectView } from '../pages'
import { useAuth } from './Auth'
import { APPLICATION_STATUS } from './Constants'
import { useHackerApplication } from './HackerApplicationContext'

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

const ApplicationDashboardRoutingContainer = () => {
  const { isAuthed } = useAuth()
  return isAuthed ? <Application /> : <Redirect to="~/login" />
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

const GalleryContainer = () => (
  <Page>
    <Gallery />
  </Page>
)

const ProjectViewContainer = ({ params }) => (
  <Page>
    <ProjectView pid={params.id} />
  </Page>
)

export {
  ApplicationDashboardRoutingContainer,
  ApplicationFormContainer,
  GalleryContainer,
  JudgingViewContainer,
  ProjectViewContainer,
}
