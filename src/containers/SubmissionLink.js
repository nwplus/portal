// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Form from '../components/Judging/SubmissionForm'
import { projectsRef, applicantsRef, createProject, updateProject } from '../utility/firebase'

export default ({ user, refreshCallback }) => {
  const [project, setProject] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getProject = async () => {
      const userDoc = await applicantsRef.doc(user.uid).get()
      if (!userDoc.exists) {
        return
      }
      const userData = userDoc.data()
      const projectId = userData.submittedProject
      if (projectId) {
        const projectDoc = await projectsRef.doc(projectId).get()
        if (projectDoc.exists) {
          setProject({ ...projectDoc.data(), uid: projectDoc.id })
        } else {
          await applicantsRef.doc(user.uid).update({
            submittedProject: '',
          })
        }
      } else {
        let autoFill = [
          {
            name: userData.basicInfo.firstName + ' ' + userData.basicInfo.lastName,
            email: userData.basicInfo.email,
          },
        ]
        setProject({ teamMembers: autoFill })
      }
      setUserData(userData)
    }
    getProject()
  }, [user.uid])

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
            const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
            if (res.docs.length > 0) {
              const userData = res.docs[0].data()
              const { applicationStatus, attending, responded } = userData.status
              // Check that the person is an accepted hacker
              if (applicationStatus !== 'accepted' || !attending || !responded) {
                error = new Error(member.email + ' is not a valid hacker.')
                // Check that the hacker isn't already associated with another project
              } else if (userData.submittedProject && userData.submittedProject !== projectId) {
                error = new Error(
                  member.email + ' is already part of a different project submission.'
                )
              } else {
                validMembers.push(member)
                return await applicantsRef
                  .doc(res.docs[0].id)
                  .update({ submittedProject: projectId })
              }
            } else {
              error = new Error(member.email + ' is not a valid hacker.')
            }
          })
        )

        // If there are no errors, update project with new information
        if (!error) {
          await updateProject(user.email, projectId, {
            ...projectSubmission,
            teamMembers: validMembers,
          })
          window.location.reload()
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

        let project = null // Temp variable for project
        let validMembers = [] // Array to hold validated members
        let error = null

        // Update the submittedProject for each user
        await Promise.all(
          projectSubmission.teamMembers.map(async member => {
            const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
            if (res.docs.length > 0) {
              const userData = res.docs[0].data()
              const { applicationStatus, attending, responded } = userData.status
              // Check that the person is an accepted hacker
              if (applicationStatus !== 'accepted' || !attending || !responded) {
                error = new Error(member.email + ' is not a valid hacker.')
                // Check that the hacker isn't already associated with another project
              } else if (userData.submittedProject) {
                error = new Error(
                  member.email + ' is already part of a different project submission.'
                )
              } else {
                // On first valid member, create a project to be used
                if (!project) {
                  project = await createProject(user.email, {
                    ...projectSubmission,
                    countAssigned: 0,
                  })
                }
                validMembers.push(member)
                return await applicantsRef
                  .doc(res.docs[0].id)
                  .update({ submittedProject: project.id })
              }
            } else {
              error = new Error(member.email + ' is not a valid hacker.')
            }
          })
        )

        // If there are no errors, update project with new information (and ony valid members)
        if (!error) {
          await updateProject(user.email, project.id, {
            ...projectSubmission,
            teamMembers: validMembers,
          })
          window.location.reload()
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
      await projectsRef.doc(project.uid).delete()
    } else {
      // remove current member from the project
      const updatedTeamMember = project.teamMembers.filter(
        teamMember => teamMember.email !== user.email
      )
      await projectsRef.doc(project.uid).update({ teamMembers: updatedTeamMember })
    }

    await applicantsRef.doc(user.uid).update({
      submittedProject: '',
    })
    setIsLeaving(false)
    window.location.reload()
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
    />
  )
}
