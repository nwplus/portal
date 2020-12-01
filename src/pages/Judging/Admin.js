import React, { useRef, useState } from 'react'
import { Button } from '../../components/Input'
import { H1, H3, P } from '../../components/Typography'
import Accordion from '../../components/Accordion'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db, projectsRef } from '../../utility/firebase'
import ProjectTable from '../../components/ProjectTable'

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
  const [filename, setFilename] = useState('')
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
        setFilename('err: not csv')
        return
      }

      setFilename(csv.name)
      var reader = new FileReader()
      reader.addEventListener('load', e => {
        const csvdata = e.target.result
        const parsed = csvdata.split('\n').map(row => row.split(/,(?=\S)/))

        const parsedProjects = new CSV(parsed).entries
          .map(r => new Project(r))
          .filter(p => p.acknowledged)
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
    console.log('deleting old collection...')
    const batch = db.batch()
    projectsRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      batch.commit().then(() => {
        // insert new
        console.log(`insert ${projects.length} new projects...`)
        const batch = firebase.firestore().batch()
        projects.forEach(p => {
          var docRef = projectsRef.doc()
          p.countAssigned = 0
          batch.set(docRef, Object.assign({}, p))
        })
        batch.commit().then(() => console.log('insert done!'))
      })
    })

    // get list of users
    // iterate projects, if any emails match
    // associate user with project
  }

  return (
    <div>
      <H1>Submissions</H1>
      <H3>Uploaded: {filename || 'no file'}</H3>
      {projects.length > 0 && <P>Parsed {projects.length} projects successfully!</P>}
      <input ref={inputFile} type="file" hidden onChange={onChange} />
      <Button color="tertiary" onClick={uploadClickHandler}>
        Upload
      </Button>
      <ProjectTable projects={projects} />
      <Button width="flex" color="tertiary" onClick={syncToFirebase}>
        Sync {projects.length} projects to Firebase
      </Button>
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
  )
}
