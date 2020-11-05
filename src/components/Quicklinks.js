import React from 'react';
import QuicklinksCard from '../components/QuicklinksCard'

import { chunkify, DetailContainer, DetailColumn } from './Common'

const COLUMNS_OF_QUICKLINKS = 2;

export default ({ links }) => {
  const categories = links.reduce((accumulator, question) => {
    accumulator[question.category] = [...accumulator[question.category] || [], question];
    return accumulator; // group by category
  }, {});

  const createQuicklinksBlocks = (categories) => {
    return (
      <DetailContainer>
        {
          chunkify(Object.keys(categories), COLUMNS_OF_QUICKLINKS, true).map((categoryNames, halfIndex) => {
            let categoryCards = [];
            for (const categoryName of categoryNames) {
              categoryCards.push(singleQuicklinkCategory(categoryName, categories));
            }
            return <DetailColumn key={halfIndex}>{categoryCards}</DetailColumn>;
          })
        }
      </DetailContainer>
    );
  }

  const singleQuicklinkCategory = (categoryName, categories) => {
    return (
      <QuicklinksCard key={categoryName} title={categoryName} links={categories[categoryName]} />
    );
  }

  return createQuicklinksBlocks(categories);
}