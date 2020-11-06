import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import Sponsors from '../components/SponsorLogos'

const CenteredH1 = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`
const getSponsors = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('Sponsors')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    })
}

export default () => {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getSponsors().then(docs => {
      // only keep non-inkind sponsors
      const filtered = Object.values(
        docs.reduce((result, doc) => {
          const data = doc.data()
          data.tier !== 'inkind' && result.push(data)
          return result
        }, [])
      )
      setSponsors(filtered)
    })
  }, [setSponsors])

  if (sponsors.length) {
    return (
      <>
        <CenteredH1>A huge thank you to all our sponsors!</CenteredH1>
        <Sponsors sponsors={sponsors} />
      </>
    )
  }
  return null
}
