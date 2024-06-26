import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sponsors from '../components/SponsorLogos'
import { getSponsors } from '../utility/firebase'

const CenteredH2 = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`

const SponsorLogos = () => {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    // Filter out in-kind sponsors
    getSponsors().then(docs => {
      const filteredDocs = docs.filter(
        doc => doc.data().tier && doc.data().tier.toLowerCase() !== 'inkind'
      )
      setSponsors(filteredDocs.map(doc => doc.data()))
    })
  }, [setSponsors])

  return sponsors.length ? (
    <>
      <CenteredH2>A huge thank you to all our sponsors!</CenteredH2>
      <Sponsors sponsors={sponsors} />
    </>
  ) : null
}

export default SponsorLogos
