// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Form from '../components/Judging/SubmissionForm'
import { projectsRef, applicantsRef, createProject, updateProject } from '../utility/firebase'

const tempProject = {
  // title: '',
  // description: '',
  // teamMembers: [
  //   {
  //     name: 'Kevin Zou',
  //     email: 'kevin@nwplus.io',
  //     discord: 'kevin#1234',
  //   },
  // ],
  // links: {
  //   youtube: 'youtube.com',
  //   sourceCode: 'github.com',
  // },
  // sponsorPrizes: ['Testing', 'kevbin'],
  // lastEditedBy: {
  //   email: 'kevin@nwplus.io',
  //   date: new Date(),
  // },
}

export default ({ user, refreshCallback }) => {
  const [project, setProject] = useState(tempProject)
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
        // TODO: Determine if these emails are "new" emails
        // TODO: Allow Remove people

        // Array to hold validated members
        let validMembers = []

        // Update the submission.submittedProject for each user
        await Promise.all(
          projectSubmission.teamMembers.map(async member => {
            const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
            if (res.docs.length > 0) {
              const { applicationStatus, attending, responded } = res.docs[0].data().status
              // Check that the person is an accepted hacker
              if (applicationStatus !== 'accepted' || !attending || !responded) {
                setError(new Error(member.email + ' is not a valid hacker.'))
                // Check that the hacker isn't already associated with another project
              } else if (res.docs[0].data().submittedProject !== projectId) {
                setError(
                  new Error(member.email + ' is already part of a different project submission.')
                )
              } else {
                validMembers.push(member)
                return await applicantsRef
                  .doc(res.docs[0].id)
                  .update({ 'submission.submittedProject': projectId })
              }
            } else {
              setError(new Error(member.email + ' is not a valid hacker.'))
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
        }
      } catch (error) {
        setError(error)
      }
    } else {
      // Project does not exist, make a new one
      try {
        // TODO: Check that the person doesn't already have a project
        // TODO: Allow Remove people

        // Temp variable for project
        let project = null

        // Array to hold validated members
        let validMembers = []

        // Update the submission.submittedProject for each user
        await Promise.all(
          projectSubmission.teamMembers.map(async member => {
            const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
            if (res.docs.length > 0) {
              const { applicationStatus, attending, responded } = res.docs[0].data().status
              // Check that the person is an accepted hacker
              if (applicationStatus !== 'accepted' || !attending || !responded) {
                setError(new Error(member.email + ' is not a valid hacker.'))
                // Check that the hacker isn't already associated with another project
              } else if (res.docs[0].data().submittedProject) {
                setError(
                  new Error(member.email + ' is already part of a different project submission.')
                )
              } else {
                // On first valid member, create a project to be used
                if (!project) {
                  project = await createProject(user.email, projectSubmission)
                }
                validMembers.push(member)
                return await applicantsRef
                  .doc(res.docs[0].id)
                  .update({ submittedProject: project.id })
              }
            } else {
              setError(new Error(member.email + ' is not a valid hacker.'))
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
        }
      } catch (error) {
        setError(error)
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
