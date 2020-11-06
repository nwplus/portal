import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import { CardLike, DetailContainer, DetailColumn } from '../components/Common'
import { H2, UL, LI, I } from '../components/Typography'
import { chunkify } from '../utility/utilities'

const CenteredH1 = styled.h1`
  text-align: center;
`
const COLUMNS_OF_PRIZES = 3

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
    })
}

const createPrizeList = prizes => {
  return (
    <DetailContainer>
      {chunkify(prizes, COLUMNS_OF_PRIZES, true).map((chunk, i) => (
        <DetailColumn key={i}>{chunk.map(singlePrize)}</DetailColumn>
      ))}
    </DetailContainer>
  )
}

const singlePrize = prize => {
  return (
    <PrizeCard>
      <H2>{prize.title}</H2>
      {prize.sponsor == null ? null : <I>{`Sponsored by ${prize.sponsor}`}</I>}
      <UL>
        {prize.content.split('|').map(item => (
          <LI key={prize.title + item}>{item}</LI>
        ))}
      </UL>
    </PrizeCard>
  )
}

export default () => {
  const [mainPrizes, setMainPrizes] = useState([])
  const [sponsorPrizes, setSponsorPrizes] = useState([])

  useEffect(() => {
    getPrizes()
      .then(docs => {
        // let prizes;
        // prizes.main = Object.values(docs.reduce((result, doc) => {
        //   const data = doc.data()
        //   typeof data.place === "number" && result.push(data)
        //   return result
        // }, []));
        // prizes.sponsor = Object.values(docs.reduce((result, doc) => {
        //   const data = doc.data()
        //   !data.place && result.push(data)
        //   return result
        // }, []));
        return {
          main: [
            {
              place: '1',
              title: '1st Place',
              content: "hello|hi|what's up",
            },
            {
              place: '2',
              title: '2nd Place',
              content: "hello|hi|what's up",
            },
            {
              place: '3',
              title: '3rd Place',
              content: "hello|hi|what's up",
            },
          ],
          sponsor: [
            {
              place: false,
              title: 'sponsor prize 1',
              content: "hello|hi|what's up",
              sponsor: 'hi',
            },
            {
              place: false,
              title: 'sponsor prize 2',
              content: "hello|hi|what's up",
              sponsor: 'hi',
            },
            {
              place: false,
              title: 'sponsor prize 3',
              content: "hello|hi|what's up",
              sponsor: 'hi',
            },
            {
              place: false,
              title: 'sponsor prize 4',
              content: "hello|hi|what's up",
              sponsor: 'hi',
            },
            {
              place: false,
              title: 'sponsor prize 5',
              content: "hello|hi|what's up",
            },
            {
              place: false,
              title: 'sponsor prize 6',
              content: "hello|hi|what's up",
            },
          ],
        }
      })
      .then(prizes => {
        setMainPrizes(prizes.main)
        setSponsorPrizes(prizes.sponsor)
      })
  }, [setMainPrizes, setSponsorPrizes])

  let res = []
  if (mainPrizes.length > 0) {
    res.push(
      <>
        <CenteredH1>Overall Prizes</CenteredH1>
        {createPrizeList(mainPrizes)}
      </>
    )
  }
  if (sponsorPrizes.length > 0) {
    res.push(
      <>
        <CenteredH1>Sponsored Categories</CenteredH1>
        {createPrizeList(sponsorPrizes)}
      </>
    )
  }
  return res
}
