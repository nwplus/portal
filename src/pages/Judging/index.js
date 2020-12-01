import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { firestore, getLivesiteDoc, applicantsRef, projectsRef } from '../../utility/firebase'
import { formatProject } from '../../utility/utilities'
import JudgingCard from '../../components/JudgingCard'

//TODO: Get from auth or local storage
const USER_ID = 'aIwA36q0kOw7rDDlCkB2'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledJudgingCard = styled(JudgingCard)`
  margin: 0 2em 2em 0;
`

const getProjectIdsToAssign = async () => {
  const projectDocs = await projectsRef.orderBy('countAssigned').limit(3).get()
  return projectDocs.docs.map(project => project.id)
}

const assignProjects = async projectIds => {
  projectIds.forEach(projectId => {
    projectsRef.doc(projectId).update({ countAssigned: firestore.FieldValue.increment(1) })
  })
  applicantsRef.doc(USER_ID).update({ projectsAssigned: projectIds })
}

const getProjectsData = async projectIds => {
  const projectsDocs = await projectsRef
    .where(firestore.FieldPath.documentId(), 'in', projectIds)
    .get()
  return projectsDocs.docs.map(project => {
    return formatProject({ ...project.data(), id: project.id })
  })
}

export default () => {
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)

  // TODO: Get from firebase
  // eslint-disable-next-line no-unused-vars
  const [projects, setProjects] = useState([])

  useEffect(() => {
    ;(async () => {
      const applicantDoc = await applicantsRef.doc(USER_ID).get()
      let { projectsAssigned } = applicantDoc.data()
      if (!projectsAssigned) {
        projectsAssigned = await getProjectIdsToAssign()
        assignProjects(projectsAssigned)
      }
      const projectData = await getProjectsData(projectsAssigned)
      setProjects(projectData)
    })()
  }, [setIsJudgingOpen])

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
