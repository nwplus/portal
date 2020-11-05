import React from 'react'
import Accordion from '../components/Accordion'
import { H2 } from './Typography'
import { DetailContainer, DetailColumn, DetailAnswer } from './Common'

export default ({ faq }) => {
  const categories = faq.reduce((accumulator, question) => {
    accumulator[question.category] = [...(accumulator[question.category] || []), question]
    return accumulator // group by category
  }, {})

  const splitHalf = arr => {
    const half = Math.ceil(arr.length / 2)
    return [arr.splice(0, half), arr.splice(-half)]
  }

  const createFAQList = entries => {
    return (
      <DetailContainer>
        {splitHalf(entries).map((half, i) => (
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
