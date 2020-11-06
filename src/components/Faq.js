import React from 'react'
import Accordion from '../components/Accordion'
import { H2 } from './Typography'
import { DetailContainer, DetailColumn, DetailAnswer } from './Common'
import { chunkify } from '../utility/utilities'

const COLUMNS_OF_FAQ = 2

export default ({ faq }) => {
  const categories = faq.reduce((accumulator, question) => {
    accumulator[question.category] = [...(accumulator[question.category] || []), question]
    return accumulator // group by category
  }, {})

  const createFAQList = entries => {
    return (
      <DetailContainer>
        {chunkify(entries, COLUMNS_OF_FAQ, true).map((half, i) => (
          <DetailColumn key={i}>{half.map(singleEntry)}</DetailColumn>
        ))}
      </DetailContainer>
    )
  }

  const singleEntry = (entry, i) => {
    return (
      <li key={i}>
        <Accordion heading={entry.question}>
          <DetailAnswer>{entry.answer}</DetailAnswer>
        </Accordion>
      </li>
    )
  }

  return Object.keys(categories).map((category, i) => {
    return (
      <div key={i}>
        <H2>{category}</H2>
        {createFAQList(categories[category])}
      </div>
    )
  })
}
