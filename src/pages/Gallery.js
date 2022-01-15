import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { H1, H3 } from '../components/Typography'
import { getProjects } from '../utility/firebase'
import GalleryPage from '../containers/GalleryPage'
import { Select } from '../components/Input'

const SPONSORS_LIST = [
  'covalent',
  'ttt',
  'kabam',
  'microsoft',
  'openai',
  'monetization',
  'hardware',
  'domain',
  'cloud',
]
const PRIZE_LABELS = {
  covalent: 'Covalent Bounty Prizes',
  ttt: 'TTT Studios Get Unique with Unity',
  kabam: 'Kabam Best UX/UI',
  microsoft: 'Microsoft Best Use of Azure ACS',
  openai: 'OpenAI Best Use of OpenAI API',
  monetization: 'MLH Prize - Coil Best Web Monetization Project',
  hardware: 'MLH Prize - Best Hardware Hack Sponsored by Digi-Key',
  domain: 'MLH Prize - Best Domain Name from Domain.com',
  cloud: 'MLH Prize - Best Use of Google Cloud',
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0em 2em;
`

export default () => {
  const [projects, setProjects] = useState([])
  const [sponsorFilters, setSponsorFilters] = useState({
    covalent: false,
    ttt: false,
    kabam: false,
    microsoft: false,
    openai: false,
    monetization: false,
    hardware: false,
    domain: false,
    cloud: false,
  })

  useEffect(() => {
    getProjects().then(projectsData => {
      const newProjects = projectsData
        .map(project => {
          return { ...project.data(), uid: project.id }
        })
        .filter(project => project.draftStatus === 'public')
      setProjects(newProjects)
    })
  }, [])

  const filteredProjects = projects.filter(project => {
    const isFiltersApplied = Object.values(sponsorFilters).includes(true)

    if (!isFiltersApplied) {
      return true
    }

    let covalentFilter = false
    let tttFilter = false
    let kabamFilter = false
    let microsoftFilter = false
    let openaiFilter = false
    let monetizationFilter = false
    let hardwareFilter = false
    let domainFilter = false
    let cloudFilter = false

    if (sponsorFilters.covalent) {
      covalentFilter = project.sponsorPrizes.includes(PRIZE_LABELS.covalent)
    }
    if (sponsorFilters.ttt) {
      tttFilter = project.sponsorPrizes.includes(PRIZE_LABELS.ttt)
    }
    if (sponsorFilters.kabam) {
      kabamFilter = project.sponsorPrizes.includes(PRIZE_LABELS.kabam)
    }
    if (sponsorFilters.microsoft) {
      microsoftFilter = project.sponsorPrizes.includes(PRIZE_LABELS.microsoft)
    }
    if (sponsorFilters.openai) {
      openaiFilter = project.sponsorPrizes.includes(PRIZE_LABELS.openai)
    }
    if (sponsorFilters.monetization) {
      monetizationFilter = project.sponsorPrizes.includes(PRIZE_LABELS.monetization)
    }
    if (sponsorFilters.hardware) {
      hardwareFilter = project.sponsorPrizes.includes(PRIZE_LABELS.hardware)
    }
    if (sponsorFilters.domain) {
      domainFilter = project.sponsorPrizes.includes(PRIZE_LABELS.domain)
    }
    if (sponsorFilters.cloud) {
      cloudFilter = project.sponsorPrizes.includes(PRIZE_LABELS.cloud)
    }

    return (
      covalentFilter ||
      tttFilter ||
      kabamFilter ||
      microsoftFilter ||
      openaiFilter ||
      monetizationFilter ||
      hardwareFilter ||
      domainFilter ||
      cloudFilter
    )
  })
  return (
    <>
      <H1>Project Gallery</H1>
      <H3>Filter by sponsor prizes</H3>
      <Container>
        {SPONSORS_LIST.map(sponsor => (
          <Select
            type="checkbox"
            checked={sponsorFilters[sponsor]}
            label={PRIZE_LABELS[sponsor]}
            onChange={() =>
              setSponsorFilters({ ...sponsorFilters, [sponsor]: !sponsorFilters[sponsor] })
            }
          />
        ))}
        <GalleryPage projects={filteredProjects} />
      </Container>
    </>
  )
}
