import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Faq from '../components/Faq'
import { H1, H2 } from '../components/Typography'
import { TextInput } from '../components/Input'
import { db } from '../utility/firebase'
import { FAQ_COLLECTION } from '../utility/Constants'
import { useHackathon } from '../utility/HackathonProvider'

const StyledTextInput = styled(TextInput)`
  margin: 0;
`

const FAQ = () => {
  const [faqs, setFaqs] = useState([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    const unsubscribe = db
      .collection(FAQ_COLLECTION)
      .where('hackathonIDs', 'array-contains-any', [dbHackathonName])
      .onSnapshot(querySnapshot => {
        setFaqs(Object.values(querySnapshot.docs.map(doc => doc.data())))
      })
    return unsubscribe
  }, [dbHackathonName])

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 10)

    return () => {
      // teardown
      clearTimeout(handler)
    }
  }, [search])

  // filter faqs based off of search term
  useEffect(
    () =>
      setFiltered(
        faqs.filter(faq => {
          const [head, body] = [faq.question.toLowerCase(), faq.answer.toLowerCase()]
          return head.includes(debouncedSearch) || body.includes(debouncedSearch)
        })
      ),
    [debouncedSearch, faqs]
  )

  return (
    <>
      <H1>Frequently Asked Questions</H1>
      <StyledTextInput
        size="large"
        placeholder="Search FAQ..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.length ? <Faq faq={filtered} /> : <H2> No results found. </H2>}
    </>
  )
}

export default FAQ
