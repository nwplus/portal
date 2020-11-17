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
        let prizes = {}
        prizes.main = Object.values(docs.filter(doc => typeof doc.data().place === 'number'))
        prizes.sponsor = Object.values(docs.filter(doc => !doc.data().place))
        return prizes
      })
      .then(prizes => {
        setMainPrizes(prizes.main)
        setSponsorPrizes(prizes.sponsor)
      })
  }, [setMainPrizes, setSponsorPrizes])

  return (
    <>
      {mainPrizes.length > 0 && (
        <>
          <CenteredH1>Overall Prizes</CenteredH1>
          {createPrizeList(mainPrizes)}
        </>
      )}
      {sponsorPrizes.length > 0 && (
        <>
          <CenteredH1>Sponsored Categories</CenteredH1>
          {createPrizeList(sponsorPrizes)}
        </>
      )}
    </>
  )
}
