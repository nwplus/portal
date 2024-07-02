import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sponsors from '../components/SponsorLogos'
import { getSponsors } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'

const CenteredH2 = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`

const SponsorLogos = () => {
  const [sponsors, setSponsors] = useState([])
  const { dbHackathonName } = useHackathon()

  useEffect(() => {
    // Filter out in-kind sponsors
    getSponsors(dbHackathonName).then(docs => {
      const filteredDocs = docs.filter(
        doc => doc.data().tier && doc.data().tier.toLowerCase() !== 'inkind'
      )
      setSponsors(filteredDocs.map(doc => doc.data()))
    })
  }, [dbHackathonName])

  return sponsors.length ? (
    <>
      <CenteredH2>A huge thank you to all our sponsors!</CenteredH2>
      <Sponsors sponsors={sponsors} />
    </>
  ) : null
}

export default SponsorLogos
