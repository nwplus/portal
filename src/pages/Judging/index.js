import React, { useEffect, useState } from 'react'
import { ProjectPageContainer } from '../../containers/GalleryPage'
import HeroPage, { Loading, JudgingNotOpen } from '../../components/HeroPage'
import { db, firestore, getLivesiteDoc, applicantsRef, projectsRef } from '../../utility/firebase'
import { formatProject } from '../../utility/utilities'
import JudgingCard from '../../components/Judging/JudgingCard'
import { useAuth } from '../../utility/Auth'
import { PROJECTS_TO_JUDGE_COUNT } from '../../utility/Constants'

const getProjects = async (userId, projectId) => {
  const getAndAssignProjects = async () => {
    const projectDocs = await projectsRef
      .where('draftStatus', '==', 'public')
      .orderBy('countAssigned')
      .limit(PROJECTS_TO_JUDGE_COUNT + 1) // get an extra in case we got our own project
      .get()
    let projectIds = projectDocs.docs.map(project => project.id)
    projectIds = projectIds.filter(id => id !== projectId)
    if (projectIds.length > PROJECTS_TO_JUDGE_COUNT) {
      projectIds.pop()
    }
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
    ;(async () => {
      const { submittedProject } = (await applicantsRef.doc(user.uid).get()).data()
      const isValidProject = submittedProject
        ? (await projectsRef.doc(submittedProject).get()).exists
        : false
      if (!isValidProject) {
        setIsBlocked(true)
      } else {
        setProjects(await getProjects(user.uid, submittedProject))
      }
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
        <p>To access judging you must have submitted a project</p>
      </HeroPage>
    )
  }

  if (!isJudgingOpen) {
    return <JudgingNotOpen />
  }

  return (
    <ProjectPageContainer>
      {projects.map(project => {
        return (
          <JudgingCard
            {...project}
            key={project.id}
            buttonLabel={project.judged ? 'Already Judged' : 'Judge this Submission'}
            buttonDisabled={project.judged}
            href={`judging/view/${project.id}`}
          />
        )
      })}
    </ProjectPageContainer>
  )
}
