import React from 'react';
import Accordion from '../components/Accordion';
import { P, H2 } from './Typography';
import styled from 'styled-components'
import { CardLike } from './Common'

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 1200px) {
    display: block;
  }
`

const DetailColumn = styled.ul`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin: 0;
  margin-right: 1em;
  padding: 0;

  & > li {
    ${CardLike};
    margin: 0;
    padding: 0.5em 1em;
    margin-bottom: 1em;
    list-style-type: none;
  }
`

const DetailAnswer = styled(P)`
  margin-bottom: 0.85em;
`

export default ({ faq }) => {
  const categories = faq.reduce((accumulator, question) => {
    accumulator[question.category] = [...accumulator[question.category] || [], question];
    return accumulator; // group by category
  }, {});

  const splitHalf = (arr) => {
    const half = Math.ceil(arr.length / 2);
    return [arr.splice(0, half), arr.splice(-half)];
  }

  const createFAQList = (entries) => {
    return (
      <DetailContainer>
        {
          splitHalf(entries).map(half =>
            <DetailColumn>{half.map(singleEntry)}</DetailColumn>
          )
        }
      </DetailContainer>
    );
  }

  const singleEntry = (entry) => {
    return (
      <li>
        <Accordion heading={entry.question}>
          <DetailAnswer>{entry.answer}</DetailAnswer>
        </Accordion>
      </li>
    );
  }

  return (
    <>
      {
        (Object.keys(categories)).map(category => {
          return (
            <>
              <H2>{category}</H2>
              {createFAQList(categories[category])}
            </>
          );
        })
      }
    </>
  );
}