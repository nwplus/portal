import React from 'react'
import QuicklinksCard from '../components/QuicklinksCard'

import { DetailContainer, DetailColumn } from './Common'

export default ({ links }) => {
  const categories = links.reduce((accumulator, question) => {
    accumulator[question.category] = [...(accumulator[question.category] || []), question]
    return accumulator // group by category
  }, {})

  const splitHalf = (arr) => {
    const half = Math.ceil(arr.length / 2)
    return [arr.splice(0, half), arr.splice(-half)]
  }

  const createQuicklinksBlocks = (categories) => {
    return (
      <DetailContainer>
        {splitHalf(Object.keys(categories)).map((categoryNames, halfIndex) => {
          let categoryCards = []
          for (const categoryName of categoryNames) {
            categoryCards.push(singleQuicklinkCategory(categoryName, categories))
          }
          return <DetailColumn key={halfIndex}>{categoryCards}</DetailColumn>
        })}
      </DetailContainer>
    )
  }

  const singleQuicklinkCategory = (categoryName, categories) => {
    return (
      <QuicklinksCard key={categoryName} title={categoryName} links={categories[categoryName]} />
    )
  }

  return createQuicklinksBlocks(categories)
}
