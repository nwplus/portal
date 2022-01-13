// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Form from '../components/Judging/SubmissionForm'
import { projectsRef, applicantsRef } from '../utility/firebase'

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
      }
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
        await projectsRef.doc(projectId).update(projectSubmission)
        // TODO: Determine if these emails are "new" emails
        // TODO: Check that the person doesn't already have a project
        // TODO: Allow Remove people
        await Promise.all(
          projectSubmission.teamMembers.map(async member => {
            console.log(member.email)
            const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
            if (res.docs.length > 0) {
              return await applicantsRef.doc(res.docs[0].id).update({ submittedProject: projectId })
            }
          })
        )
      } catch (error) {
        setError(error)
      }
    } else {
      try {
        const project = await projectsRef.add(projectSubmission)
        // await applicantsRef.doc(user.uid).update({ submittedProject: res.id })
        await Promise.all(
          // TODO: Check that the person doesn't already have a project
          // TODO: Allow Remove people
          projectSubmission.teamMembers.map(async member => {
            console.log(member.email)
            const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
            if (res.docs.length > 0) {
              return await applicantsRef
                .doc(res.docs[0].id)
                .update({ submittedProject: project.id })
            }
          })
        )
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
      error={error}
    />
  )
}
