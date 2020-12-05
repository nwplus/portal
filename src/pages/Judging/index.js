import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { JudgingNotOpen } from '../../components/HeroPage'
import { db, firestore, getLivesiteDoc, applicantsRef, projectsRef } from '../../utility/firebase'
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
  const batch = db.batch()

  // increment assigned counters
  projectIds.forEach(projectId => {
    batch.update(projectsRef.doc(projectId), { countAssigned: firestore.FieldValue.increment(1) })
  })

  // add projects to user
  batch.update(applicantsRef.doc(USER_ID), { projectsAssigned: projectIds })
  await batch.commit()
  return projectIds
}

const queryProjects = async projectIds => {
  const projectDocs = await projectsRef
    .where(firestore.FieldPath.documentId(), 'in', projectIds)
    .get()
  if (projectDocs.docs.length < 1) {
    // projects are missing
    const newProjectIds = await getAndAssignProjects()
    return await queryProjects(newProjectIds)
  }
  return projectDocs
}

const getProjectsData = async projectIds => {
  let projectDocs = await queryProjects(projectIds)
  return projectDocs.docs.map(project => {
    return formatProject({ ...project.data(), id: project.id })
  })
}

const getProjects = async () => {
  const applicantDoc = await applicantsRef.doc(USER_ID).get()
  const applicantData = applicantDoc.data()
  const projectsAssigned =
    applicantData.projectsAssigned && applicantData.projectsAssigned.length > 0
      ? applicantData.projectsAssigned
      : await getAndAssignProjects()
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
    return <JudgingNotOpen />
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
      {projects.length < 1 && <h2>Loading projects...</h2>}
    </Container>
  )
}
