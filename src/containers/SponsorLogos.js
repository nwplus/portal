import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getSponsors } from '../utility/firebase'
import Sponsors from '../components/SponsorLogos'

const CenteredH2 = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`

export default () => {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getSponsors().then(docs => {
      // only keep non-inkind sponsors
      const filtered = docs.filter(doc => doc.data().tier !== 'inkind').map(doc => doc.data())
      setSponsors(filtered)
    })
  }, [setSponsors])

  return sponsors.length ? (
    <>
      <CenteredH2>A huge thank you to all our sponsors!</CenteredH2>
      <Sponsors sponsors={sponsors} />
    </>
  ) : null
}
