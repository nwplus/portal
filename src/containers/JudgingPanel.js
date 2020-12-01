import React, { useRef, useState } from 'react'
import { Button } from '../components/Input'
import { H1, H3, P, A } from '../components/Typography'
import { Card } from '../components/Common'
import Accordion from '../components/Accordion'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db, projectsRef } from '../utility/firebase'
import ProjectTable from '../components/ProjectTable'

class CSV {
  constructor(data) {
    // parse column data
    const cols = data.shift()
    this.cols = cols.slice(0, -1)

    this.entries = data.map(row => {
      return row.reduce((accumulator, curr, i) => {
        accumulator[`${this.cols[i]}`] = curr
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

export default () => {
  const inputFile = useRef()
  const [message, setMessage] = useState('Waiting for .csv upload...')
  const [projects, setProjects] = useState([])
  const [sponsorPrizes, setSponsorPrizes] = useState({})

  const uploadClickHandler = () => {
    inputFile.current.click()
  }

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
        const parsed = csvdata.split('\n').map(row => row.split(/,(?=\S)/))

        const parsedProjects = new CSV(parsed).entries
          .map(r => new Project(r))
          .filter(p => p.acknowledged)
        setMessage(`Parsed ${parsedProjects.length} projects from ${csv.name} successfully`)
        setProjects(parsedProjects)

        const seenPrizes = new Set()
        const prizes = {}
        parsedProjects.forEach(project => {
          project.sponsorPrizes.forEach(prize => {
            prize = prize === '' ? 'No prize' : prize
            if (seenPrizes.has(prize)) {
              prizes[prize].push(project.devpostUrl)
            } else {
              prizes[prize] = [project.devpostUrl]
              seenPrizes.add(prize)
            }
          })
        })
        setSponsorPrizes(prizes)
      })

      reader.readAsBinaryString(csv)
    }
  }

  const syncToFirebase = async () => {
    // delete old projects
    setMessage(`Snapping old projects...`)
    const batch = db.batch()
    projectsRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      batch.commit().then(() => {
        setMessage(`Snapped!`)
        // insert new
        const batch = firebase.firestore().batch()
        projects.forEach(p => {
          var docRef = projectsRef.doc()
          p.countAssigned = 0
          batch.set(docRef, Object.assign({}, p))
        })
        setMessage(`Inserting ${projects.length} new projects...`)
        batch.commit().then(() => setMessage('Insert done!'))
      })
    })
  }

  return (
    <div>
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
        <Button width="flex" color="tertiary" onClick={syncToFirebase}>
          Sync {projects.length} projects to Firebase
        </Button>
        <Accordion heading="Project List">
          <ProjectTable projects={projects} />
        </Accordion>
      </Card>
      <div>
        <H1>Sponsor Judging</H1>
        {Object.keys(sponsorPrizes).map(prize => (
          <Accordion heading={prize} key={prize}>
            <ul>
              {sponsorPrizes[prize].map((submission, i) => (
                <li key={i}>{submission}</li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
