import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../utility/firebase'
import { DB_COLLECTION } from '../utility/Constants'
import { CardWithHeader, DetailContainer, DetailColumn } from '../components/Common'
import { UL, LI, I } from '../components/Typography'
import { chunkify } from '../utility/utilities'
import { useHackathon } from '../utility/HackathonProvider'

const CenteredH1 = styled.h1`
  text-align: center;
`
const COLUMNS_OF_PRIZES = 3

const getPrizes = dbHackathonName => {
  return db
    .collection(DB_COLLECTION)
    .doc(dbHackathonName)
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
    <CardWithHeader header={prize.title}>
      {prize.sponsor == null ? null : <I>{`Sponsored by ${prize.sponsor}`}</I>}
      <UL>
        {prize.content.map(item => (
          <LI key={prize.title + item}>{item}</LI>
        ))}
      </UL>
    </CardWithHeader>
  )
}

const Prizes = () => {
  const [mainPrizes, setMainPrizes] = useState([])
  const [sponsorPrizes, setSponsorPrizes] = useState([])
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    getPrizes(dbHackathonName)
      .then(docs => {
        let prizes = {}
        prizes.main = Object.values(
          docs.reduce((result, doc) => {
            const data = doc.data()
            typeof doc.data().place === 'number' && result.push(data)
            return result
          }, [])
        )
        prizes.sponsor = Object.values(
          docs.reduce((result, doc) => {
            const data = doc.data()
            !doc.data().place && result.push(data)
            return result
          }, [])
        )
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

export default Prizes
