// TODO: remove this when we finish project submission system
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Form from '../components/Judging/SubmissionForm'
import { projectsRef } from '../utility/firebase'

const NO_PROJECT = 'no project found'

const getProjectByEmail = async email => {
  const projectDoc = await projectsRef.where('teamMembersEmails', 'array-contains', email).get()
  if (projectDoc.docs.length < 1) {
    return NO_PROJECT
  }
  return projectDoc
}

// TODO: remove
// Temporary representation of what the project object should look like
const tempProject = {
  title: 'Testing Project',
  description: 'Just testing stuff',
  teamMembers: [
    {
      name: 'Kevin Zou',
      email: 'kevin@nwplus.io',
      discord: 'kevin#1234',
    },
  ],
  links: {
    youtube: 'youtube.com',
    sourceCode: 'github.com',
  },
  sponsorPrizes: ['Testing', 'kevbin'],
  lastEditedBy: {
    email: 'kevin@nwplus.io',
    date: new Date(),
  },
}

export default ({ user, refreshCallback }) => {
  const [project, setProject] = useState(tempProject)

  // TODO: fetch project based on current user setProject

  const submit = async projectSubmission => {
    // TODO: Write project submission to Firebase
    console.log(projectSubmission)
  }

  return <Form project={project} onSubmit={submit} />
}
