// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Form from '../components/Judging/SubmissionForm'
import { projectsRef, applicantsRef } from '../utility/firebase'

// const NO_PROJECT = 'no project found'

// const getUser = async uid => {
//   const userDoc = await applicantsRef.get(uid)
//   if (userDoc.docs.length < 1) {
//     return NO_USER
//   }
//   return userDoc
// }

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
  const [userObj, setUserObj] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    const getProject = async () => {
      const userDoc = await applicantsRef.doc(user.uid).get()
      if (!userDoc.exists) {
        return
      }
      const userData = userDoc.data()
      setUserObj(userData)
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
    // TODO: Write project submission to Firebase
    const projectId = projectSubmission.uid
    delete projectSubmission.uid
    if (projectId) {
      // update doc
      await projectsRef.doc(projectId).update(projectSubmission)
    } else {
      const res = await projectsRef.add(projectSubmission)
      await applicantsRef.doc(user.uid).update({ submittedProject: res.id })
    }
    setSubmitting(false)
  }

  return <Form project={project} onSubmit={submit} isSubmitting={isSubmitting} />
}
