import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sponsors from '../components/SponsorLogos'
import { getSponsors } from '../utility/firebase'

const CenteredH2 = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`

export default () => {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getSponsors().then(docs => {
      setSponsors(docs.map(doc => doc.data()))
    })
  }, [setSponsors])

  return sponsors.length ? (
    <>
      <CenteredH2>A huge thank you to all our sponsors!</CenteredH2>
      <Sponsors sponsors={sponsors} />
    </>
  ) : null
}
