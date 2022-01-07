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
        setProject({ ...projectDoc.data(), uid: projectDoc.id })
      }
    }
    getProject()
  }, [user.uid])

  const submit = async projectSubmission => {
    if (isSubmitting) {
      return
    }
    setSubmitting(true)
    const projectId = projectSubmission.uid
    delete projectSubmission.uid
    if (projectId) {
      await projectsRef.doc(projectId).update(projectSubmission)
      // TODO: Determine if these emails are "new" emails
      await Promise.all(
        projectSubmission.teamMembers.map(async member => {
          console.log(member.email)
          const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
          if (res.docs.length > 0) {
            return await applicantsRef.doc(res.docs[0].id).update({ submittedProject: projectId })
          }
        })
      )
    } else {
      const res = await projectsRef.add(projectSubmission)
      // await applicantsRef.doc(user.uid).update({ submittedProject: res.id })
      await Promise.all(
        projectSubmission.teamMembers.map(async member => {
          console.log(member.email)
          const res = await applicantsRef.where('basicInfo.email', '==', member.email).get()
          if (res.docs.length > 0) {
            return await applicantsRef.doc(res.docs[0].id).update({ submittedProject: res.id })
          }
        })
      )
    }
    setSubmitting(false)
  }

  return <Form project={project} onSubmit={submit} isSubmitting={isSubmitting} />
}
