import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Faq from '../components/Faq'
import { H1, H2 } from '../components/Typography'
import { TextInput } from '../components/Input'
// import { db } from '../utility/firebase'
// import { FAQ_COLLECTION, DB_HACKATHON } from '../utility/Constants'

const StyledTextInput = styled(TextInput)`
  margin: 0;
`

const faqs = [
  {
    category: 'General',
    question: 'Do you have to have a team for nwHacks?',
    answer:
      'While we won’t stop you from working alone, we strongly encourage you to work in teams of up to 4 to get the most out of the hackathon experience!',
  },
  {
    category: 'General',
    question: 'How do I find a team or additional team members?',
    answer: 'You can check out the #prospect-catalogue and #team-catalogue channel on Discord.',
  },
  {
    category: 'General',
    question: 'What happens if I’m not able to find a team and how long do I have to find one?',
    answer:
      'It will likely be easiest to find a team before the event or in the first few hours of the event, but you can still join a team up until the Portal project submission deadline on Sunday.',
  },
  {
    category: 'General',
    question: 'Do I have to register my team somewhere?',
    answer: 'You’ll just need to list your team members in the Portal project submission.',
  },
  {
    category: 'General',
    question: 'Is there a theme for this hackathon?',
    answer:
      'There is no theme so feel free to build whatever you desire! Some sponsors are offering category prizes for using their API if you want some more direction — you can browse those prizes under Sponsors in Portal.',
  },
  {
    category: 'General',
    question: 'What do I do if I am having trouble verifying on Discord?',
    answer: 'Send us a message on Discord in the #welcome-support channel.',
  },
  {
    category: 'Activities',
    question: 'Which activities are going on right now?',
    answer: 'Check out our Schedule page to find out!',
  },
  {
    category: 'Activities',
    question: 'Do I have to participate for the entire length of the activity?',
    answer:
      'No, you do not have to feel obligated to stay for the entire activity but we highly recommend you stick around! 😊',
  },
  {
    category: 'Activities',
    question: 'What are mini activities?',
    answer:
      'Mini activities are small activities and games you can participate in for a chance to win swag and prizes!',
  },
  {
    category: 'Mentorship',
    question: 'How do I request a mentor help?',
    answer:
      'For technical questions or help on your specific project, submit a request through our ticketing system in Discord.',
  },
  {
    category: 'Judging',
    question: 'How does judging work?',
    answer:
      'You can see the judging process and rules in detail under the “Information → Judging” tab on your dashboard.',
  },
  {
    category: 'Judging',
    question:
      'Can I submit my nwHacks project to another hackathon? Can I submit a project I made at another hackathon to nwHacks?',
    answer:
      'No, any projects found to have been submitted to multiple hackathons will be disqualified.',
  },
  {
    category: 'Judging',
    question: 'What prizes are available for me to win?',
    answer: 'The prizes for nwHacks finalists are listed on the Info Package page.',
  },
]

export default () => {
  // We hardcoding FAQs for livesite
  // const [faqs, setFaqs] = useState([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection(FAQ_COLLECTION)
  //     .where('hackathonIDs', 'array-contains-any', [DB_HACKATHON, 'livesite'])
  //     .onSnapshot(querySnapshot => {
  //       setFaqs(Object.values(querySnapshot.docs.map(doc => doc.data())))
  //     })
  //   return unsubscribe
  // }, [setFaqs])

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
    [debouncedSearch]
    // [debouncedSearch, faqs]
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
