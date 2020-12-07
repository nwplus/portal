import React, { useRef, useEffect, useState } from 'react'
import { Button } from '../components/Input'
import { H1, H3, P, A } from '../components/Typography'
import { Card } from '../components/Common'
import Accordion from '../components/Accordion'
import { syncToFirebase, projectsRef } from '../utility/firebase'
import ProjectTable from '../components/Judging/ProjectTable'
import SponsorSubmissions from '../components/Judging/SponsorSubmissions'
import { MoonLoader } from 'react-spinners'

class CSV {
  constructor(data) {
    const parsed = data.split('\n').map(row => row.split(/,(?=\S)/))

    // parse column data
    const headings = parsed.shift()
    this.headings = headings.slice(0, -1)

    this.entries = parsed.map(row => {
      return row.reduce((accumulator, curr, i) => {
        accumulator[`${this.headings[i]}`] = curr
        return accumulator
      }, {})
    })
  }
}

class Project {
  constructor(entry) {
    this.acknowledged = entry["Yes I Have Put All My Teammate's Names On The Devpost"] === '1'
    const teamsize = parseInt(entry['Additional Team Member Count'])
    this.teamMembers = [`${entry['Submitter First Name']} ${entry['Submitter Last Name']}`]
    this.teamMembersEmails = [entry['Submitter Email']]

    this.title = entry['Project Title']
    this.devpostUrl = entry['Submission Url']
    this.youtubeUrl = entry['Youtube Link'].trim().replace(/,$/, '')
    this.description = entry['Brief Description']
    this.sponsorPrizes = entry['Opt-In Prizes'].replace(/['"]+/g, '').split(', ')

    for (let i = 0; i < teamsize; i++) {
      const first = entry[`Team Member ${i + 1} First Name`]
      const last = entry[`Team Member ${i + 1} Last Name`]
      this.teamMembers.push(`${first} ${last}`)
      this.teamMembersEmails.push(entry[`Team Member ${i + 1} Email`])
    }
  }
}

const getGradedProjects = async () => {
  const projectDocs = await projectsRef.get()
  const projectData = projectDocs.docs.map(projectDoc => {
    const project = projectDoc.data()
    if (project.grades) {
      project.countGraded = Object.values(project.grades).length
      Object.values(project.grades).forEach(grade => {
        Object.entries(grade).forEach(([key, value]) => {
          if (key === 'notes') return
          project[key] = project[key] ? project[key] + value : value
          project.total = project.total ? project.total + value : value
        })
      })
      const avg = total => {
        return (total / project.countGraded).toFixed(2)
      }
      project.grade = avg(project.total)
      project.tech = avg(project.tech)
      project.design = avg(project.design)
      project.functionality = avg(project.functionality)
      project.creativity = avg(project.creativity)
      project.pitch = avg(project.pitch)
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
  const [sponsorPrizes, setSponsorPrizes] = useState({})
  const [isLoading, setLoading] = useState(false)

  const uploadClickHandler = () => {
    inputFile.current.click()
  }

  const handleClick = async () => {
    setLoading(true)
    setGradedProjects(await getGradedProjects())
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      setGradedProjects(await getGradedProjects())
    })()
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

      reader.readAsBinaryString(csv)
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
          <ProjectTable projects={projects} />
        </Accordion>
      </Card>
      <SponsorSubmissions sponsorPrizes={sponsorPrizes} />
      <H1>Grades</H1>
      <Button color="secondary" width="large" style={{ margin: 0 }} onClick={handleClick}>
        Refresh Grades
      </Button>
      <MoonLoader color="#fff" loading={isLoading} />
      <ProjectTable projects={gradedProjects} includeGrades />
    </>
  )
}
