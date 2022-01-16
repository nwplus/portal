import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { H1, H2, HR } from '../components/Typography'
import { getProjects, getSponsorPrizes } from '../utility/firebase'
import { GalleryPage } from '../containers/GalleryPage'
import { Dropdown, TextInput } from '../components/Input'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0em 2em;
`

const StyledSearch = styled(TextInput)`
  margin: 0;
`

export default () => {
  const [projects, setProjects] = useState([])
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All projects')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searchAndFilteredProjects, setSearchAndFilteredProjects] = useState([])

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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  useEffect(() => {
    const filtered =
      selectedFilter === 'All projects'
        ? projects
        : projects.filter(project => {
            return project.sponsorPrizes.includes(selectedFilter)
          })
    setSearchAndFilteredProjects(
      filtered.filter(project => {
        return project.title.toLowerCase().includes(debouncedSearch)
      })
    )
  }, [debouncedSearch, projects, selectedFilter])
  sponsorPrizes.map(prize => prizes.push({ value: prize, label: prize }))
  return (
    <>
      <H1>Project Gallery</H1>
      <H2>Filter by sponsor prize</H2>
      <Dropdown
        options={prizes}
        placeholder="All projects"
        isValid
        isSearchable={false}
        onChange={input => setSelectedFilter(input.value)}
      />
      <H2>Search by project name</H2>
      <StyledSearch
        placeholder="Project title"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <HR />
      <Container>
        <GalleryPage projects={searchAndFilteredProjects} />
      </Container>
    </>
  )
}
