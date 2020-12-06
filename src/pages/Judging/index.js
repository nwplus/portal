import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'wouter'
import HeroPage, { Loading, JudgingNotOpen } from '../../components/HeroPage'
import { db, firestore, getLivesiteDoc, applicantsRef, projectsRef } from '../../utility/firebase'
import { formatProject } from '../../utility/utilities'
import JudgingCard from '../../components/JudgingCard'
import { A } from '../../components/Typography'
import { useAuth } from '../../utility/Auth'

const PROJECTS_TO_JUDGE_COUNT = 4

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledJudgingCard = styled(JudgingCard)`
  margin: 0 2em 2em 0;
`

const getProjects = async userId => {
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
    batch.update(applicantsRef.doc(userId), { projectsAssigned: projectIds })
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
      const formattedProject = formatProject({ ...project.data(), id: project.id })
      formattedProject.judged = formattedProject.grades && formattedProject.grades[userId]
      return formattedProject
    })
  }

  const applicantDoc = await applicantsRef.doc(userId).get()
  const applicantData = applicantDoc.data()
  const projectsAssigned =
    applicantData.projectsAssigned && applicantData.projectsAssigned.length > 0
      ? applicantData.projectsAssigned
      : await getAndAssignProjects()
  return await getProjectsData(projectsAssigned, userId)
}

export default () => {
  const [isJudgingOpen, setIsJudgingOpen] = useState()
  const [isBlocked, setIsBlocked] = useState()
  const { user } = useAuth()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    ;(async () => setProjects(await getProjects(user.uid)))()
  }, [setProjects, user.uid])

  useEffect(() => {
    ;(async () => {
      const applicantData = (await applicantsRef.doc(user.uid).get()).data()
      setIsBlocked(!applicantData.submittedProject)
    })()
  }, [user.uid])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc => setIsJudgingOpen(livesiteDoc.judgingOpen))
    return unsubscribe
  }, [setIsJudgingOpen])

  if (!projects || isJudgingOpen === undefined) {
    return <Loading />
  }

  if (isBlocked) {
    return (
      <HeroPage>
        <h2>Error, permission denied</h2>
        Please{' '}
        <Link href="/submission">
          <A>link your Devpost</A>
        </Link>{' '}
        account to access judging
      </HeroPage>
    )
  }

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
    </Container>
  )
}
