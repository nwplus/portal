import React from 'react';
import Accordion from '../components/Accordion';
import { H1, P, H2 } from './Typography';
import styled from 'styled-components'
import { CardLike } from './Common'

const DetailFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
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
    padding: 0.5em 1em;
    margin-bottom: 1em;
    list-style-type: none;
  }
`

export default ({ faq }) => {
  const categories = faq.reduce((q, a) => {
    q[a.category] = [...q[a.category] || [], a]; // group by category
    return q;
  }, {});

  function splitHalf(arr) {
    const half = Math.ceil(arr.length / 2);
    return [arr.splice(0, half), arr.splice(-half)];
  }

  function createFAQList(entries) {
    return (
      <DetailFlex>
        {
          splitHalf(entries).map(half =>
            <DetailColumn>{half.map(singleEntry)}</DetailColumn>
          )
        }
      </DetailFlex>
    );
  }

  function singleEntry(entry) {
    return (
      <li>
        <Accordion heading={entry.question}>
          <P>{entry.answer}</P>
        </Accordion>
      </li>
    );
  }

  return (
    <>
      <H1>Frequently Asked Questions</H1>
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