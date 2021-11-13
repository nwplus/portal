import React, { useRef, useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import { syncToFirebase, projectsRef, submitGrade } from '../utility/firebase'
import { Button, ToggleSwitch } from '../components/Input'
import { H1, H3, P, A } from '../components/Typography'
import { Card } from '../components/Common'
import Accordion from '../components/Accordion'
import { ProjectTable, ProjectGradeTable, GradeTable } from '../components/Judging/Admin/Table'
import SponsorSubmissions from '../components/Judging/Admin/SponsorSubmissions'
import ProgressBar from '../components/ProgressBar'
import { JUDGING_RUBRIC, calculateGrade, PROJECTS_TO_JUDGE_COUNT } from '../utility/Constants'

const Columns = styled.div`
  display: flex;
  flex-direction: row;
`
const Column = styled.div`
  margin: 1em;
`
class CSV {
  constructor(data) {
    // from: https://gist.github.com/Jezternz/c8e9fafc2c114e079829974e3764db75
    const csvStringToArray = strData => {
      const objPattern = new RegExp(
        '(\\,|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^\\,\\r\\n]*))',
        'gi'
      )
      let arrMatches = null,
        arrData = [[]]
      while ((arrMatches = objPattern.exec(strData))) {
        if (arrMatches[1].length && arrMatches[1] !== ',') arrData.push([])
        arrData[arrData.length - 1].push(
          arrMatches[2] ? arrMatches[2].replace(new RegExp('""', 'g'), '"') : arrMatches[3]
        )
      }
      return arrData
    }

    const findLineBreaksInDoubleQuotes = /"[^"]*(?:""[^"]*)*"/g
    const cleaned = data.replace(findLineBreaksInDoubleQuotes, m => m.replace(/\n/g, ''))
    const parsed = cleaned.split('\n').map(row => row.split(/,(?=\S)/))

    // parse column data
    const headings = parsed[0]
    this.headings = headings.concat([''])

    // get max team size
    const indexBeforeTeamListing = this.headings.indexOf('Additional Team Member Count')
    const teamSizes = parsed.map(e => +e[indexBeforeTeamListing]).filter(n => !isNaN(n))
    const maxTeamSize = Math.max.apply(null, teamSizes)

    // patch missing headers
    for (var i = 0; i < maxTeamSize; i++) {
      const offset = indexBeforeTeamListing + 3 * i + 1
      this.headings[offset] = `Team Member ${i + 1} First Name`
      this.headings[offset + 1] = `Team Member ${i + 1} Last Name`
      this.headings[offset + 2] = `Team Member ${i + 1} Email`
    }

    const new_rows = csvStringToArray(data)
    new_rows.shift()
    this.entries = new_rows.map(row => {
      return row.reduce((accumulator, curr, i) => {
        accumulator[`${this.headings[i]}`] = curr
        return accumulator
      }, {})
    })
  }
}

class Project {
  constructor(entry) {
    // Commenting out for HackCamp 2021
    // this.acknowledged = entry['Acknowledged'] === '1' || entry['Acknowledged'] === 'yes'
    this.acknowledged = true
    const teamsize = parseInt(entry['Additional Team Member Count'])
    this.teamMembers = [`${entry['Submitter First Name']} ${entry['Submitter Last Name']}`]
    this.teamMembersEmails = [entry['Submitter Email']]

    this.title = entry['Project Title']
    this.devpostUrl = entry['Submission Url']
    this.youtubeUrl = entry['Youtube Link'].trim().replace(/,$/, '')
    this.description = entry['Brief Description']
    this.sponsorPrizes = entry['Opt-In Prizes']?.replace(/['"]+/g, '')?.split(', ') || []

    for (let i = 0; i < teamsize; i++) {
      const first = entry[`Team Member ${i + 1} First Name`] ?? 'No first name'
      const last = entry[`Team Member ${i + 1} Last Name`] ?? 'No last name'
      const email = entry[`Team Member ${i + 1} Email`]
      if (!(email === undefined)) {
        this.teamMembers.push(`${first} ${last}`)
        this.teamMembersEmails.push(email)
      }
    }
  }
}

const getStats = async () => {
  const projectDocs = await projectsRef.get()
  const projectData = projectDocs.docs.map(projectDoc => {
    const project = projectDoc.data()
    project.countGraded = project.grades ? Object.values(project.grades).length : 0
    project.countTeamMembers = project.teamMembersEmails.length
    return project
  })
  return projectData.reduce(
    (accum, project) => {
      accum.total += project.countTeamMembers
      accum.assigned += project.countAssigned
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
      if (key === 'notes') {
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
      if (key === 'notes') {
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
        return (total / project.countGraded).toFixed(2)
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
  projectData.sort((a, b) => b.grade - a.grade)
  return projectData
}

export default () => {
  const inputFile = useRef()
  const [message, setMessage] = useState('Waiting for .csv upload...')
  const [projects, setProjects] = useState([])
  const [gradedProjects, setGradedProjects] = useState([])
  const [grades, setGrades] = useState([]) // Individual "grade" objects
  const [sponsorPrizes, setSponsorPrizes] = useState({})
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

  const uploadClickHandler = () => {
    inputFile.current.click()
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

  const onChange = e => {
    const fileInput = e.target
    if (fileInput.files && fileInput.files[0]) {
      const csv = fileInput.files[0]

      if (fileInput.files[0].type !== 'text/csv') {
        setMessage('err: not csv')
        return
      }

      setMessage(`Loaded ${csv.name} successfully`)
      var reader = new FileReader()
      reader.addEventListener('load', e => {
        const csvdata = e.target.result
        console.log(
          new CSV(csvdata).entries.filter(
            r => r['Project Status'] === 'Submitted (Gallery/Visible)'
          )
        )
        const parsedProjects = new CSV(csvdata).entries
          .filter(r => r['Project Status'] === 'Submitted (Gallery/Visible)')
          .map(r => new Project(r))
          .filter(p => p.acknowledged)
        setMessage(`Parsed ${parsedProjects.length} projects from ${csv.name} successfully`)
        setProjects(parsedProjects)

        const prizes = {}
        parsedProjects.forEach(project => {
          project.sponsorPrizes.forEach(prize => {
            prize = prize === '' ? 'No prize' : prize
            if (prizes[prize]) {
              prizes[prize].push(project.devpostUrl)
            } else {
              prizes[prize] = [project.devpostUrl]
            }
          })
        })
        setSponsorPrizes(prizes)
      })

      reader.readAsText(csv, 'UTF-8')
    }
  }

  const sync = () => {
    if (
      window.confirm(
        `Are you sure you want to sync ${projects.length} projects? This is a "very" destructive action`
      )
    ) {
      return syncToFirebase(projects, setMessage)
    }
  }

  const percentageAssigned = (
    (stats.assigned * 100) /
    (stats.total * PROJECTS_TO_JUDGE_COUNT)
  ).toFixed(2)
  const percentageGraded = ((stats.graded * 100) / (stats.total * PROJECTS_TO_JUDGE_COUNT)).toFixed(
    2
  )

  const filteredGradedProjects = () => {
    return toggle.filterDisqualify
      ? gradedProjects.filter(project => !project.disqualified)
      : gradedProjects
  }

  return (
    <>
      <H1>Submissions</H1>
      <Card>
        <P>
          Export the project submissions list from Devpost and upload it here to sync the data with
          Firebase. You can find more info{' '}
          <A href="https://help.devpost.com/hc/en-us/articles/360022016811-Exporting-your-submission-data">
            on this Devpost article.
          </A>
        </P>
        <H3>Status: {message}</H3>
        <input ref={inputFile} type="file" hidden onChange={onChange} />
        <Button no_margin color="tertiary" onClick={uploadClickHandler}>
          Upload
        </Button>
        <Button width="flex" color="tertiary" onClick={sync}>
          Sync {projects.length} projects to Firebase
        </Button>
        <Accordion heading="Project List">
          <ProjectTable data={projects} />
        </Accordion>
      </Card>
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
