import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import { CardLike, DetailContainer, DetailColumn } from '../components/Common'
import { H2, UL, LI, I } from '../components/Typography';
import { chunkify } from '../utility/utilities'

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
      { (prize.sponsor === '') ? null : <I>{`Sponsored by ${prize.sponsor}`}</I>}
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
      .then(prizes => {
        setMainPrizes(prizes);
      })
  }, [setMainPrizes]);


  if (mainPrizes.length > 0) {
    return (
      <>
        <CenteredH1>Overall Prizes</CenteredH1>
        { createPrizeList(mainPrizes)}
      </>
    );
  }
  return null;
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
      .then(prizes => {
        setSponsorPrizes(prizes);
      })
  }, [setSponsorPrizes]);

  if (sponsorPrizes.length > 0) {
    return (
      <>
        <CenteredH1>Sponsored Categories</CenteredH1>
        { createPrizeList(sponsorPrizes)}
      </>
    );
  }
  return null;
}

export default () => {
  return (
    <>
      <MainPrizes />
      <SponsorPrizes />
    </>
  );
}