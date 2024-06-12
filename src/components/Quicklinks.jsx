import React from 'react'
import QuicklinksCard from './QuicklinksCard'
import { chunkify } from '../utility/utilities'

import { DetailContainer, DetailColumn } from './Common'

const COLUMNS_OF_QUICKLINKS = 2

export default ({ links }) => {
  const categories = links.reduce((accumulator, question) => {
    accumulator[question.category] = [...(accumulator[question.category] || []), question]
    return accumulator // group by category
  }, {})

  const createQuicklinksBlocks = categories => {
    return (
      <DetailContainer>
        {chunkify(Object.keys(categories), COLUMNS_OF_QUICKLINKS, true).map(
          (categoryNames, halfIndex) => {
            let categoryCards = []
            for (const categoryName of categoryNames) {
              categoryCards.push(singleQuicklinkCategory(categoryName, categories))
            }
            return <DetailColumn key={halfIndex}>{categoryCards}</DetailColumn>
          }
        )}
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
