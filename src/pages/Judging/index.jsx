import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ProjectPageContainer } from '../../containers/GalleryPage'
import HeroPage, { Loading, JudgingNotOpen } from '../../components/HeroPage'
import { db, firestore, getLivesiteDoc, applicantsRef, projectsRef } from '../../utility/firebase'
import { formatProject } from '../../utility/utilities'
import JudgingCard from '../../components/Judging/JudgingCard'
import { useAuth } from '../../utility/Auth'
import { PROJECTS_TO_JUDGE_COUNT } from '../../utility/Constants'
import { useHackathon } from '../../utility/HackathonProvider'

const StyledJudgingCard = styled(JudgingCard)`
  max-height: 400px;
`

const getProjects = async (userId, projectId, dbHackathonName) => {
  const getAndAssignProjects = async () => {
    try {
      const projectSnapshot = await projectsRef(dbHackathonName)
        .where('draftStatus', '==', 'public')
        .orderBy('countAssigned')
        .limit(PROJECTS_TO_JUDGE_COUNT + 1)
        .get()

      let projectIds = projectSnapshot.docs.map(project => project.id)
      projectIds = projectIds.filter(id => id !== projectId)
      if (projectIds.length > PROJECTS_TO_JUDGE_COUNT) {
        projectIds.pop()
      }

      await db.runTransaction(async transaction => {
        projectIds.forEach(projectId => {
          const projectRef = projectsRef(dbHackathonName).doc(projectId)
          transaction.update(projectRef, {
            countAssigned: firestore.FieldValue.increment(1),
          })
        })

        // add projects to user
        const applicantRef = applicantsRef(dbHackathonName).doc(userId)
        transaction.update(applicantRef, {
          projectsAssigned: projectIds,
        })
      })

      return projectIds
    } catch (error) {
      console.error('Error assigning projects:', error)
    }
  }

  const queryProjects = async projectIds => {
    try {
      const projectDocs = await projectsRef(dbHackathonName)
        .where(firestore.FieldPath.documentId(), 'in', projectIds)
        .get()
      if (projectDocs.docs.length < 1) {
        // projects are missing
        const newProjectIds = await getAndAssignProjects()
        return await queryProjects(newProjectIds)
      }
      return projectDocs
    } catch (error) {
      console.error('Error querying projects:', error)
    }
  }

  const getProjectsData = async projectIds => {
    try {
      let projectDocs = await queryProjects(projectIds)
      return projectDocs.docs.map(project => {
        const formattedProject = formatProject({ ...project.data(), id: project.id })
        formattedProject.judged = formattedProject.grades && formattedProject.grades[userId]
        return formattedProject
      })
    } catch (error) {
      console.error('Error getting project data:', error)
    }
  }

  const applicantDoc = await applicantsRef(dbHackathonName).doc(userId).get()
  const applicantData = applicantDoc.data()
  const projectsAssigned =
    applicantData.projectsAssigned && applicantData.projectsAssigned.length > 0
      ? applicantData.projectsAssigned
      : await getAndAssignProjects()
  return await getProjectsData(projectsAssigned, userId)
}

const Judging = () => {
  const [isJudgingOpen, setIsJudgingOpen] = useState()
  const [isBlocked, setIsBlocked] = useState()
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const { activeHackathon, dbHackathonName } = useHackathon()

  useEffect(() => {
    ;(async () => {
      try {
        const applicantDoc = await applicantsRef(dbHackathonName).doc(user.uid).get()
        const { submittedProject } = applicantDoc.data() || {}

        const projectRef = projectsRef(dbHackathonName)
        if (!projectRef) {
          console.error('projectsRef returned undefined')
          setIsBlocked(true)
          return
        }

        const isValidProject = submittedProject
          ? (await projectRef.doc(submittedProject).get()).exists
          : false

        if (!isValidProject) {
          console.error('User cannot access judging: No valid submitted project found')
          console.log('User:', user.uid, 'Submitted Project:', submittedProject)
          setIsBlocked(true)
        } else {
          setProjects(await getProjects(user.uid, submittedProject, dbHackathonName))
        }
      } catch (error) {
        console.error('Error in Judging component:', error)
        setIsBlocked(true)
      }
    })()
  }, [user.uid, dbHackathonName])

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(livesiteDoc =>
      setIsJudgingOpen(livesiteDoc.judgingOpen[activeHackathon])
    )
    return unsubscribe
  }, [activeHackathon])

  if (!projects || isJudgingOpen === undefined) {
    return <Loading />
  }

  if (isBlocked) {
    return (
      <HeroPage>
        <h2>There was an error</h2>
        <p>Please contact an organizer to resolve this issue!</p>
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
          <StyledJudgingCard
            {...project}
            key={project.id}
            buttonLabel={project.judged ? 'Already Judged' : 'Judge this Submission'}
            buttonDisabled={project.judged}
            href={`/judging/view/${project.id}`}
          />
        )
      })}
    </ProjectPageContainer>
  )
}

export default Judging
