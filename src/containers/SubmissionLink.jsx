// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Form from '../components/Judging/SubmissionForm'
import { APPLICATION_STATUS } from '../utility/Constants'
import { projectsRef, applicantsRef, createProject, updateProject } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'

// Redirect for successful submissions + leaving of project
const REDIRECT_TIMEOUT = 3000

const SubmissionLink = ({ user, refreshCallback }) => {
  const [project, setProject] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [userData, setUserData] = useState({})
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    const getProject = async () => {
      const userDoc = await applicantsRef(dbHackathonName).doc(user.uid).get()
      if (!userDoc.exists) {
        return
      }
      const userData = userDoc.data()
      const projectId = userData.submittedProject
      if (projectId) {
        const projectDoc = await projectsRef(dbHackathonName).doc(projectId).get()
        if (projectDoc.exists) {
          setProject({ ...projectDoc.data(), uid: projectDoc.id })
        } else {
          await applicantsRef(dbHackathonName).doc(user.uid).update({
            submittedProject: '',
          })
        }
      } else {
        let autoFill = [
          {
            name: userData.basicInfo.preferredName,
            email: userData.basicInfo.email,
          },
        ]
        setProject({ teamMembers: autoFill })
      }
      setUserData(userData)
    }
    getProject()
  }, [user.uid, dbHackathonName])

  const submit = async projectSubmission => {
    if (isSubmitting) {
      return
    }
    setError(null)
    setSubmitting(true)
    const projectId = projectSubmission.uid
    delete projectSubmission.uid
    if (projectId) {
      try {
        // TODO: Determine teamMembers diff - add new members and remove old ones

        let validMembers = [] // Array to hold validated members
        let error = null

        // Update the submittedProject for each user
        await Promise.all(
          projectSubmission.teamMembers.map(async member => {
            const res = await applicantsRef(dbHackathonName)
              .where('basicInfo.email', '==', member.email)
              .get()
            if (res.docs.length > 0) {
              const userData = res.docs[0].data()
              const { applicationStatus, attending, responded } = userData.status
              // Check that the person is an accepted hacker

              if (applicationStatus !== APPLICATION_STATUS.accepted || !attending || !responded) {
                error = new Error(member.email + ' is not a registered hacker.')
                // Check that the hacker isn't already associated with another project
              } else if (userData.submittedProject && userData.submittedProject !== projectId) {
                error = new Error(
                  member.email + ' is already part of a different project submission.'
                )
              } else {
                validMembers.push(member)
                return await applicantsRef(dbHackathonName)
                  .doc(res.docs[0].id)
                  .update({ submittedProject: projectId })
              }
            } else {
              error = new Error(member.email + ' is not a registered hacker.')
            }
          })
        )

        // If there are no errors, update project with new information
        if (!error) {
          await updateProject(
            user.email,
            projectId,
            {
              ...projectSubmission,
              teamMembers: validMembers,
            },
            dbHackathonName
          )
          setSuccessMsg('Successfully saved project - redirecting soon!')
          setTimeout(() => window.location.reload(), REDIRECT_TIMEOUT)
        } else {
          setError(error)
        }
      } catch (err) {
        setError(err)
      }
    } else {
      // Project does not exist, make a new one
      try {
        // TODO: Determine teamMembers diff - add new members and remove old ones

        let validMembers = [] // Array to hold validated members
        let error = null

        // Update the submittedProject for each user
        await Promise.all(
          projectSubmission.teamMembers.map(async member => {
            const res = await applicantsRef(dbHackathonName)
              .where('basicInfo.email', '==', member.email)
              .get()
            if (res.docs.length > 0) {
              const userData = res.docs[0].data()
              const { applicationStatus, attending, responded } = userData.status
              // Check that the person is an accepted hacker
              if (applicationStatus !== APPLICATION_STATUS.accepted || !attending || !responded) {
                error = new Error(member.email + ' is not a registered hacker.')
                // Check that the hacker isn't already associated with another project
              } else if (userData.submittedProject) {
                error = new Error(
                  member.email + ' is already part of a different project submission.'
                )
              } else {
                validMembers.push({
                  ...member,
                  id: res.docs[0].id,
                })
              }
            } else {
              error = new Error(member.email + ' is not a registered hacker.')
            }
          })
        )

        // If there are no errors, create a new project with new information (and only valid members)
        if (!error) {
          const project = await createProject(
            user.email,
            {
              ...projectSubmission,
              teamMembers: validMembers,
              countAssigned: 0,
            },
            dbHackathonName
          )
          validMembers.forEach(async member => {
            await applicantsRef(dbHackathonName)
              .doc(member.id)
              .update({ submittedProject: project.id })
          })
          setSuccessMsg('Successfully saved project - redirecting soon!')
          setTimeout(() => window.location.reload(), REDIRECT_TIMEOUT)
        } else {
          setError(error)
        }
      } catch (err) {
        setError(err)
      }
    }
    setSubmitting(false)
  }

  // just need to actually write the logic and we are done!
  const leaveProject = async () => {
    if (isLeaving) return
    if (!project.uid) return //user does not have a project yet

    setIsLeaving(true)

    if (project.teamMembers.length === 1) {
      // current member is the last team member on the project
      await projectsRef(dbHackathonName).doc(project.uid).delete()
    } else {
      // remove current member from the project
      const updatedTeamMember = project.teamMembers.filter(
        teamMember => teamMember.email !== user.email
      )
      await projectsRef(dbHackathonName).doc(project.uid).update({ teamMembers: updatedTeamMember })
    }

    await applicantsRef(dbHackathonName).doc(user.uid).update({
      submittedProject: '',
    })
    setIsLeaving(false)
    setSuccessMsg('Successfully left project - redirecting soon!')
    setTimeout(() => window.location.reload(), REDIRECT_TIMEOUT)
  }

  return (
    <Form
      project={project}
      onSubmit={submit}
      isSubmitting={isSubmitting}
      onLeave={leaveProject}
      isLeaving={isLeaving}
      userData={userData}
      error={error}
      successMsg={successMsg}
    />
  )
}

export default SubmissionLink
