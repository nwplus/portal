import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import { CardLike, DetailContainer, DetailColumn, chunkify } from '../components/Common'
import { H2, UL, LI } from '../components/Typography';

const CenteredH1 = styled.h1`
  text-align: center;
`
const COLUMNS_OF_PRIZES = 3;

const PrizeCard = styled.div`
  ${CardLike};
  margin: 0.5em 0;
`

const getPrizes = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('Prizes')
    .orderBy('place', 'asc')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    });
}

const createPrizeList = (prizes) => {
  return (
    <DetailContainer>
      {
        chunkify(prizes, COLUMNS_OF_PRIZES, true).map((chunk, i) =>
          <DetailColumn key={i}>{chunk.map(singlePrize)}</DetailColumn>
        )
      }
    </DetailContainer>
  );
}


const singlePrize = (prize) => {
  return (
    <PrizeCard>
      <H2>{prize.title}</H2>
      <UL>
        {prize.content.split("|").map((item) => <LI key={prize.title + item}>{item}</LI>)}
      </UL>
    </PrizeCard>
  );
}


export const MainPrizes = () => {
  const [mainPrizes, setMainPrizes] = useState([]);

  useEffect(() => {
    getPrizes()
      .then(docs => {
        // Only keep the main prizes
        return Object.values(docs.reduce((result, doc) => {
          const data = doc.data()
          typeof data.place === "number" && result.push(data)
          return result
        }, []))
      })
      .then(mainPrizes => {
        setMainPrizes(mainPrizes);
      })
  }, [setMainPrizes]);

  return (
    createPrizeList(dummyMainPrizes)
  );
}

export const SponsorPrizes = () => {
  const [sponsorPrizes, setSponsorPrizes] = useState([]);

  useEffect(() => {
    getPrizes()
      .then(docs => {
        // Only keep the sponsor prizes
        return Object.values(docs.reduce((result, doc) => {
          const data = doc.data()
          !data.place && result.push(data)
          return result
        }, []))
      })
      .then(sponsorPrizes => {
        setSponsorPrizes(sponsorPrizes);
      })
  }, [setSponsorPrizes]);

  return (
    createPrizeList(dummySponsorPrizes)
  );
}
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
      <MainPrizes />
      <CenteredH1>Sponsored Categories</CenteredH1>
      <SponsorPrizes />
    </div>
  );
}