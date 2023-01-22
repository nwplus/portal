import React, { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import { CSVLink } from 'react-csv'
import { getSponsorPrizes, getUserApplication, projectsRef, submitGrade } from '../utility/firebase'
import { Button, ToggleSwitch } from '../components/Input'
import { H1, H3, P } from '../components/Typography'
import { Card } from '../components/Common'
import { ProjectGradeTable, GradeTable } from '../components/Judging/Admin/Table'
import ProgressBar from '../components/ProgressBar'
import { JUDGING_RUBRIC, calculateGrade, PROJECTS_TO_JUDGE_COUNT } from '../utility/Constants'
import SponsorSubmissions from '../components/Judging/Admin/SponsorSubmissions'

const Columns = styled.div`
  display: flex;
  flex-direction: row;
`
const Column = styled.div`
  margin: 1em;
`
export const StyledCSVLink = styled(CSVLink)`
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
`

const getStats = async () => {
  const projectDocs = await projectsRef.get()
  const projectData = projectDocs.docs.map(projectDoc => {
    const project = projectDoc.data()
    project.countGraded = project.grades ? Object.values(project.grades).length : 0
    project.countTeamMembers = project.teamMembers.length
    return project
  })
  return projectData.reduce(
    (accum, project) => {
      accum.total += project.countTeamMembers
      accum.assigned += project.countAssigned ?? 0
      accum.graded += project.countGraded
      return accum
    },
    {
      total: 0,
      assigned: 0,
      graded: 0,
    }
  )
}

const calculatePointTotals = project => {
  const res = { total: 0 }

  Object.values(project.grades).forEach(grade => {
    Object.entries(grade).forEach(([key, value]) => {
      if (typeof value !== 'number') {
        return
      }
      res[key] = res[key] ? res[key] + value : value
      res.total += value
    })
  })

  return res
}

const calculateResiduals = project => {
  const residuals = []
  Object.entries(project.grades).forEach(([key, grade]) => {
    Object.entries(grade).forEach(([subkey, value]) => {
      if (typeof value !== 'number') {
        return
      }
      const mean = project[subkey] / project.countGraded
      grade.residual = (mean - value) ** 2
      residuals.push({ id: key, value: grade.residual })
    })
  })
  return residuals
}

const getProjectData = async () => {
  const projectDocs = await projectsRef.get()
  return projectDocs.docs.map(projectDoc => {
    if (projectDoc.data().grades) {
      const grades = projectDoc.data().grades
      Object.keys(grades).forEach(id => {
        if (grades[id].removed) {
          delete grades[id]
        }
      })

      if (Object.keys(grades).length) {
        return { ...projectDoc.data(), grades, id: projectDoc.id }
      } else {
        const project = { ...projectDoc.data(), id: projectDoc.id }
        delete project.grades
        return project
      }
    }
    return { ...projectDoc.data(), id: projectDoc.id }
  })
}

const getGrades = async () => {
  const gradeData = []
  const projectData = await getProjectData()
  projectData.forEach(project => {
    if (project.grades) {
      Object.entries(project.grades).forEach(([gradeId, grade]) => {
        if (!grade.removed) {
          gradeData.push({
            title: project.title,
            devpostUrl: project.devpostUrl,
            id: project.id,
            gradeId,
            ...grade,
            totalGrade: calculateGrade(grade),
          })
        }
      })
    }
  })
  gradeData.sort((a, b) => {
    a.reported = a.reported || false
    b.reported = b.reported || false
    return b.reported - a.reported || b.totalGrade - a.totalGrade
  })
  return gradeData
}

const getGradedProjects = async (dropOutliers = 2) => {
  const projectData = (await getProjectData()).map(project => {
    if (project.grades) {
      project.countGraded = Object.values(project.grades).length

      // add total grade calculations to project object
      project = { ...project, ...calculatePointTotals(project) }
      const avg = total => {
        return (total / Object.entries(project.grades).length).toFixed(2)
      }

      JUDGING_RUBRIC.forEach(item => (project[item.id] = avg(project[item.id])))
      project.grade = calculateGrade(project)

      // sort residuals
      const residuals = calculateResiduals(project).sort()
      for (var i = 0; i < dropOutliers; i++) {
        // remove top dropOutliers
        const residual = residuals.pop()
        delete project.grades[residual.id]
      }

      // recalculate if any grades were dropped
      if (dropOutliers > 0) {
        // reset to 0 (needed in case after dropping outliers, grades is 0)
        JUDGING_RUBRIC.forEach(item => (project[item.id] = 0))

        // repopulate project object
        project = { ...project, ...calculatePointTotals(project) }
        JUDGING_RUBRIC.forEach(item => (project[item.id] = avg(project[item.id])))
        project.grade = calculateGrade(project)
      }
    } else {
      project.countGraded = 0
      project.grade = 0
    }
    return project
  })
  projectData.sort((a, b) => {
    a.grade = a.grade === 'NaN' ? false : a.grade
    b.grade = b.grade === 'NaN' ? false : b.grade
    return b.grade - a.grade
  })
  return projectData
}

export default () => {
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [gradedProjects, setGradedProjects] = useState([])
  const [CSVProjectData, setCSVProjectData] = useState([])
  const [grades, setGrades] = useState([]) // Individual "grade" objects
  const [isLoading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    graded: 0,
  })
  const [toggle, setToggle] = useState({})

  const removeGrade = async row => {
    const { id, gradeId, ...score } = row
    await submitGrade(id, { ...score, removed: true }, { uid: gradeId, email: score.user }, () =>
      alert("Error. If there is no 'Submitted by' this error is expected.")
    )
    await setProjectsAndStats()
  }

  const onDisqualify = async (projectId, disqualified) => {
    await projectsRef.doc(projectId).update({ disqualified: !disqualified })
    await setProjectsAndStats()
  }

  const parseSponsorPrizes = async () => {
    const sponsorPrizes = await getSponsorPrizes()
    const projects = await getProjectData()

    const prizesToProjectsMap = {}

    for (let i = 0; i < sponsorPrizes.length; i++) {
      prizesToProjectsMap[sponsorPrizes[i]] = []
    }

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i]

      // if a project added sponsor prize consideration
      if (project.sponsorPrizes && project.sponsorPrizes.length > 0) {
        // for each sponsor prize consideration, add this project to the map of projects
        for (let j = 0; j < project.sponsorPrizes.length; j++) {
          let currentProjectsOfPrize = JSON.parse(
            JSON.stringify(prizesToProjectsMap[project.sponsorPrizes[j]])
          )
          currentProjectsOfPrize.push(project)
          prizesToProjectsMap[project.sponsorPrizes[j]] = currentProjectsOfPrize
        }
      }
    }

    return prizesToProjectsMap
  }

  const setProjectsAndStats = async () => {
    setLoading(true)
    setGradedProjects(await getGradedProjects())
    setGrades(await getGrades())
    getStats().then(data => setStats(data))
    setLoading(false)
  }

  useEffect(() => {
    setProjectsAndStats()
  }, [])

  const getProjectsByPrizes = async () => {
    setSponsorPrizes(await parseSponsorPrizes())
  }

  const [firstTimeStats, setFirstTimeStats] = useState(null)
  const getFirstTimeHackers = async () => {
    const projects = await getProjectData()

    const projectsToStat = {}

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i]

      if (project.teamMembers && project.teamMembers.length > 0) {
        let newHackers = []

        for (let j = 0; j < projects[i].teamMembers.length; j++) {
          if (project.teamMembers[j].id) {
            const hacker = await getUserApplication(project.teamMembers[j].id)

            if (hacker.skills.hackathonsAttended) {
              newHackers.push(`${hacker.basicInfo.firstName} ${hacker.basicInfo.lastName}`)
            }
          }
        }

        projectsToStat[project.title] = {
          ratio: `${newHackers.length}/${project.teamMembers.length}`,
          newHackers: newHackers,
        }
      }
    }
    setFirstTimeStats(projectsToStat)
    console.log(projectsToStat)
  }

  useEffect(() => {
    getProjectsByPrizes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const formattedProjects = gradedProjects.map(project => {
      const portalLink = window.location.origin // to support local development as well
      const projectInfo = {
        Title: project.title,
        Link: `${portalLink}/projects/${project.id}`,
        Devpost: project.links.devpost,
        'Charity choice': project.charityChoice,
      }
      project.teamMembers.forEach((member, index) => {
        projectInfo[`Member ${index + 1} Name`] = member.name
        projectInfo[`Member ${index + 1} Email`] = member.email
        projectInfo[`Member ${index + 1} Discord`] = member.discord
      })
      return projectInfo
    })
    setCSVProjectData(formattedProjects)
  }, [gradedProjects])

  const percentageAssigned = stats.total
    ? ((stats.assigned * 100) / (stats.total * PROJECTS_TO_JUDGE_COUNT)).toFixed(2)
    : '0'

  const percentageGraded = stats.total
    ? ((stats.graded * 100) / (stats.total * PROJECTS_TO_JUDGE_COUNT)).toFixed(2)
    : '0'

  const filteredGradedProjects = () => {
    return toggle.filterDisqualify
      ? gradedProjects.filter(project => !project.disqualified)
      : gradedProjects
  }

  return (
    <>
      <H1>Submissions</H1>
      <div onClick={getFirstTimeHackers}>stats</div>
      {firstTimeStats &&
        Object.keys(firstTimeStats).map(project => (
          <div>
            {project}: {firstTimeStats[project].ratio} (
            {JSON.stringify(firstTimeStats[project].newHackers)})
          </div>
        ))}
      <SponsorSubmissions sponsorPrizes={sponsorPrizes} />
      <H1>Grades</H1>
      <H3>{percentageAssigned}% of projects assigned</H3>
      <ProgressBar percent={percentageAssigned} />
      <H3>{percentageGraded}% of projects judged</H3>
      <ProgressBar percent={percentageGraded} />
      <Card>
        <Columns>
          <Column>
            <ToggleSwitch
              checked={toggle.projectsGrades}
              onChange={() => setToggle({ projectsGrades: !toggle.projectsGrades })}
            />
            <P>Toggle Projects/Grades</P>
          </Column>

          <Column>
            <ToggleSwitch
              checked={toggle.filterDisqualify}
              onChange={() => setToggle({ filterDisqualify: !toggle.filterDisqualify })}
            />
            <P>Filter disqualified</P>
          </Column>
        </Columns>
        <Button color="secondary" width="large" onClick={setProjectsAndStats}>
          Refresh Grades
        </Button>
        <Button color="secondary" width="large">
          <StyledCSVLink data={CSVProjectData} filename={'projects.csv'} target="_blank">
            Download CSV
          </StyledCSVLink>
        </Button>
        <MoonLoader color="#fff" loading={isLoading} />
        {toggle.projectsGrades ? (
          <GradeTable data={grades} onRemove={removeGrade} />
        ) : (
          <ProjectGradeTable data={filteredGradedProjects()} onDisqualify={onDisqualify} />
        )}
      </Card>
    </>
  )
}
