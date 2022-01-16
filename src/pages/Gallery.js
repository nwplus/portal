import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { H1, H3, HR } from '../components/Typography'
import { getProjects, getSponsorPrizes } from '../utility/firebase'
import { GalleryPage } from '../containers/GalleryPage'
import { Dropdown } from '../components/Input'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0em 2em;
`

export default () => {
  const [projects, setProjects] = useState([])
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All projects')

  const prizes = [{ value: 'All projects', label: 'All projects' }]

  useEffect(() => {
    async function getPrizes() {
      const prizes = await getSponsorPrizes()
      setSponsorPrizes(prizes)
    }
    getPrizes()

    getProjects().then(projectsData => {
      const newProjects = projectsData
        .map(project => {
          return { ...project.data(), uid: project.id }
        })
        .filter(project => project.draftStatus === 'public')
      setProjects(newProjects)
    })
  }, [])

  sponsorPrizes.map(prize => prizes.push({ value: prize, label: prize }))

  const filteredProjects =
    selectedFilter === 'All projects'
      ? projects
      : projects.filter(project => {
          return project.sponsorPrizes.includes(selectedFilter)
        })
  return (
    <>
      <H1>Project Gallery</H1>
      <H3>Filter by sponsor prize</H3>
      <Dropdown
        options={prizes}
        placeholder="All projects"
        isValid
        isSearchable={false}
        onChange={input => setSelectedFilter(input.value)}
      />
      <HR />
      <Container>
        <GalleryPage projects={filteredProjects} />
      </Container>
    </>
  )
}
