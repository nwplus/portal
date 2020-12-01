import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { firestore, getLivesiteDoc, applicantsRef, projectsRef } from '../../utility/firebase'
import { formatProject } from '../../utility/utilities'
import JudgingCard from '../../components/JudgingCard'

const PROJECTS_TO_JUDGE_COUNT = 5
//TODO: Get from auth or local storage
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledJudgingCard = styled(JudgingCard)`
  margin: 0 2em 2em 0;
`

const getAndAssignProjects = async () => {
  const projectDocs = await projectsRef
    .orderBy('countAssigned')
    .limit(PROJECTS_TO_JUDGE_COUNT)
    .get()
  const projectIds = projectDocs.docs.map(project => project.id)

  // increment assigned counters
  projectIds.forEach(projectId => {
    projectsRef.doc(projectId).update({ countAssigned: firestore.FieldValue.increment(1) })
  })

  // add projects to user
  applicantsRef.doc(USER_ID).update({ projectsAssigned: projectIds })
  return projectIds
}

const queryProjects = async projectIds =>
  await projectsRef.where(firestore.FieldPath.documentId(), 'in', projectIds).get()

const getProjectsData = async projectIds => {
  let projectDocs = await queryProjects(projectIds)
  if (projectDocs.docs.length < 1) {
    // projects are missing
    const newProjectIds = await getAndAssignProjects()
    projectDocs = await queryProjects(newProjectIds)
  }

  return projectDocs.docs.map(project => {
    return formatProject({ ...project.data(), id: project.id })
  })
}

const getProjects = async () => {
  const applicantDoc = await applicantsRef.doc(USER_ID).get()
  const projectData = applicantDoc.data()
  const projectsAssigned = projectData.projectsAssigned || (await getAndAssignProjects())
  return await getProjectsData(projectsAssigned)
}

export default () => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    ;(async () => setProjects(await getProjects()))()
  }, [setProjects])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  if (!isJudgingOpen) {
    return <h2>Judging is not open yet. Please check back later.</h2>
  }

  return (
    <Container>
      {projects.map(project => {
        return (
          <StyledJudgingCard
            {...project}
            key={project.id}
            buttonLabel={project.judged ? 'Already Judged' : 'Judge this Submission'}
            buttonDisabled={project.judged}
            href={`judging/view/${project.id}`}
          />
        )
      })}
    </Container>
  )
}
