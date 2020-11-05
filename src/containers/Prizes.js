import React from 'react';
import styled from 'styled-components';

const CenteredH1 = styled.h1`
  text-align: center;
`


const dummyMainPrizes = [
  {
    place: "1",
    title: "1st Place",
    content: "hello|hi|what's up"
  },
  {
    place: "2",
    title: "2nd Place",
    content: "hello|hi|what's up"
  },
  {
    place: "3",
    title: "3rd Place",
    content: "hello|hi|what's up",
    main: true
  }
]

const dummySponsorPrizes = [
  {
    place: false,
    title: "sponsor prize 1",
    content: "hello|hi|what's up"
  },
  {
    place: false,
    title: "sponsor prize 2",
    content: "hello|hi|what's up"
  },
  {
    place: false,
    title: "sponsor prize 3",
    content: "hello|hi|what's up"
  },
  {
    place: false,
    title: "sponsor prize 4",
    content: "hello|hi|what's up"
  },
  {
    place: false,
    title: "sponsor prize 5",
    content: "hello|hi|what's up"
  },
  {
    place: false,
    title: "sponsor prize 6",
    content: "hello|hi|what's up"
  }
]


export default () => {

  return (
    <div>
      <CenteredH1>Overall Prizes</CenteredH1>
      <CenteredH1>Sponsored Categories</CenteredH1>
    </div>
  );
}